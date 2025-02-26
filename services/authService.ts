// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const ics = require('ics');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
require('dotenv').config();

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));

app.use(express.json());

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // This should be an App Password from Google Account
  }
});

// Verify connection configuration
transporter.verify(function(error: any, success: any) {
  if (error) {
    console.log("Transporter verification error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post('/send-invite', async (req: any, res: any) => {
  const { name, email, studentId } = req.body;

  try {
    // Calculate the next day's date at 10 AM
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(10, 0, 0, 0); // Set time to 10:00 AM

    // Define the event details
    const event = {
      start: [nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate(), 10, 0], // Next day at 10 AM
      duration: { hours: 1 },
      title: `SEIT Visit Request - ${name}`,
      description: `Student ID: ${studentId}\nEmail: ${email}`,
      location: 'Online',
      url: 'http://example.com',
      status: 'CONFIRMED',
      organizer: { name: 'Admin', email: process.env.EMAIL_USER },
      attendees: [{ name, email }],
    };

    // Generate the .ics file
    ics.createEvent(event, (error: any, value: string) => {
      if (error) {
        console.error('Error creating .ics file:', error);
        res.status(500).send('Failed to create calendar event');
        return;
      }

      // Send email to advisor with .ics attachment
      const advisorMessage = {
        from: process.env.EMAIL_USER, // Admin email
        to: process.env.ADVISOR_EMAIL, // Advisor email
        subject: `SEIT Visit Request - ${name}`,
        html: `
          <h2>SEIT Visit Request</h2>
          <p><strong>Student Details:</strong></p>
          <ul>
            <li>Name: ${name}</li>
            <li>Student ID: ${studentId}</li>
            <li>Email: ${email}</li>
          </ul>
          <p>Please review the request and respond with your decision.</p>
        `,
        attachments: [
          {
            filename: 'invite.ics',
            content: value,
          },
        ],
      };

      transporter.sendMail(advisorMessage, (err: any, info: any) => {
        if (err) {
          console.error('Error sending email:', err);
          res.status(500).send('Failed to send email');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Request sent to advisor successfully');
        }
      });
    });
  } catch (error: any) {
    console.error('Error sending request to advisor:', error);
    res.status(500).send(`Failed to send request: ${error.message}`);
  }
});

// New endpoint to handle rejections
app.post('/handle-rejection', async (req: any, res: any) => {
  const { name, reason } = req.body;

  try {
    // Send notification to the fixed student email
    const studentMessage = {
      from: process.env.EMAIL_USER, // Admin email
      to: process.env.STUDENT_EMAIL, // Fixed student email
      subject: `Appointment Declined - ${name}`,
      html: `
        <h2>Appointment Declined</h2>
        <p>Dear Student,</p>
        <p>Your appointment request has been declined.</p>
        <p><strong>Reason for declining:</strong></p>
        <p>${reason}</p>
        <p>Please book another appointment at your earliest convenience.</p>
      `
    };

    await transporter.sendMail(studentMessage);
    res.status(200).send('Rejection handled successfully');
  } catch (error) {
    console.error('Error handling rejection:', error);
    res.status(500).send('Failed to handle rejection');
  }
});

// Configure IMAP
const imap = new Imap({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

function processNewEmails() {
  console.log('Processing new emails...');
  imap.openBox('INBOX', false, (err: any, box: any) => {
    if (err) {
      console.error('Error opening inbox:', err);
      return;
    }

    // Search for unread emails
    imap.search(['UNSEEN'], (err: any, results: number[]) => {
      console.log('Found unread emails:', results.length);
      
      if (!results.length) return;

      const f = imap.fetch(results, {
        bodies: '',
        markSeen: true
      });

      f.on('message', (msg: any) => {
        msg.on('body', (stream: any) => {
          simpleParser(stream, async (err: any, parsed: any) => {
            console.log('Processing email with subject:', parsed.subject);
            
            if (err) {
              console.error('Error parsing email:', err);
              return;
            }

            // Check if this is a decline response
            if (parsed.subject?.includes('Declined: SEIT Visit')) {
              console.log('Found decline response for:', parsed.subject);
              
              // Extract the decline reason from the email body
              const bodyText = parsed.text || '';
              const reasonMatch = bodyText.match(/Decline reason:(.*?)(?=\n|$)/i);
              const reason = reasonMatch ? reasonMatch[1].trim() : 'No reason provided';
              
              console.log('Extracted decline reason:', reason);

              // Use the fixed student email from environment variable
              const studentEmail = process.env.STUDENT_EMAIL;

              if (studentEmail) {
                try {
                  await fetch('http://localhost:3000/handle-rejection', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: parsed.subject.replace('Declined: SEIT Visit - ', ''),
                      email: studentEmail,
                      reason
                    }),
                  });
                } catch (error) {
                  console.error('Error handling decline:', error);
                }
              }
            }
          });
        });
      });
    });
  });
}

// Connect to IMAP and start listening
imap.once('ready', () => {
  console.log('IMAP Connection ready');
  processNewEmails();
  
  // Listen for new emails
  imap.on('mail', () => {
    processNewEmails();
  });
});

imap.once('error', (err: any) => {
  console.error('IMAP connection error:', err);
});

imap.connect();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
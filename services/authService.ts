// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const ics = require('ics');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
require('dotenv').config();

const app = express();

// ------------------------------------------------------------------------------------------------
// for the ID to be serializable via text file updates
const fs = require('fs');
const path = require('path');

const counterFile = path.join(__dirname, 'assets', 'data', 'ID_Counter.txt');

const dataDir = path.dirname(counterFile);
if (!fs.existsSync(dataDir)) { fs.mkdirSync(dataDir, { recursive: true }); }

function getNextEmailID() {
  let currentID = 1;

  if (fs.existsSync(counterFile)) {
    const lastID = fs.readFileSync(counterFile, 'utf8').trim();
    if (!isNaN(lastID)) { currentID = parseInt(lastID, 10) + 1; }
  }

  const emailID = currentID.toString().padStart(9, '0');
  fs.writeFileSync(counterFile, emailID, 'utf8');

  return emailID;
}

// ------------------------------------------------------------------------------------------------

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
  const emailID = getNextEmailID();
  try {
    // Calculate the next day's date at 10 AM
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(10, 0, 0, 0); // Set time to 10:00 AM

    // Define the event details
    const event = {
      start: [
        nextDay.getFullYear(),
        nextDay.getMonth() + 1,
        nextDay.getDate(),
        10, // Hour
        0   // Minute
      ] as [number, number, number, number, number], // Ensure the type is correct
      duration: { hours: 1 }, // Duration of the event
      title: `${emailID} - Student Advising Appointment`,
      description: `Appointment with ${name}. Student ID: ${studentId}`,
      location: 'Office 123',
      status: 'CONFIRMED',
      organizer: { name: 'Appointment System', email: process.env.EMAIL_USER },
      attendees: [{ name: 'Advisor Name', email: process.env.ADVISOR_EMAIL }],
    };

    // Generate the .ics file in the required format
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourKiosk//Appointment System//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${studentId}@dcmail.ca
DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${nextDay.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(nextDay.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
ORGANIZER;CN="${event.organizer.name}":mailto:${event.organizer.email}
ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="Advisor Name":mailto:${event.attendees[0].email}
STATUS:${event.status}
SEQUENCE:0
END:VEVENT
END:VCALENDAR
    `;

    // Send email to advisor with .ics attachment
    const advisorMessage = {
      from: process.env.EMAIL_USER!,
      to: process.env.ADVISOR_EMAIL!,
      subject: `${emailID} - SEIT Visit Request - ${name}`, // change this to include email ID, write an email ID in the server itself, not database nor email (serializable) whereas you use `${email}. MAKE THE POST REQ FROM SCRATCH
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
          content: icsContent,
          contentType: 'text/calendar; method=REQUEST; name="invite.ics"', // Set the content type
          contentDisposition: 'attachment', // Specify that this is an attachment
        },
      ],
    };

    transporter.sendMail(advisorMessage, (err: any, info: any) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Failed to send email'); // Send error response
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).send('Invite sent successfully'); // Send success response
      }
    });

  } catch (error: any) {
    console.error('Error sending request to advisor:', error);
    return res.status(500).send('Failed to send request'); // Send error response
  }
});

// New endpoint to handle rejections
app.post('/handle-rejection', async (req: any, res: any) => {
  const { name, reason, emailID } = req.body;

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

// New endpoint to handle acceptances
app.post('/handle-acceptance', async (req: any, res: any) => {
  const { name, reason, emailID } = req.body;

  try {
    // Logic to handle acceptance (e.g., notify the advisor)
    const acceptanceMessage = {
      from: process.env.EMAIL_USER!,
      to: process.env.STUDENT_EMAIL!,
      subject: `Appointment Accepted - ${name}`,
      html: `
        <h2>Appointment Accepted</h2>
        <p>Dear Advisor,</p>
        <p>The appointment request for ${name} has been accepted.</p>
        <p><strong>Reason for acceptance:</strong></p>
        <p>${reason}</p>
      `,
    };

    await transporter.sendMail(acceptanceMessage);
    res.status(200).send('Acceptance handled successfully');
  } catch (error) {
    console.error('Error handling acceptance:', error);
    res.status(500).send('Failed to handle acceptance');
  }
});

// New endpoint to handle tentatives
app.post('/handle-tentative', async (req: any, res: any) => {
  const { name, reason, emailID } = req.body;

  try {
    // Logic to handle tentative (e.g., notify the advisor)
    const tentativeMessage = {
      from: process.env.EMAIL_USER!,
      to: process.env.STUDENT_EMAIL!,
       subject: `Appointment Tentative - ${name}`,
      html: `
        <h2>Appointment Tentative</h2>
        <p>Dear Advisor,</p>
        <p>The appointment request for ${name} is tentative.</p>
        <p><strong>Reason for tentativeness:</strong></p>
        <p>${reason}</p>
      `,
    };

    await transporter.sendMail(tentativeMessage);
    res.status(200).send('Tentative handled successfully');
  } catch (error) {
    console.error('Error handling tentative:', error);
    res.status(500).send('Failed to handle tentative');
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

    // create a function that will read the subject of the email and fetch the email ID if it has one (at the start of the subject line)
    // if it has a subject email ID, then, let the logic enter `f.on('message', (msg: any) => {`

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
            if (err) {
              console.error('Error parsing email:', err);
              return;
            }

            console.log('Processing email with subject:', parsed.subject);
            const studentEmail = process.env.STUDENT_EMAIL;

            // Check for acceptance response
            if (parsed.subject?.includes('Accepted:')) {
              console.log('Found acceptance response for:', parsed.subject);

              // Extract the accept reason from the email body
              const bodyText = parsed.text || '';
              const reasonMatch = bodyText.match(/Accept reason:(.*?)(?=\n|$)/i);
              const reason = reasonMatch ? reasonMatch[1].trim() : 'No reason provided';

              console.log('Extracted accept reason:', reason);

              if (studentEmail) {
                try {
                  await fetch('http://localhost:3000/handle-acceptance', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: parsed.subject.replace('Accepted: SEIT Visit - ', ''),
                      reason
                    }),
                  });
                  console.log('Acceptance handled successfully');
                } catch (error) {
                  console.error('Error handling acceptance:', error);
                }
              }
            }

            // Check for tentative response
            else if (parsed.subject?.includes('Tentative:')) {
              console.log('Found tentative response for:', parsed.subject);

              // Extract the tentative reason from the email body
              const bodyText = parsed.text || '';
              const reasonMatch = bodyText.match(/Tentative Reason:(.*?)(?=\n|$)/i);
              const reason = reasonMatch ? reasonMatch[1].trim() : 'No reason provided';

              console.log('Extracted tentative reason:', reason);

              if (studentEmail) {
                try {
                  await fetch('http://localhost:3000/handle-tentative', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: parsed.subject.replace('Tentative: SEIT Visit - ', ''),
                      reason
                    }),
                  });
                  console.log('Tentative handled successfully');
                } catch (error) {
                  console.error('Error handling tentative response:', error);
                }
              }
            }

            // Check for decline response
            else if (parsed.subject?.includes('Declined:')) {
              console.log('Found decline response for:', parsed.subject);

              // Extract the decline reason from the email body
              const bodyText = parsed.text || '';
              const reasonMatch = bodyText.match(/Decline reason:(.*?)(?=\n|$)/i);
              const reason = reasonMatch ? reasonMatch[1].trim() : 'No reason provided';

              console.log('Extracted decline reason:', reason);

              if (studentEmail) {
                try {
                  await fetch('http://localhost:3000/handle-rejection', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: parsed.subject.replace('Declined: SEIT Visit - ', ''),
                      reason
                    }),
                  });
                  console.log('Rejection handled successfully');
                } catch (error) {
                  console.error('Error handling rejection:', error);
                }
              }
            } else {
              console.log('No relevant response found in the email subject.');
            }
          });
          // CREATE AN ENDPOINT FOR READING THE EMAIL ID FROM THE EMAIL (comes from the subject line in which will be nine digits at the start)
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

app.post('/download-ics', async (req: any, res: any) => {
  const { url } = req.body; // Expecting the URL to be sent in the request body

  try {
    // Fetch the .ics file from the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch calendar file');
    }

    const icsContent = await response.text();
    // You can save the icsContent to a file or process it as needed
    // For now, let's just return it
    res.status(200).send(icsContent);
  } catch (error) {
    console.error('Error downloading ICS file:', error);
    res.status(500).send('Failed to download ICS file');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
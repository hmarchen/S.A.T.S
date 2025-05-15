var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();                    _.trys.pop(); continue;
                                                                                                             }

            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// server.js
var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');
var ics = require('ics');
var Imap = require('imap');
var simpleParser = require('mailparser').simpleParser;
require('dotenv').config();
var app = express();
// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use(express.json());
// Create transporter using Gmail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // This should be an App Password from Google Account
    }
});
// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("Transporter verification error:", error);
    }
    else {
        console.log("Server is ready to take our messages");
    }
});
app.post('/send-invite', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, email, studentId, now, nextDay, event_1;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, email = _a.email, studentId = _a.studentId;
        try {
            now = new Date();
            nextDay = new Date(now);
            nextDay.setDate(now.getDate() + 1);
            nextDay.setHours(10, 0, 0, 0); // Set time to 10:00 AM
            event_1 = {
                start: [nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate(), 10, 0], // Next day at 10 AM
                duration: { hours: 1 },
                title: "SEIT Visit Request - ".concat(name),
                description: "Student ID: ".concat(studentId, "\nEmail: ").concat(email),
                location: 'Online',
                url: 'http://example.com',
                status: 'CONFIRMED',
                organizer: { name: 'Admin', email: process.env.EMAIL_USER },
                attendees: [{ name: name, email: email }],
            };
            // Generate the .ics file
            ics.createEvent(event_1, function (error, value) {
                if (error) {
                    console.error('Error creating .ics file:', error);
                    res.status(500).send('Failed to create calendar event');
                    return;
                }
                // Send email to advisor with .ics attachment
                var advisorMessage = {
                    from: process.env.EMAIL_USER, // Admin email
                    to: process.env.ADVISOR_EMAIL, // Advisor email
                    subject: "SEIT Visit Request - ".concat(name),
                    html: "\n          <h2>SEIT Visit Request</h2>\n          <p><strong>Student Details:</strong></p>\n          <ul>\n            <li>Name: ".concat(name, "</li>\n            <li>Student ID: ").concat(studentId, "</li>\n            <li>Email: ").concat(email, "</li>\n          </ul>\n          <p>Please review the request and respond with your decision.</p>\n        "),
                    attachments: [
                        {
                            filename: 'invite.ics',
                            content: value,
                        },
                    ],
                };
                transporter.sendMail(advisorMessage, function (err, info) {
                    if (err) {
                        console.error('Error sending email:', err);
                        res.status(500).send('Failed to send email');
                    }
                    else {
                        console.log('Email sent:', info.response);
                        res.status(200).send('Request sent to advisor successfully');
                    }
                });
            });
        }
        catch (error) {
            console.error('Error sending request to advisor:', error);
            res.status(500).send("Failed to send request: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
// New endpoint to handle rejections
app.post('/handle-rejection', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, reason, studentMessage, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, reason = _a.reason;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                studentMessage = {
                    from: process.env.EMAIL_USER, // Admin email
                    to: process.env.STUDENT_EMAIL, // Fixed student email
                    subject: "Appointment Declined - ".concat(name),
                    html: "\n        <h2>Appointment Declined</h2>\n        <p>Dear Student,</p>\n        <p>Your appointment request has been declined.</p>\n        <p><strong>Reason for declining:</strong></p>\n        <p>".concat(reason, "</p>\n        <p>Please book another appointment at your earliest convenience.</p>\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(studentMessage)];
            case 2:
                _b.sent();
                res.status(200).send('Rejection handled successfully');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Error handling rejection:', error_1);
                res.status(500).send('Failed to handle rejection');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Configure IMAP
var imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});
function processNewEmails() {
    var _this = this;
    console.log('Processing new emails...');
    imap.openBox('INBOX', false, function (err, box) {
        if (err) {
            console.error('Error opening inbox:', err);
            return;
        }
        // Search for unread emails
        imap.search(['UNSEEN'], function (err, results) {
            console.log('Found unread emails:', results.length);
            if (!results.length)
                return;
            var f = imap.fetch(results, {
                bodies: '',
                markSeen: true
            });
            f.on('message', function (msg) {
                msg.on('body', function (stream) {
                    simpleParser(stream, function (err, parsed) { return __awaiter(_this, void 0, void 0, function () {
                        var bodyText, reasonMatch, reason, studentEmail, error_2;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log('Processing email with subject:', parsed.subject);
                                    if (err) {
                                        console.error('Error parsing email:', err);
                                        return [2 /*return*/];
                                    }
                                    if (!((_a = parsed.subject) === null || _a === void 0 ? void 0 : _a.includes('Declined: SEIT Visit'))) return [3 /*break*/, 4];
                                    console.log('Found decline response for:', parsed.subject);
                                    bodyText = parsed.text || '';
                                    reasonMatch = bodyText.match(/Decline reason:(.*?)(?=\n|$)/i);
                                    reason = reasonMatch ? reasonMatch[1].trim() : 'No reason provided';
                                    console.log('Extracted decline reason:', reason);
                                    studentEmail = process.env.STUDENT_EMAIL;
                                    if (!studentEmail) return [3 /*break*/, 4];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, fetch('http://localhost:3000/handle-rejection', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                name: parsed.subject.replace('Declined: SEIT Visit - ', ''),
                                                email: studentEmail,
                                                reason: reason
                                            }),
                                        })];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _b.sent();
                                    console.error('Error handling decline:', error_2);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
        });
    });
}
// Connect to IMAP and start listening
imap.once('ready', function () {
    console.log('IMAP Connection ready');
    processNewEmails();
    // Listen for new emails
    imap.on('mail', function () {
        processNewEmails();
    });
});
imap.once('error', function (err) {
    console.error('IMAP connection error:', err);
});
imap.connect();
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});

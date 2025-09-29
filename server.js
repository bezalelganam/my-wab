
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'conversations.json');

function loadConversations() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveConversations(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Send message from visitor
app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;
  if (!message || !email) return res.status(400).send('Missing message or email');
  const conversations = loadConversations();
  const visitorId = uuidv4();

  conversations[visitorId] = { name, email, messages: [{ from: 'visitor', text: message }] };
  saveConversations(conversations);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bezalelganam59@gmail.com',
        pass: 'your-email-app-password'
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'bezalelganam59@gmail.com',
      subject: `New message from ${name || 'Anonymous'}`,
      text: message + '\n\nVisitor ID: ' + visitorId
    });

    res.send({ visitorId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

// Get all conversations (admin)
app.get('/admin/conversations', (req, res) => {
  const conversations = loadConversations();
  res.send(conversations);
});

// Admin sends reply
app.post('/admin/reply', async (req, res) => {
  const { visitorId, message } = req.body;
  if (!visitorId || !message) return res.status(400).send('Missing data');
  const conversations = loadConversations();
  if (!conversations[visitorId]) return res.status(404).send('Visitor not found');

  conversations[visitorId].messages.push({ from: 'admin', text: message });
  saveConversations(conversations);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bezalelganam59@gmail.com',
        pass: 'your-email-app-password'
      }
    });

    await transporter.sendMail({
      from: 'bezalelganam59@gmail.com',
      to: conversations[visitorId].email,
      subject: `Reply from support`,
      text: message
    });

    res.send('Reply sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

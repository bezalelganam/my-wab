const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-message', async (req, res) => {
  const { name, message, email } = req.body;

  if (!message || !email) return res.status(400).send('Missing message or email');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email-app-password'
        pass: 'your-email-app-password'
      }
    });

    const mailOptions = {
      from: email,
      to: 'bezalelganam59gmail.com',
      subject: `New chat message from ${name || 'Anonymous'}`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.send('Message sent!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

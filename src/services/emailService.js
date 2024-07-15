const nodemailer = require('nodemailer');
require('dotenv').config();

const sendReferralEmail = async (referrerEmail, refereeEmail, courseName) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: 'Course Referral',
      text: `You have been referred by ${referrerEmail} to take the course: ${courseName}`,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendReferralEmail };

const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('./config');

const SendEmail = async ({ subject, content, name }, receiver) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: receiver,
    subject: `[${Date().slice(0, 24)}] ${subject}`,
    text: `${name}: ${content}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    if (result.accepted) console.log('Succesfully sent mail');
  } catch (e) {
    console.error(e);
  }
};

module.exports = SendEmail;

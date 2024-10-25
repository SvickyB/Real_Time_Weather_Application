// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();


// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password or email password
    },
});

// Function to send email
const sendAlertEmail = async (to, city, temperature, condition) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: `Weather Alert for ${city}`,
        text: `Alert! The temperature in ${city} has reached ${temperature}°C with condition: ${condition}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Alert email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};

module.exports = { sendAlertEmail };

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 instead of 465
  secure: false, // Must be false for port 587 (uses STARTTLS)
  auth: {
    user: "mayankkumar4x@gmail.com",
     // Replace with App Password if needed
    pass: "ytmq upkk bhvx uhtv", // Replace with App Password if needed
  },
  requireTLS: true, // Enforces TLS encryption
});


// Below code is for testing purpose

// const SendEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"RapidNewsScribe 👻" <mayankkumar4x@gmail.com>',
//       to: "mayankkumarnitk2022@gmail.com",
//       subject: "Hello ✔",
//       text: "Hello world?",
//       html: "<b>Hello world?</b>",
//     });

//     console.log("Email sent:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// Export transporter for use in other files
module.exports = {transporter};

// Call the function to send an email (optional)
// SendEmail();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mayankkumar4x@gmail.com",

    pass: "ytmq upkk bhvx uhtv",
  },
  requireTLS: true,
});

module.exports = { transporter };


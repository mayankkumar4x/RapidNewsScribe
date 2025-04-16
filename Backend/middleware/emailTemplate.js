const Verification_Email_Template = (verificationCode) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .verification-code { font-size: 22px; color: #4CAF50; font-weight: bold; }
      </style>
  </head>
  <body>
      <h2>Verify Your Email</h2>
      <p>Your verification code is:</p>
      <span class="verification-code">${verificationCode}</span>
  </body>
  </html>
`;

const Welcome_Email_Template = (name) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Email</title>
  </head>
  <body>
      <h2>Welcome, ${name}!</h2>
      <p>We are glad to have you with us.</p>
  </body>
  </html>
`;

module.exports = { Verification_Email_Template, Welcome_Email_Template };

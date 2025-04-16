const { transporter } = require("./emailConfig");
const { Verification_Email_Template, Welcome_Email_Template } = require("./emailTemplate");
// const SendVerificationCode=async(email,verificationCode)=>{
//     try{
//         const response = await transporter.sendMail({
//               from: '"RapidNewsScribe 👻" <mayankkumar4x@gmail.com>',
//               to: email,
//               subject: "Verify Your Email",
//               text: "Verify Your Email",
//               html: Verification_Email_Template(verificationCode),
//             });
//             console.log("Email send successfully",response)
//     }catch(error){
//     console.log("Email error")
//     }
// }

const SendVerificationCode = async (email, code) => {
    try {
        const response = await transporter.sendMail({
            from: '"RapidNewsScribe 👻" <mayankkumar4x@gmail.com>',
            to: email,
            subject: "Verify Your Email",
            html: Verification_Email_Template(code), // Use your existing email template
        });
        console.log("Verification Email Sent:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

const SendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"RapidNewsScribe 👻" <mayankkumar4x@gmail.com>',
            to: email,
            subject: "Welcome to RapidNewsScribe!",
            html: Welcome_Email_Template(name),
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.log("Email error:", error);
    }
};

module.exports = { SendVerificationCode, SendWelcomeEmail };
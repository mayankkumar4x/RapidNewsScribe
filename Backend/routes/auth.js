const express = require('express');
const User = require('../models/User');
const { SendVerificationCode } = require('../middleware/Email');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');      //for secure communication between client and server
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'Harryis'; //we can put any string here for verfiy signature of token
const router = express.Router();

//Route 1:Create a User using: POST "/api/auth/send-verification-code" for sending the verification code and "/api/auth/verfy-code" for verify and email and creating new user, No login required

router.post('/send-verification-code', async (req, res) => {
   const { email } = req.body;
   try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ success: false, error: "User already exists" });

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      await SendVerificationCode(email, verificationCode);

      req.app.locals[email] = verificationCode; // Temporary storage (Redis recommended)
      res.json({ success: true, message: "Verification code sent" });
   } catch (error) {
      console.error("Error in send-verification-code:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }


});

router.post('/verify-code', async (req, res) => {
   const { name, email, password, verificationCode } = req.body;

   try {
      const storedCode = req.app.locals[email];
      if (!storedCode || storedCode !== verificationCode) {
         return res.status(400).json({ success: false, error: "Invalid verification code" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      let user = await User.create({ name, email, password: secPass });

      const data = {
         user: {
            id: user.id,
            email: user.email
         }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      delete req.app.locals[email];

      res.json({ success: true, authtoken });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
   }
});

//Route 2: Authenticate a User using: POST "/api/auth/login", No login required
router.post('/login', [

   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password can not be empty').exists()],

   async (req, res) => {
      let success = false;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({ error: "Please try to login with correct Credentials" });
         }
         const passwordCompare = await bcrypt.compare(password, user.password);
         if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct Credentials" });
         }
         const data = {
            user: {
               id: user.id,
               email: user.email
            }
         };

         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authtoken });
      } catch (error) {
         console.error(error.message);
         res.status(500).send("Internal Server Error");
      }
   })
//Route 3: Get Logged in User Details using: POST "/api/auth/getuser",login required

router.post('/getuser', fetchuser,
   async (req, res) => {
      try {
         const userId = req.user.id;
         const user = await User.findById(userId).select("-password"); // select user info expect password
         res.send(user);
      }
      catch {
         console.error(error.message);
         res.status(500).send("Internal Server Error");
      }
   })

//Route 4:  Forgot Password - Send Reset Code
router.post('/forgot-password', async (req, res) => {
   const { email } = req.body;

   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ success: false, error: "User not found" });
      }

      // Generate 6-digit reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store reset code in the database
      user.verificationCode = resetCode;
      await user.save();
      console.log("Stored OTP:", user.verificationCode);

      // Send reset code via email
      await SendVerificationCode(email, resetCode);

      res.json({ success: true, message: "Password reset code sent" });
   } catch (error) {
      console.error("Error in forgot-password:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

// Reset Password - Verify Code & Change Password
router.post('/reset-password', async (req, res) => {
   const { email, otp, newPassword } = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user || user.verificationCode !== otp) {
         return res.status(400).json({ success: false, error: "Invalid reset code" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.verificationCode = undefined; // Remove reset code after successful reset

      await user.save();

      res.json({ success: true, message: "Password reset successful" });
   } catch (error) {
      console.error("Error in reset-password:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});



module.exports = router
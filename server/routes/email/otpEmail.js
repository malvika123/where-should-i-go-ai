const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail", // or another email provider
  auth: {
    user: "senmalvika981@gmail.com", // Your email
    pass: "byoq kmgk hmap tyvw",
  },
});
// Create a function to generate a PDF/A-3 file from scratch

// Call the functions

router.post("/", async (req, res) => {
  console.log("eree");
  const { name, email, message } = req.body;

  const text = `
    Hi ${name},
    Your otp is ${message}

    Warm regards,
    The WhereShouldIGo Team`;

  const mailOptions = {
    from: email,
    to: email, // Your recipient
    subject: `OTP for email verification`,
    text: "",
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Email failed");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;

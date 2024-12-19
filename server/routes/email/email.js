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
  const { name, email, message } = req.body;
  console.log("opop", name, email);
  function createPDF(text, callback) {
    const doc = new PDFDocument();
    const fileName = "Itinerary.pdf";

    // Pipe the PDF to a file or buffer
    const writeStream = fs.createWriteStream(fileName);
    doc.pipe(writeStream);

    // Add text content
    // doc.image("../../constant/images/logo.png", {
    //   fit: [250, 300],
    //   align: "left",
    //   valign: "left",
    // });

    doc.fontSize(25).text("Itinerary", {
      align: "left",
    });

    const msgObj = JSON.parse(message);
    console.log("op", msgObj);
    for (let i = 0; i < msgObj.length; i++) {
      doc
        .font("Times-Roman")
        .fontSize(12)
        .text(`${msgObj[i].day} : ${msgObj[i].destination}`, {
          align: "left",
        });

      doc.fontSize(10).text(`Morning: ${msgObj[i].morning}`, {
        align: "left",
      });
      doc.fontSize(10).text(`Afternoon: ${msgObj[i].afternoon}`, {
        align: "left",
      });
      doc.fontSize(10).text(`Evening: ${msgObj[i].evening}`, {
        align: "left",
        margin: "20px",
      });
    }
    let i = 0;
    for (const key of Object.keys(msgObj)) {
      i++;
      const keyData = msgObj?.[key]?.["day"] || `Day ${i}`;
      const keyDestination = msgObj?.[key]?.["destination"];
      const keyAfternoon = msgObj?.[key]?.["afternoon"];
      const keyMorning = msgObj?.[key]?.["morning"];
      const keyEvening = msgObj?.[key]?.["evening"];
      doc
        .font("Times-Roman")
        .fontSize(12)
        .text(`${keyData} : ${keyDestination}`, {
          align: "left",
        });

      doc.fontSize(10).text(`Morning: ${keyMorning}`, {
        align: "left",
      });
      doc.fontSize(10).text(`Afternoon: ${keyAfternoon}`, {
        align: "left",
      });
      doc.fontSize(10).text(`Evening: ${keyEvening}`, {
        align: "left",
        margin: "20px",
      });
    }
    // Finalize the PDF
    doc.end();
    console.log("gt");

    // Wait for the writeStream to finish, then execute the callback
    writeStream.on("finish", () => {
      callback(fileName);
    });
  }

  async function sendEmail(pdfPath) {
    const text = `Hi ${name},

Thank you for choosing WhereShouldIGo to plan your next adventure! We’re thrilled to have been part of your journey, helping you discover the perfect destination tailored just for you.

As you set off on your upcoming trip, we wish you the best of luck and countless memorable moments along the way. May your journey be filled with joy, discovery, and everything you hoped for!

If you ever need more travel inspiration, tips, or recommendations, we’re here for you. Don’t hesitate to visit us again for your future adventures.

Bon voyage and safe travels! 🌟

Warm regards,
The WhereShouldIGo Team`;
    const mailOptions = {
      from: "senmalvika981@gmail.com",
      to: email || "senmalvika981@gmail.com", // Your recipient
      subject: `Your PDF is ready ${name}`,
      text: "Please find the attached PDF.",
      attachments: [
        {
          filename: "Itinerary.pdf",
          path: pdfPath,
        },
      ],
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
  }
  const textContent = "This is the content of the PDF. Feel free to edit it!";
  createPDF(textContent, (pdfPath) => {
    sendEmail(pdfPath);
  });
});

module.exports = router;

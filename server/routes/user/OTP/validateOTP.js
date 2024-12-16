const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("yui", email, password);
    res.json({});
  } catch (err) {
    res.status(500).json({ error: "Failed to validate Otp " });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("yui", email, password);
    res.json({});
  } catch (err) {
    res.status(500).json({ error: "Failed to generate otp " });
  }
});

module.exports = router;

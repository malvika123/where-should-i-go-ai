const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("yui", email);
    res.json({});
  } catch (err) {
    res.status(500).json({ error: "Failed to fyp " });
  }
});

module.exports = router;

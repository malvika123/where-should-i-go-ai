const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, name, lname } = req.body;
    console.log("yui", email, password, name, lname);
    res.json({});
  } catch (err) {
    res.status(500).json({ error: "Failed to log user In " });
  }
});

module.exports = router;

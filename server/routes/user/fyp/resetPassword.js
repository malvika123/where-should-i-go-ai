const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("yui", email, newPassword);
    const resetPassword = await axios.post(
      "http://localhost:4200/api/resetPassword",
      { email, newPassword }
    );
    const { id } = resetPassword?.data;
    res
      .status(200)
      .setHeader("Set-Cookie", [`cuid=${id}; path=/;`])
      .setHeader("Content-Type", "application/json")
      .json(resetPassword?.data);
    res.end();
  } catch (err) {
    console.log(err?.response?.data);
    res.status(500).json(err?.response?.data);
  }
});

module.exports = router;

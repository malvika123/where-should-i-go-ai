const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id, "op");
    const userTokenData = await axios.post(
      "http://localhost:4200/api/generateAndUpdateOtp",
      { id }
    );

    console.log("yui", userTokenData?.data);
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to generate otp " });
  }
});

module.exports = router;

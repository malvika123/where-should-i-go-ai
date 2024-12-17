const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("data", email, password);

    const data = await axios.post("http://localhost:4200/api/login", {
      email,
      password,
    });
    console.log(data);

    const dataObj = data?.data;
    const { status, cuid, message } = dataObj;
    const resObj = {
      status: status,
      id: cuid,
      message: message,
    };
    res
      .status(200)
      .setHeader("Set-Cookie", [`cuid=${cuid}; path=/;`])
      .setHeader("Content-Type", "application/json")
      .json(resObj);
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err?.response?.data?.message || "Something went wrong",
      code: err?.response?.data?.code || 500,
    });
  }
});

module.exports = router;

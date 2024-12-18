const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    console.log("opop");
    const data = await axios.post(
      "http://localhost:4200/api/logoutAndClearData",
      {
        id,
      }
    );
    res
      .status(200)
      .setHeader("Set-Cookie", [
        `cuid=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
        `aTkn=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
        `iv=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
      ])
      .setHeader("Content-Type", "application/json")
      .json({ msg: "user log out" });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err?.response?.data?.message,
      code: err?.response?.data?.code,
    });
  }
});

module.exports = router;

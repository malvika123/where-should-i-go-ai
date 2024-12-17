const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    console.log("meow");
    const { email, pin } = req.body;
    console.log(req.headers.cookie.split(";")[0].split("=")[1]);
    const cuid = req.headers.cookie.split(";")[0].split("=")[1];
    console.log("yui", email, pin, "kio", cuid);
    const data = await axios.post(
      `http://localhost:4200/api/checkUserOtp`,
      {
        pin: pin,
      },
      {
        params: {
          id: cuid,
        },
      }
    );
    const cookie = data?.headers["set-cookie"]
      .find((elt) => elt.includes("aTkn"))
      .split(";")[0];
    const index = cookie.indexOf("=");
    const value = cookie.slice(index + 1);
    console.log("io", value);

    res
      .status(200)
      .setHeader("Set-Cookie", [`aTkn=${cookie}; path=/;`])
      .setHeader("Content-Type", "application/json")
      .json(data?.data);
    res.end();
  } catch (err) {
    console.log("this", err?.response?.data);
    const errStatus = err?.status || 500;
    const errMessage = err?.response?.data || "Something went wrong";
    res.status(errStatus).json(errMessage);
  }
});

module.exports = router;

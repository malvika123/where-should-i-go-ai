const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { email, pin } = req.body;

    const cuid = req?.headers?.cookie?.split(";")?.[0].split("=")[1];
    console.log("yui", email, pin, "kio", cuid);
    const data = await axios.post(
      `http://localhost:4200/api/checkUserOtp`,
      {
        pin: pin,
        email,
      },
      {
        params: {
          id: cuid,
        },
      }
    );
    const atknCookie = data?.headers["set-cookie"]
      .find((elt) => elt.includes("aTkn"))
      .split(";")[0];

    const index = atknCookie.indexOf("=");
    const value = atknCookie.slice(index + 1);
    console.log("io", value);

    const iv = data?.headers["set-cookie"]
      .find((elt) => elt.includes("iv"))
      .split(";")[0]
      .split("=")[1];
    console.log(iv);
    res
      .status(200)
      .setHeader("Set-Cookie", [`aTkn=${value}; path=/;`, `iv=${iv}; path=/;`])
      .setHeader("Content-Type", "application/json")
      .json(data?.data);
    res.end();
  } catch (err) {
    console.log("this", err);
    const errStatus = err?.status || 500;
    const errMessage = err?.response?.data || "Something went wrong";
    res.status(errStatus).json(errMessage);
  }
});

module.exports = router;

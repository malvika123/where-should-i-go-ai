const express = require("express");
const router = express.Router();
const axios = require("axios");

const checkUserAuthnToken = async ({ id, token, iv }) => {
  if (iv && id && token) {
    const userTokenData = await axios.post(
      "http://localhost:4200/api/checkUserToken",
      {
        id,
        token,
        iv,
      }
    );
    if (userTokenData?.data?.auth !== true) {
      return false;
    }
    return true;
  } else {
    false;
  }
};

const isUserSessionValid = async (req, res) => {
  try {
    const { id, token, iv } = req.body;
    console.log("data4", id, token);

    const userTokenDataValid = await checkUserAuthnToken({ id, token, iv });
    if (!userTokenDataValid) {
      res
        .status(400)
        .setHeader("Set-Cookie", [
          `cuid=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
          `aTkn=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
          `iv=""; path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`,
        ])
        .setHeader("Content-Type", "application/json")
        .json({ msg: "unauthorized" });
      res.end();
      return;
    }
    res.status(200).json({ msg: "authorized" });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err?.response?.data?.message || "Something went wrong",
      code: err?.response?.data?.code || 500,
    });
  }
};

router.post("/", isUserSessionValid);

module.exports = { isUserSessionValid, checkUserAuthnToken };

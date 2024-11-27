const express = require("express");
const router = express.Router();
const axios = require("axios");
const { GET_STATE_TOKEN, email } = require("../../constant/const");

router.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          'Accept': "application/json",
          "api-token": 'CNlLNblBnIUIAvxjT0z43bcQSAnlFO54GpCSvnJxoIyg0Yb2jF8EHrNU2yYEzKS9ols',
          "user-email": 'malvikasen555@gmail.com',
        },
      }
    );
    const data = result?.data?.auth_token;
    res.json(data);
  } catch (error) {
    res.status(400).json(error?.response?.data);
  }
});

module.exports = router;

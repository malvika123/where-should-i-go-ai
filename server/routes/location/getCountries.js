const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const data = await axios.get(
      "https://www.universal-tutorial.com/api/countries/",
      {
        headers: {
          Authorization: `Bearer ${req?.body?.authz}`,
          Accept: "application/json",
        },
      }
    );
    const result = data?.data.map((elt, i) => {
      return elt["country_name"];
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: "error" });
  }
});

module.exports = router;

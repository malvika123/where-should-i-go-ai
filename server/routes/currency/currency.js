const express = require("express");
const router = express.Router();
const countryToCurrency = require( 'country-to-currency' );
const axios = require("axios");

router.post("/", async (req, res) => {
    try {
        const result = await axios.get("https://ipapi.co/json/");
        const data = result?.data;
          res.json({cur: data?.currency});
          
      } catch (error) {
        res.status(500).json({err:"something went wrong"});
      }
});

module.exports = router;

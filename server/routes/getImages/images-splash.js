const express = require("express");
const router = express.Router();
const axios = require("axios");
const { GET_STATE_TOKEN, email } = require("../../constant/const");

router.post("/", async (req, res) => {
  const place = req?.body?.place;
  const url = `https://api.unsplash.com/search/photos?query=${place}&per_page=30&client_id=tziSfprnh5dy5jMwfrGnbNXr7VWP1CofLABofuKx1kA`;
  try {
    const result = await axios.get(url);
    console.log(result?.data?.results);
    const imgUrls = result?.data?.results?.map((elt) => elt?.urls.regular);
    console.log(place);
    res.json({ urls: imgUrls });
  } catch (error) {
    res.status(400).json(error?.response?.data);
  }
});

module.exports = router;

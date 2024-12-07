const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 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",
  };
  try {
    // const {
    //   days,
    //   mnth,
    //   gender,
    //   selectedStates,
    //   country,
    //   tripType,
    //   pets,
    //   hasFemale,
    //   hasKids,
    //   minValue,
    //   maxValue,
    //   currency,
    //   modifiedCurrency,
    //   slctdActsSet,
    //   text,
    // } = req.body;

    const prompt = "";
    const model = {
      TURBO3: "gpt-3.5-turbo",
      GPT4: "gpt-4",
      GPT4_TURBO: "gpt-4-turbo",
    };
    const data = {
      model: model.TURBO3,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };

    //const result = await axios.post(url, data, { headers });
    console.log("result");
    res.json({});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

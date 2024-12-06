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
    const {
      days,
      mnth,
      gender,
      selectedStates,
      country,
      tripType,
      pets,
      hasFemale,
      hasKids,
      minValue,
      maxValue,
      currency,
      modifiedCurrency,
      slctdActsSet,
      text,
    } = req.body;

    const prompt = ` i'm looking to travel in the month of ${mnth} for ${days} days. i'm a ${gender} and i'm interested in visiting ${country} among any of these states ${selectedStates}. this is a ${tripType} ${
      pets || hasKids ? "i'll travel with" : ""
    }${pets ? " pets" : ""} ${
      pets && hasKids ? " and kids" : hasKids ? " kids" : ""
    }. ${
      hasFemale
        ? "i have females going with us as well so this needs to be a strictly safe place"
        : ""
    } My budget is in the range ${minValue} - ${maxValue} ${
      modifiedCurrency ? modifiedCurrency : currency
    } I'm interested in following activities ${slctdActsSet}} ${
      text ? `in addition to this ${text}` : ""
    } ${
      gender === "Female"
        ? "Also as i'm a female i need you to think about my safety and security"
        : hasKids
        ? " also kids are involved to take that in higher consideration from the perspective of safety"
        : ""
    } I'm confused as to where should i go . give me an JSON in response as following, field one (name: state) - state, reason(name:reason) for the choice of this state, field two (name: places_to_visit")- places to visit in this state along with description, field 3 -(name:off_beat_places) off beat places with description and last field(name: precautions) precausions to be taken and this data should follow all the above given data`;

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };
    //console.log(prompt);
    const result = await axios.post(url, data, { headers });
    console.log(result?.data?.choices);
    const content = result?.data?.choices?.[0]?.message?.content;
    console.log(content);
    const obj = content?.replace(/\n/g, "");
    const jsonObj = JSON.parse(obj);
    res.json({ jsonObj });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

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
    } I'm confused as to where should i go . Please assess all the provided details and give me answer strictly as first return the state in first line, then return name of the places i should visit as list then return list of places that are underhyped but are good`;

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };
    //console.log(prompt);
    //const result = await axios.post(url, data, { headers });
    //onsole.log("kio", result?.data?.choices?.[0]?.message?.content);
    //res.json({ res: result?.data?.choices?.[0]?.message?.content });
    res.json({
      res: "Federally Administered Tribal Area: 1. Peshawar - Visit the Peshawar Museum, Bala Hisar Fort, and Qissa Khwani Bazaar 2. Swat Valley - Explore Mingora, Malam Jabba Ski Resort, and Swat Museum Underhyped but good places: 1. Khyber Pass - Experience the historic passageway between Pakistan and Afghanistan 2. Mohenjo-Daro - Visit the ancient archaeological site in Sindh Please note that the Federally Administered Tribal Area may not be the safest choice for a family trip, especially with kids and females. Consider exploring other regions of Pakistan that may be more suitable for your travel preferences and safety concerns.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

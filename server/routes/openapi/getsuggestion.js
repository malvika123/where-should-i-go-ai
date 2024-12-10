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
    } I'm confused as to where should i go. give me places as per the number of days i'm travelling. give me an JSON in response as following, field one (name: state) - state, reason(name:reason) for the choice of this state, field two (name: places_to_visit)- places to visit in this state along with description, field 3 -(name:off_beat_places) off beat places with description and last field(name: precautions) precausions to be taken in a paragraph and this data should follow all the above given data and give no more text other than the json`;

    const model = {
      TURBO3: "gpt-3.5-turbo",
      GPT4: "gpt-4",
      GPT4_TURBO: "gpt-4-turbo",
    };
    const data = {
      model: model.GPT4_TURBO,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };
    const flag = true;
    if (flag) {
      const result = await axios.post(url, data, { headers });
      const content = result?.data?.choices?.[0]?.message?.content;
      console.log(content);
      let obj = content.replace(/```/g, "").replace(/json/g, "").trim();
      const jsonObj = JSON.parse(obj);
      res.json({ jsonObj });
    } else {
      res.json({
        jsonObj: {
          state: "Fukui",
          reason:
            "Fukui offers a blend of cultural heritage, natural beauty, and safety, making it ideal for solo female travelers interested in museums, trekking, and sightseeing.",
          places_to_visit: [
            {
              name: "Eiheiji Temple",
              description:
                "A serene Zen Buddhist temple set in an ancient forest, offering a peaceful retreat and insight into monastic life.",
            },
            {
              name: "Fukui Prefectural Dinosaur Museum",
              description:
                "One of the best dinosaur museums in Japan, located in Katsuyama, showcasing a vast collection of dinosaur skeletons and fossils.",
            },
            {
              name: "Maruoka Castle",
              description:
                "Known as the 'Mist Castle', this is one of the oldest surviving castles in Japan, offering a glimpse into Japan's feudal past and a panoramic view of the surrounding area.",
            },
          ],
          off_beat_places: [
            {
              name: "Mikata Five Lakes",
              description:
                "A beautiful and less-visited series of lakes that offer stunning landscapes and opportunities for trekking and nature walks.",
            },
            {
              name: "Tojinbo Cliffs",
              description:
                "Spectacular rugged cliffs along the Sea of Japan, offering dramatic views and a less touristy experience.",
            },
          ],
          precautions:
            "As a solo female traveler in Fukui, generally, Japan is considered very safe. However, always keep your belongings secure, be aware of your surroundings, and follow local customs and etiquette. It's advisable to have travel insurance, carry a bilingual map or GPS, and keep emergency numbers handy. Avoid isolated areas late at night and always inform someone of your travel itinerary for additional safety.",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

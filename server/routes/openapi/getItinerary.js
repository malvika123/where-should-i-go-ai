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
    const { days, tripType, area, state, underhyped, month, gender } =
      req?.body;
    console.log(
      req?.body.area,
      "hyu",
      days,
      tripType,
      area,
      state,
      underhyped,
      month,
      gender
    );

    const prompt = `I'm a ${gender} who wants to explore ${state} and in these areas - ${area} in the month of ${month}.Its a ${tripType} Give me an itinerary for exactly ${days} based on this info in a JSON response only where the firs field should be day(name-day), inside this array should be key destination(name-destination), key (name-morning) its value to be what should i do during morning in details, key afternoon(name afternoon) its value to be what should i do during morning in details, key evening(name evening) its value to be what should i do during morning in details. and repeat this for all the days. and only send the json ano other string apart from that`;
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

    const result = await axios.post(url, data, { headers });
    console.log("result", result?.data?.choices?.[0]?.message?.content);
    const itinerary = JSON.parse(result?.data?.choices?.[0]?.message?.content);

    // const itinerary = {
    //   day1: {
    //     destination: "Bangalore",
    //     morning:
    //       "Start your day with a visit to Lalbagh Botanical Garden for a peaceful walk amidst nature.",
    //     afternoon:
    //       "Head to Tipu Sultan's Summer Palace for a glimpse into the history of the region.",
    //     evening:
    //       "Explore the vibrant markets of Chickpet and Kempegowda for some shopping and local street food.",
    //   },
    //   day2: {
    //     destination: "Hampi",
    //     morning:
    //       "Visit the iconic Virupaksha Temple and witness the sunrise over the ruins of Hampi.",
    //     afternoon:
    //       "Explore the ancient ruins of the Vijayanagara Empire, including the Lotus Mahal and Elephant Stables.",
    //     evening:
    //       "Climb Matanga Hill for a panoramic view of the Hampi landscape during sunset.",
    //   },
    //   day3: {
    //     destination: "Gokarna",
    //     morning:
    //       "Relax on the pristine beaches of Gokarna like Om Beach or Kudle Beach.",
    //     afternoon:
    //       "Visit the Mahabaleshwar Temple and explore the quaint streets of Gokarna town.",
    //     evening:
    //       "Enjoy a beachside bonfire and stargazing session on one of the secluded beaches.",
    //   },
    //   day4: {
    //     destination: "Coorg",
    //     morning:
    //       "Embark on a coffee plantation tour and learn about the process of coffee cultivation.",
    //     afternoon:
    //       "Trek to the beautiful Abbey Falls and enjoy a picnic lunch by the cascading waterfalls.",
    //     evening:
    //       "Visit the Namdroling Monastery to witness the Tibetan Buddhist culture and catch the evening prayer ceremony.",
    //   },
    //   day5: {
    //     destination: "Chikmagalur",
    //     morning:
    //       "Hike to the top of Mullayanagiri, the highest peak in Karnataka, for breathtaking views of the Western Ghats.",
    //     afternoon:
    //       "Explore the coffee estates and enjoy a freshly brewed cup of local coffee.",
    //     evening:
    //       "Visit the Bhadra Wildlife Sanctuary for a jeep safari and spot native wildlife in their natural habitat.",
    //   },
    // };
    res.json({ itinerary });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

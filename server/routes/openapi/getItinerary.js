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

    const prompt = `I'm a ${gender} who wants to explore ${state} and in these areas - ${area} in the month of ${month}.Its a ${tripType} Give me an itinerary for exactly ${days} based on this info in a JSON response only where the first field should be day(name-day), inside this should be key destination(name-destination), key (name-morning) its value to be what should i do during morning in details, key afternoon(name afternoon) its value to be what should i do during morning in details, key evening(name evening) its value to be what should i do during morning in details. and repeat this for all the days. dont' send anything apart from that JSON strictly`;
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
      console.log("result", result?.data?.choices?.[0]?.message?.content);
      const content = result?.data?.choices?.[0]?.message?.content;
      const cleanObj = content.replace(/```/g, "").replace(/json/g, "").trim();
      console.log(cleanObj);
      const itinerary = JSON.parse(cleanObj);
      res.json({ itinerary });
    } else {
      const itinerary = [
        {
          day: "Day 1",
          destination: "Manali",
          morning:
            "Arrive in Manali and check into your hotel. Spend the morning acclimatizing and exploring the Mall Road where you can shop for local handicrafts and woolens.",
          afternoon:
            "Visit the Hadimba Devi Temple, a beautiful wooden temple set in the middle of a forest called Dhungiri Van Vihar.",
          evening:
            "Enjoy a relaxing evening at a local cafe or try some local Himachali cuisine at a restaurant.",
        },
        {
          day: "Day 2",
          destination: "Solang Valley",
          morning:
            "After breakfast, drive to Solang Valley. Engage in activities like paragliding, zorbing, and skiing depending on the snow conditions.",
          afternoon:
            "Continue enjoying the outdoor activities available. Optionally, take a short trek nearby or ride a cable car to get panoramic views of the valley.",
          evening:
            "Return to Manali and spend the evening at leisure, perhaps enjoying a hot beverage by a bonfire.",
        },
        {
          day: "Day 3",
          destination: "Gulaba and Kothi",
          morning:
            "Drive to Gulaba, which is known for its scenic beauty. Enjoy the snow and the serene atmosphere.",
          afternoon:
            "Visit Kothi, a picturesque village that offers magnificent views of the snow-capped mountains and glaciers. Ideal for photography and enjoying peaceful moments.",
          evening:
            "Head back to Manali. You can explore local eateries or have a relaxing night in your hotel.",
        },
        {
          day: "Day 4",
          destination: "Kullu",
          morning:
            "Take a day trip to Kullu. Visit the Raghunath Temple and explore the local market for more shopping of traditional goods.",
          afternoon:
            "Go for river rafting on the Beas River, offering thrilling adventures for you and your partner.",
          evening:
            "Drive back to Manali. Enjoy an intimate dinner at one of Manali’s upscale restaurants.",
        },
        {
          day: "Day 5",
          destination: "Manikaran",
          morning:
            "Drive to Manikaran, famous for its hot springs. Visit the Manikaran Sahib Gurudwara to experience its spiritual ambiance.",
          afternoon:
            "Relax in the hot springs and visit the local temples around Manikaran. Enjoy the serene atmosphere and picturesque landscapes.",
          evening:
            "Return to Manali. Spend your evening shopping for some last-minute souvenirs along the Mall Road.",
        },
        {
          day: "Day 6",
          destination: "Naggar Castle",
          morning:
            "Visit Naggar Castle, an ancient castle offering splendid views of the Kullu valley. Explore the art museum located within the castle.",
          afternoon:
            "Have lunch at the castle’s restaurant, which offers traditional Himachali food and a great view. Post lunch, visit the Nicholas Roerich Art Gallery nearby.",
          evening:
            "Drive back to Manali. Pack up your belongings and prepare for departure the next day.",
        },
      ];
      //const a = setTimeout(() => itinerary, 90000);
      res.json({ itinerary });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "caught an error" });
  }
});

module.exports = router;

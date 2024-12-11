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
    const { recomm, newData } = req?.body;
    console.log(req?.body.area, "hyu", recomm, newData);

    const prompt = `This is my recommendation ${recomm}  but i' want your help you modify it according to the following info ${newData}, return the updated itinerary response same as the JSON provided above and send no other string just JSON`;
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
    const flag = false;

    if (flag) {
      const result = await axios.post(url, data, { headers });
      console.log("result", result?.data?.choices?.[0]?.message?.content);
      const content = result?.data?.choices?.[0]?.message?.content;
      const cleanObj = content.replace(/```/g, "").replace(/json/g, "").trim();
      console.log(cleanObj);
      const jsonObj = JSON.parse(cleanObj);
      res.json({ jsonObj });
    } else {
      //const a = setTimeout(() => itinerary, 90000);
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

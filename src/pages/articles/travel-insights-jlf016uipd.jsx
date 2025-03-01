
import React from 'react';

export default function Article() {
    return (
       {
  const words = [
    "India", "Asia", "AI", "top destinations", "journey",
    "Top Travel Industry Trends", "Train travel", "Air travel",
    "Overtourism", "Curious travellers", "best eateries",
    "Out of office", "Pop culture", "Solo travel",
    "Trending Destinations", "Best Value Destinations",
    "trending topics 2025", "Astro Adventurers",
    "solo travel quotes", "Bali", "Thailand", "New York",
    "Dubai", "Iraq", "Afghanistan", "Delhi", "Goa",
    "Atlantic Ocean", "deep sea", "open ai", "Korea", "Japan"
  ];
  return words[Math.floor(Math.random() * words.length)];
}

function ArticleContainer() {
  const topic = getRandomWord();

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
      marginLeft: "15%",
      marginRight: "15%",
      marginTop: "3%",
      marginBottom: "5%",
      fontWeight: "lighter",
      textAlign: "left",
    }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50", fontSize: "25px", marginTop: "3%", marginBottom: "3%" }}>
        Latest on {topic}
      </h1>

      <p style={{ fontSize: "18px" }}>
        Explore the emerging trends and key insights about {topic}.
      </p>

      <h2 style={{ color: "#2980b9", fontSize: "20px", marginTop: "1%", marginBottom: "1%" }}>
        Discovering {topic}
      </h2>

      <p style={{ fontSize: "18px" }}>
        Join us as we delve deeper into what makes {topic} a must-visit destination this year.
      </p>

      <p style={{ fontSize: "18px" }}>
        From hidden gems to popular spots, find out everything {topic} has to offer.
      </p>

      <h2 style={{ color: "#2980b9", fontSize: "20px", marginTop: "1%", marginBottom: "1%" }}>
        Planning Your Trip to {topic}
      </h2>

      <p style={{ fontSize: "18px" }}>
        Get tips on the best time to visit {topic}, accommodations, and attractions.
      </p>

      <p style={{ fontSize: "18px" }}>
        Learn about local customs and how to make the most of your journey in {topic}.
      </p>

      <h2 style={{ color: "#2980b9", fontSize: "20px", marginTop: "1%", marginBottom: "1%" }}>
        Top Experiences in {topic}
      </h2>

      <p style={{ fontSize: "18px" }}>
        Don't miss our top picks for activities and experiences that you can only find in {topic}.
      </p>

      <p style={{ fontSize: "18px" }}>
        Whether it's adventure, relaxation, or cultural exploration, {topic} has it all.
      </p>
    </div>
)
}
  
import React from "react";

export default function Article() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "3%",
        marginBottom: "5%",
        fontWeight: "lighter",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "22px",
          marginTop: "3%",
          marginBottom: "3%",
        }}
      >
        Exploring the Rise of AI in Travel Planning
      </h1>
      <p style={{ fontSize: "18px" }}>
        As artificial intelligence (AI) continues to advance, travel planning is
        becoming more innovative and personalized, transforming the way
        travelers prepare for their journeys.
      </p>
      <h2
        style={{
          color: "#2980b9",
          fontSize: "20px",
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        Personalized Itinerary Suggestions
      </h2>
      <p style={{ fontSize: "18px" }}>
        AI algorithms analyze your preferences and past travel history to
        suggest destinations, activities, and dining options that might interest
        you, making each trip uniquely tailored to your tastes.
      </p>
      <p style={{ fontSize: "18px" }}>
        This technology not only saves time but also helps uncover hidden gems
        and experiences that traditional search engines might miss.
      </p>
      <h2
        style={{
          color: "#2980b9",
          fontSize: "20px",
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        Real-time Travel Assistance
      </h2>
      <p style={{ fontSize: "18px" }}>
        AI-powered tools provide real-time updates and assistance, from flight
        delays to language translation, ensuring a smoother travel experience.
      </p>
      <p style={{ fontSize: "18px" }}>
        These systems can also adapt quickly to changes, offering alternate
        arrangements as necessary.
      </p>
    </div>
  );
}

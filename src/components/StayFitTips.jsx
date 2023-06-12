import React from "react";
import "./Fitnesstips.css";
const StayFitTips = () => {
  const fitnessTips = [
    {
      title: "Exercise Regularly",
      description:
        "Engage in physical activities such as walking, jogging, cycling, or swimming for at least 30 minutes a day to improve cardiovascular health and maintain a healthy weight.",
    },
    {
      title: "Eat a Balanced Diet",
      description:
        "Include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats in your diet. Avoid excessive consumption of processed foods, sugary snacks, and beverages.",
    },
    {
      title: "Stay Hydrated",
      description:
        "Drink an adequate amount of water throughout the day to maintain proper hydration. Water helps regulate body temperature, aids digestion, and supports overall health.",
    },
    {
      title: "Get Sufficient Sleep",
      description:
        "Ensure you get 7-9 hours of quality sleep each night. Sufficient sleep is essential for the body to repair and rejuvenate, improve cognitive function, and support overall well-being.",
    },
    {
      title: "Manage Stress",
      description:
        "Practice stress management techniques such as deep breathing exercises, meditation, or engaging in activities you enjoy. Chronic stress can negatively impact physical and mental health.",
    },
    {
      title: "Strength Training",
      description:
        "Incorporate strength training exercises into your routine to build muscle, increase bone density, and boost metabolism. Aim for 2-3 sessions per week targeting major muscle groups.",
    },
  ];

  return (
    <div>
      <h2>Fitness Tips:</h2>
      <div className="fitnessTips">
        {fitnessTips.map((tip, index) => (
          <div key={index} className="tips">
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
            <hr />
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default StayFitTips;

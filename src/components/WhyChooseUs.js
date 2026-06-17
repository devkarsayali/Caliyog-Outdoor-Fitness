import React from "react";
import "../style/WhyChooseUs.css";

import why1 from "../assets/why1.png";
import why2 from "../assets/why2.png";
import why3 from "../assets/why3.png";
import why4 from "../assets/why4.png";

function WhyChooseUs() {
  const features = [
    {
      image: why1,
      title: "Expert Trainers",
      description:
        "Our certified trainers provide personalized workout plans to help you achieve your fitness goals faster and safely.",
    },
    {
      image: why2,
      title: "Modern Facilities",
      description:
        "Train with advanced equipment in a clean, energetic, and motivating environment designed for performance.",
    },
    {
      image: why3,
      title: "Nutrition Guidance",
      description:
        "Get expert diet plans, nutrition advice, and healthy lifestyle tips for complete body transformation.",
    },
    {
      image: why4,
      title: "Flexible Timings",
      description:
        "Choose from convenient morning and evening batches that fit perfectly into your daily schedule.",
    },
  ];

  return (
    <section id="whychooseus" className="why-section">
      <div className="why-title">
        <h2>WHY CHOOSE US?</h2>

        <p>
          We work for fitness, strength, and performance —
          not just looks.
        </p>
      </div>

      <div className="why-container">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-image">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </div>

            <div className="why-content">
              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
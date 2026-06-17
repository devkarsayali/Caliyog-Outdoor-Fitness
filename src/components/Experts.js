import React, { useState } from "react";
import "../style/Experts.css";
import expertsImage from "../assets/experts.png";

function Experts() {
  const [showInfo, setShowInfo] = useState(false);

  const experts = [
    {
      name: "Ketan Sankpal",
      role: "Founder of CaliYog Fitness Club",
      info: "K-11 Certified, Calisthenics Level-1 Trainer, 9+ years experience.",
    },
    {
      name: "Rohan Bagadi",
      role: "Calisthenics Athlete",
      info: "4 years teaching experience. D.Pharmacy.",
    },
    {
      name: "Drushti Patel",
      role: "National Level Athlete",
      info: "Rugby & Running Coach. 1 year teaching experience.",
    },
    {
      name: "Kabirsingh Thakur",
      role: "K-11 Certified Coach",
      info: "International Taekwondo Athlete. 4 years teaching experience.",
    },
    {
      name: "Vikas Lambe",
      role: "Special Population Coach",
      info: "K-11 Certified Coach. 7 years teaching experience.",
    },
    {
      name: "Harshal Aldar",
      role: "Endurance Specialist",
      info: "National Athlete. 30+ Marathon Medalist.",
    },
    {
      name: "Prathamesh Shinde",
      role: "100 Meter Sprinter",
      info: "Athletics Coach. 1 year teaching experience.",
    },
    {
      name: "Mayur Sutar",
      role: "K-11 Certified Coach",
      info: "5 years coaching experience. National Level Calisthenics Athlete.",
    },
    {
      name: "Jalya Nadar",
      role: "National Level Weightlifter",
      info: "K-11 Certified Coach. 3 years coaching experience.",
    },
    {
      name: "Rajiv Chougule",
      role: "Professional Cricketer",
      info: "K-11 Certified Coach. MCA Player.",
    },
  ];

  return (
    <section
      id="experts"
      className="experts-section"
    >
      <div className="experts-heading">
        <h2>MEET OUR FITNESS EXPERTS</h2>

        <p>
          Learn from certified coaches, athletes, and fitness
          professionals dedicated to helping you achieve your
          fitness goals.
        </p>
      </div>

      <div className="experts-image-container">
        <img
          src={expertsImage}
          alt="CaliYog Fitness Experts"
          className="experts-image"
          loading="lazy"
        />
      </div>

      <div className="expert-btn-box">
        <button
          className="expert-info-btn"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {showInfo
            ? "Hide Information"
            : "All Information"}
        </button>
      </div>

      {showInfo && (
        <div className="experts-info-container">
          {experts.map((expert, index) => (
            <div
              className="expert-info-card"
              key={index}
            >
              <h3>{expert.name}</h3>

              <h4>{expert.role}</h4>

              <p>{expert.info}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Experts;
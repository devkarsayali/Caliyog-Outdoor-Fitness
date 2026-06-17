import React from "react";
import "../style/Batches.css";

function Batches() {
  const batches = [
    {
      icon: "🔥",
      title: "Weight Loss & Fitness",
      points: [
        "Core & Cardiovascular Training",
        "Functional Training",
        "Strength Training",
        "Agility Training",
        "Yoga",
      ],
    },
    {
      icon: "🏆",
      title: "Athlete Batch",
      points: [
        "Static Strength",
        "Dynamic Strength",
        "Explosive Strength",
        "Sports Specific Training",
        "Advanced Skill Programming",
      ],
    },
    {
      icon: "🧘‍♀️",
      title: "Special Ladies Batch",
      points: [
        "Yoga",
        "Strength Training",
        "Agility",
        "Functional Training",
        "Flexibility",
      ],
    },
    {
      icon: "💪",
      title: "Intermediate Calisthenics",
      points: [
        "Basic Pull & Push Movements",
        "Weight Training Sessions",
        "Calisthenics Routine",
        "Skill Training",
        "Yoga",
      ],
    },
    {
      icon: "⚡",
      title: "Kids Batch",
      points: [
        "Mind Development",
        "Body Connection",
        "Agility Drills",
        "Mobility & Joint Health",
        "Sports Specific Training",
      ],
    },
  ];

  return (
    <section className="batches-section" id="batches">
      <div className="section-title">
        <span>TRAINING PROGRAMS</span>

        <h2>Batches We Provide</h2>

        <p>
          Professional fitness programs designed for all age groups.
        </p>
      </div>

      <div className="batch-details">
        {batches.map((batch, index) => (
          <div className="batch-card" key={index}>
            <div className="batch-icon">
              {batch.icon}
            </div>

            <h3>{batch.title}</h3>

            <ul>
              {batch.points.map((point, i) => (
                <li key={i}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="timing-section">
        <div className="section-title">
          <span>BATCH TIMINGS</span>

          <h2>Choose Your Perfect Time Slot</h2>

          <p>
            Morning and evening batches available for all age groups.
          </p>
        </div>

        <div className="timing-grid">
          <div className="timing-box">
            <div className="timing-icon">
              ☀️
            </div>

            <h4>Morning Batch</h4>

            <p>6:00 AM - 7:00 AM</p>
            <p>7:00 AM - 8:00 AM</p>
            <p>8:00 AM - 9:00 AM</p>
            <p>10:00 AM - 11:00 AM</p>
          </div>

          <div className="timing-box">
            <div className="timing-icon">
              🌇
            </div>

            <h4>Evening Batch</h4>

            <p>5:00 PM - 6:00 PM</p>
            <p>6:00 PM - 7:00 PM</p>
            <p>7:00 PM - 8:00 PM</p>
            <p>Kids Batch 6:00 PM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Batches;
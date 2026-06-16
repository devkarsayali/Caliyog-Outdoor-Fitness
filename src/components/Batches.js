import React from "react";
import batchImage1 from "../assets/batches-cover.png";
import batchImage2 from "../assets/batches-cover1.png";
import "../style/Batches.css";

function Batches() {
  return (
    <section className="batches-section" id="batches">
      <div className="section-title">
        <span>TRAINING PROGRAMS</span>
        <h2>Batches We Provide</h2>
        <p>
          Professional fitness programs designed for all age groups.
        </p>
      </div>

      <div className="batch-gallery">
        <img src={batchImage1} alt="CaliYog Batches" />
        <img src={batchImage2} alt="CaliYog Batch Timings" />
      </div>

      <div className="batch-details">
        <div className="batch-card">
          <h3>Weight Loss & Fitness</h3>
          <ul>
            <li>Core & Cardiovascular Training</li>
            <li>Functional Training</li>
            <li>Strength Training</li>
            <li>Agility Training</li>
            <li>Yoga</li>
          </ul>
        </div>

        <div className="batch-card">
          <h3>Athlete Batch</h3>
          <ul>
            <li>Static Strength</li>
            <li>Dynamic Strength</li>
            <li>Explosive Strength</li>
            <li>Sports Specific Training</li>
            <li>Advanced Skill Programming</li>
          </ul>
        </div>

        <div className="batch-card">
          <h3>Special Ladies Batch</h3>
          <ul>
            <li>Yoga</li>
            <li>Strength Training</li>
            <li>Agility</li>
            <li>Functional Training</li>
            <li>Flexibility</li>
          </ul>
        </div>

        <div className="batch-card">
          <h3>Intermediate Calisthenics</h3>
          <ul>
            <li>Basic Pull & Push Movements</li>
            <li>Weight Training Sessions</li>
            <li>Calisthenics Routine</li>
            <li>Skill Training</li>
            <li>Yoga</li>
          </ul>
        </div>

        <div className="batch-card">
          <h3>Kids Batch</h3>
          <ul>
            <li>Mind Development</li>
            <li>Body Connection</li>
            <li>Agility Drills</li>
            <li>Mobility & Joint Health</li>
            <li>Sports Specific Training</li>
          </ul>
        </div>

        <div className="timing-card">
          <h3>Batch Timings</h3>

          <div className="timing-grid">
            <div className="timing-box">
              <h4>Morning</h4>
              <p>6:00 - 7:00 AM</p>
              <p>7:00 - 8:00 AM</p>
              <p>8:00 - 9:00 AM</p>
              <p>10:00 - 11:00 AM</p>
            </div>

            <div className="timing-box">
              <h4>Evening</h4>
              <p>5:00 - 6:00 PM</p>
              <p>6:00 - 7:00 PM</p>
              <p>7:00 - 8:00 PM</p>
              <p>6:00 - 7:00 PM Kids</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Batches;
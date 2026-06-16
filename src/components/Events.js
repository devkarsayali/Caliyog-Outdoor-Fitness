import React from "react";
import "../style/Events.css";

import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import e5 from "../assets/e5.png";
import e6 from "../assets/e6.png";
import e7 from "../assets/e7.png";
import e8 from "../assets/e8.png";

function Events() {
  const events = [
    { img: e1, title: "Outdoor Fitness Event" },
    { img: e2, title: "Group Workout Session" },
    { img: e3, title: "Fitness Challenge" },
    { img: e4, title: "Community Training" },
    { img: e5, title: "Club Celebration" },
    { img: e6, title: "Caliyog Memories" },
    { img: e7, title: "Fitness Community" },
    { img: e8, title: "Team Motivation" },
  ];

  const organisedEvents = [
    "CaliYog National Championship 2024",
    "CaliYog Hyrox Competition",
    "Small Treks × 3",
    "Calisthenics Community Meet-Up",
    "Calisthenics Workshop By Celebrity Coach Kirsten Varela",
    "CaliYog Premier League Cricket × 2",
    "Gala Night Celebration",
    "In-House Championship 2023",
    "CaliYog Run Club 2025",
    "CaliYog Marathon 2025 5K",
  ];

  return (
    <section className="events-section" id="events">
      <div className="events-heading">
        <h2>Events and Clicks</h2>
        <p>Memorable moments from our fitness events and group activities.</p>
      </div>

      <div className="events-grid">
        {events.map((item, index) => (
          <div className="event-card" key={index}>
            <div className="event-img-box">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="event-content">
              <h3>{item.title}</h3>
              <span>View Memory</span>
            </div>
          </div>
        ))}
      </div>

      <div className="events-achievements">
        <div className="achievement-header">
          <span>MAJOR EVENTS</span>
          <h2>Events We Organised In Last Two Years</h2>
          <p>Organised more than 10 big fitness events.</p>
        </div>

        <div className="achievement-list">
          {organisedEvents.map((event, index) => (
            <div className="achievement-item" key={index}>
              <span>{index + 1}</span>
              <p>{event}</p>
            </div>
          ))}
        </div>

        <div className="achievement-stats">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Members Trained</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Transformations</p>
          </div>

          <div className="stat-card">
            <h3>15+</h3>
            <p>National Competitions</p>
          </div>

          <div className="stat-card">
            <h3>20+</h3>
            <p>Trophies Won</p>
          </div>
        </div>

        <div className="coach-message">
          <h3>10+ Coaches Dedicated To One Mission</h3>
          <p>
            Introducing fitness into everyone's life through outdoor training,
            community support, discipline, and performance-based fitness.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Events;
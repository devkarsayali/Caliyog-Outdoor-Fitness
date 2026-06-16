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
    </section>
  );
}

export default Events;
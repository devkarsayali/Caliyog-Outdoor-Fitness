import React from "react";
import cover from "../assets/home-cover.jpg";
import "../style/Home.css";



function Home({ onJoin }) {
  return (
    <section className="home-section" id="home">

      <img
        src={cover}
        alt="Fitness Club"
        className="background-image"
        loading="lazy"
      />

      <div className="overlay"></div>

      <div className="home-content">

        <span className="hero-badge">
          Welcome to CaliYog
        </span>

        <h1 className="home-title">
          CALIYOG OUTDOOR FITNESS CLUB
        </h1>

        <p className="home-subtitle">
          Build Strength • Transform Body • Live Healthy
        </p>

        <button
          className="join-btn"
          onClick={() => onJoin && onJoin()}
        >
          Join Now
        </button>

      </div>

      
    </section>
  );
}

export default Home;
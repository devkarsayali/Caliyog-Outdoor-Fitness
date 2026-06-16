import React from "react";
import cover from "../assets/home-cover.jpg";
import "../style/Home.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

function Home({ onJoin }) {
  return (
    <section className="home-section" id="home">
      <img src={cover} alt="Fitness Club" className="background-image" />

      <div className="overlay"></div>

      <div className="home-content">
        <span className="hero-badge">Welcome to CaliYog</span>

        <h1 className="home-title">
          CALIYOG OUTDOOR FITNESS CLUB
        </h1>

        <p className="home-subtitle">
          Build Strength • Transform Body • Live Healthy
        </p>

        <button className="join-btn" onClick={onJoin}>
          Join Now
        </button>
      </div>

      <div className="contact-info-section">
        <div className="contact-info-box">
          <div className="info-card">
            <span><FaMapMarkerAlt /></span>
            <h3>Address</h3>
            <p>
              Padmavati Colony, Dhamani Road, Near Neminath Nagar Ground, Sangli
            </p>
          </div>

          <div className="info-card">
            <span><FaPhoneAlt /></span>
            <h3>Phone</h3>
            <p>7264025229<br />9404128090</p>
          </div>

          <div className="info-card">
            <span><FaEnvelope /></span>
            <h3>Email</h3>
            <p>caliyogoutdoorfitnessclub@gmail.com</p>
          </div>

          <div className="info-card">
            <span><FaInstagram /></span>
            <h3>Instagram</h3>
            <p>@Cali.yog</p>
          </div>

          <div className="info-card">
            <span><FaGlobe /></span>
            <h3>Website</h3>
            <p>caliyogfitnessclub.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
import React from "react";
import logo from "../assets/CaliYog-Logo.png";
import "./SplashScreen.css";

function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img
          src={logo}
          alt="CaliYog Logo"
          className="splash-logo"
        />

        <h1 className="splash-title">
          CALIYOG OUTDOOR FITNESS CLUB
        </h1>

        <p className="splash-text">
          Build Strength • Transform Body • Live Healthy
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
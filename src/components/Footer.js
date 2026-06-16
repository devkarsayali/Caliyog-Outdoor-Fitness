// src/components/Footer.js

import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">
          <h2>CALIYOG FITNESS CLUB</h2>

          <p>
            Transform Your Body, Build Strength,
            Improve Performance and Live a Healthy Life.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#batches">Batches</a></li>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Contact Info</h3>

          <p>📍 Sangli, Maharashtra</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 caliyogfitness@gmail.com</p>
        </div>

        <div className="footer-box">
          <h3>Follow Us</h3>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            📸 Instagram
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            👍 Facebook
          </a>

          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            ▶️ YouTube
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 CALIYOG Outdoor Fitness Club |
        All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;
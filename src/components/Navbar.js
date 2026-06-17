import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/CaliYog-Logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo-section">
        <img
          src={logo}
          alt="CaliYog Logo"
          className="logo-img"
        />

        <div className="logo">
          CALIYOG
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Navigation */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li><a href="#home" onClick={closeMenu}>Home</a></li>

        <li><a href="#about" onClick={closeMenu}>About</a></li>

        <li>
          <a href="#whychooseus" onClick={closeMenu}>
            Why Choose Us
          </a>
        </li>

        <li><a href="#batches" onClick={closeMenu}>Batches</a></li>

        <li>
          <a href="#membership" onClick={closeMenu}>
            Membership
          </a>
        </li>

        <li>
          <a href="#transformations" onClick={closeMenu}>
            Transformations
          </a>
        </li>

        <li>
          <a href="#experts" onClick={closeMenu}>
            Experts
          </a>
        </li>

        <li>
          <a href="#events" onClick={closeMenu}>
            Events
          </a>
        </li>

        <li>
          <a href="#feedback" onClick={closeMenu}>
            Feedback
          </a>
        </li>

        <li>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </li>

      </ul>

      {/* Button */}
      <a href="#contact" className="join-link">
        <button className="navbar-btn">
          Join Now
        </button>
      </a>

    </nav>
  );
}

export default Navbar;
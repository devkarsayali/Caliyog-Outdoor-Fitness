import React from "react";
import "./Navbar.css";
import logo from "../assets/CaliYog-Logo.png";

function Navbar() {
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

      {/* Navigation */}
      <ul className="nav-links">

        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        
         <li>
          <a href="#whychooseus">Why Choose Us</a>
        </li>

    

        <li>
          <a href="#batches">Batches</a>
        </li>

        <li>
          <a href="#membership">Membership</a>
        </li>

        <li>
          <a href="#transformations">Transformations</a>
        </li>

        
        <li>
          <a href="#experts">Experts</a>
        </li>

        <li>
          <a href="#events">Events</a>
        </li>


        <li>
          <a href="#feedback">Feedback</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>


      </ul>

      {/* CTA Button */}
      <a href="#contact">
        <button className="navbar-btn">
          Join Now
        </button>
      </a>

    </nav>
  );
}

export default Navbar;
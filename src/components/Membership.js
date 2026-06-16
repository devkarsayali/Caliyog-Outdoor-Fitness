import React from "react";
import "../style/Membership.css";

function Membership() {
  return (
    <section className="membership-section" id="membership">

      <div className="membership-header">
        <span>MEMBERSHIP PLANS</span>
        <h2>Choose Your Fitness Journey</h2>
        <p>
          Flexible plans designed for every fitness goal.
        </p>
      </div>

      <div className="membership-grid">

        <div className="plan-card">
          <h3>Yearly Membership</h3>
          <h1>₹24,000</h1>
          <p>Best Value Plan</p>
        </div>

        <div className="plan-card">
          <h3>6 Months</h3>
          <h1>₹18,000</h1>
          <p>Half Year Package</p>
        </div>

        <div className="plan-card">
          <h3>3 Months</h3>
          <h1>₹12,000</h1>
          <p>Quarterly Package</p>
        </div>

        <div className="plan-card">
          <h3>Monthly</h3>
          <h1>₹6,000</h1>
          <p>Monthly Access</p>
        </div>

        <div className="plan-card">
          <h3>15 Days</h3>
          <h1>₹4,000</h1>
          <p>Short Term Plan</p>
        </div>

        <div className="plan-card">
          <h3>Weekly Plan</h3>
          <h1>₹2,500</h1>
          <p>7 Days Access</p>
        </div>

        <div className="plan-card featured">
          <h3>Kids Yearly</h3>
          <h1>₹30,000</h1>
          <p>Special Kids Program</p>
        </div>

      </div>

      <div className="membership-note">
        <h4>Personal Training Available</h4>
        <p>
          Personal training fees vary according to the coach and training program.
        </p>
      </div>

    </section>
  );
}

export default Membership;
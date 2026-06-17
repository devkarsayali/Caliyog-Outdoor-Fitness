import React from "react";
import "../style/Membership.css";

function Membership({ openJoinForm }) {
  const plans = [
    {
      title: "Yearly Membership",
      price: "₹24,000",
      subtitle: "Best Value Plan",
      features: [
        "12 Months Full Access",
        "All Batches Included",
        "Fitness Guidance",
        "Strength & Cardio Training",
      ],
    },
    {
      title: "6 Months",
      price: "₹18,000",
      subtitle: "Half Year Package",
      features: [
        "6 Months Access",
        "Flexible Batch Timing",
        "Group Training",
        "Progress Support",
      ],
    },
    {
      title: "3 Months",
      price: "₹12,000",
      subtitle: "Quarterly Package",
      features: [
        "3 Months Access",
        "Beginner Friendly",
        "Strength Training",
        "Yoga & Mobility",
      ],
    },
    {
      title: "Monthly",
      price: "₹6,000",
      subtitle: "Monthly Access",
      features: [
        "1 Month Access",
        "Morning/Evening Batch",
        "Functional Fitness",
        "Basic Guidance",
      ],
    },
    {
      title: "15 Days",
      price: "₹4,000",
      subtitle: "Short Term Plan",
      features: [
        "15 Days Access",
        "Trial Fitness Program",
        "Group Workout",
        "Quick Start Plan",
      ],
    },
    {
      title: "Weekly Plan",
      price: "₹2,500",
      subtitle: "7 Days Access",
      features: [
        "1 Week Access",
        "Fitness Trial",
        "Outdoor Training",
        "Basic Workout Support",
      ],
    },
    {
      title: "Kids Yearly",
      price: "₹30,000",
      subtitle: "Special Kids Program",
      featured: true,
      features: [
        "Kids Fitness Program",
        "Agility Drills",
        "Mind-Body Coordination",
        "Sports Specific Training",
      ],
    },
  ];

  return (
    <section className="membership-section" id="membership">
      <div className="membership-header">
        <span>MEMBERSHIP PLANS</span>

        <h2>Choose Your Fitness Journey</h2>

        <p>Flexible plans designed for every fitness goal.</p>
      </div>

      <div className="membership-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card card-${index + 1} ${
              plan.featured ? "featured" : ""
            }`}
          >
            <h3>{plan.title}</h3>

            <h1>{plan.price}</h1>

            <p className="plan-subtitle">{plan.subtitle}</p>

            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <button
              type="button"
              className="plan-btn"
              onClick={() => openJoinForm(plan.title)}
            >
              Join Now
            </button>
          </div>
        ))}
      </div>

      <div className="membership-note">
        <h4>Personal Training Available</h4>

        <p>
          Personal training fees vary according to the coach and training
          program.
        </p>
      </div>
    </section>
  );
}

export default Membership;
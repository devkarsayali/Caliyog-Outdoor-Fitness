import React from "react";
import "../style/Membership.css";

function Membership() {
  const plans = [
    {
      title: "Yearly Membership",
      price: "₹24,000",
      subtitle: "Best Value Plan",
      features: [
        "12 months full access",
        "All batches included",
        "Fitness guidance",
        "Strength & cardio training",
      ],
    },
    {
      title: "6 Months",
      price: "₹18,000",
      subtitle: "Half Year Package",
      features: [
        "6 months access",
        "Flexible batch timing",
        "Group training",
        "Progress support",
      ],
    },
    {
      title: "3 Months",
      price: "₹12,000",
      subtitle: "Quarterly Package",
      features: [
        "3 months access",
        "Beginner friendly",
        "Strength training",
        "Yoga & mobility",
      ],
    },
    {
      title: "Monthly",
      price: "₹6,000",
      subtitle: "Monthly Access",
      features: [
        "1 month access",
        "Morning/evening batch",
        "Functional fitness",
        "Basic guidance",
      ],
    },
    {
      title: "15 Days",
      price: "₹4,000",
      subtitle: "Short Term Plan",
      features: [
        "15 days access",
        "Trial fitness program",
        "Group workout",
        "Quick start plan",
      ],
    },
    {
      title: "Weekly Plan",
      price: "₹2,500",
      subtitle: "7 Days Access",
      features: [
        "1 week access",
        "Fitness trial",
        "Outdoor training",
        "Basic workout support",
      ],
    },
    {
      title: "Kids Yearly",
      price: "₹30,000",
      subtitle: "Special Kids Program",
      features: [
        "Kids fitness program",
        "Agility drills",
        "Mind-body coordination",
        "Sports specific training",
      ],
      featured: true,
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
            className={`plan-card card-${index + 1} ${
              plan.featured ? "featured" : ""
            }`}
            key={index}
          >
            <h3>{plan.title}</h3>
            <h1>{plan.price}</h1>
            <p className="plan-subtitle">{plan.subtitle}</p>

            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <a href="#contact" className="plan-btn">
              Join Now
            </a>
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
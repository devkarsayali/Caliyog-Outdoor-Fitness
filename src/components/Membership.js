import React, { useEffect, useState } from "react";
import "../style/Membership.css";

function Membership({ openJoinForm }) {
const API_URL =
 "https://caliyog-fitness-backend-production-2144.up.railway.app";


  const [plans, setPlans] = useState([]);

  const loadMemberships = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/memberships`
      );

      const data = await response.json();

      if (response.ok) {
        setPlans(
          Array.isArray(data)
            ? data
            : data.memberships || data.data || []
        );
      }
    } catch (error) {
      console.error(
        "Membership Load Error:",
        error
      );
    }
  };

  useEffect(() => {
    loadMemberships();
  }, []);

  return (
    <section
      className="membership-section"
      id="membership"
    >
      <div className="membership-header">
        <span>MEMBERSHIP PLANS</span>

        <h2>
          Choose Your Fitness Journey
        </h2>

        <p>
          Flexible plans designed for every
          fitness goal.
        </p>
      </div>

      <div className="membership-grid">
        {plans.map((plan, index) => (
          <div
            key={plan._id || index}
            className={`plan-card card-${
              index + 1
            } ${
              plan.featured
                ? "featured"
                : ""
            }`}
          >
            <h3>{plan.title}</h3>

            <h1>{plan.price}</h1>

            <p className="plan-subtitle">
              {plan.subtitle}
            </p>

            <ul>
              {plan.features?.map(
                (feature, i) => (
                  <li key={i}>
                    {feature}
                  </li>
                )
              )}
            </ul>

            <button
              type="button"
              className="plan-btn"
              onClick={() =>
                openJoinForm(plan.title)
              }
            >
              Join Now
            </button>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="membership-note">
          <h4>
            No Membership Plans Found
          </h4>

          <p>
            Add plans from Admin Panel →
            Membership Packages.
          </p>
        </div>
      )}

      <div className="membership-note">
        <h4>
          Personal Training Available
        </h4>

        <p>
          Personal training fees vary
          according to the coach and
          training program.
        </p>
      </div>
    </section>
  );
}

export default Membership;
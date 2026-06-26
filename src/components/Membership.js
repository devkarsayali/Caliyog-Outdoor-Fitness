import React, { useEffect, useState } from "react";
import "../style/Membership.css";

function Membership({ openJoinForm }) {
  const API_URL = "http://192.168.11.11:5000";

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMemberships = async () => {
    try {
      const response = await fetch(`${API_URL}/api/memberships`);

      if (!response.ok) {
        throw new Error("Failed to load membership plans");
      }

      const data = await response.json();

      /*
        Backend may return data in different formats:
        1. Direct array
        2. { memberships: [...] }
        3. { data: [...] }

        This code supports all formats.
      */
      const membershipList = Array.isArray(data)
        ? data
        : data.memberships || data.data || [];

      setPlans(membershipList);
    } catch (error) {
      console.error("Membership Load Error:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberships();
  }, []);

  return (
    <section className="membership-section" id="membership">
      <div className="membership-header">
        <span>MEMBERSHIP PLANS</span>

        <h2>Choose Your Fitness Journey</h2>

        <p>Flexible plans designed for every fitness goal.</p>
      </div>

      {loading && (
        <div className="membership-note">
          <h4>Loading Membership Plans...</h4>
        </div>
      )}

      <div className="membership-grid">
        {plans.map((plan, index) => {
          /*
            IMPORTANT:
            These variables support different field names
            saved from Admin Panel.

            Example:
            title / name / planName
            price / amount / fees
            subtitle / duration / description
            features / points / benefits
          */

          const title =
            plan.title ||
            plan.name ||
            plan.planName ||
            plan.membershipName ||
            "Membership Plan";

          const price =
            plan.price ||
            plan.amount ||
            plan.fees ||
            plan.membershipFees ||
            "₹0";

          const subtitle =
            plan.subtitle ||
            plan.duration ||
            plan.description ||
            plan.validity ||
            "Fitness membership plan";

          const features =
            plan.features ||
            plan.points ||
            plan.benefits ||
            plan.facilities ||
            [];

          return (
            <div
              key={plan._id || plan.id || index}
              className={`plan-card card-${index + 1} ${
                plan.featured ? "featured" : ""
              }`}
            >
              <h3>{title}</h3>

              <h1>{price}</h1>

              <p className="plan-subtitle">{subtitle}</p>

              <ul>
                {Array.isArray(features) &&
                  features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
              </ul>

              <button
                type="button"
                className="plan-btn"
                onClick={() => openJoinForm(title)}
              >
                Join Now
              </button>
            </div>
          );
        })}
      </div>

      {!loading && plans.length === 0 && (
        <div className="membership-note">
          <h4>No Membership Plans Found</h4>

          <p>
            Add plans from Admin Panel → Membership Packages.
          </p>
        </div>
      )}

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
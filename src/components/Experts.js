import React, { useCallback, useEffect, useState } from "react";
import "../style/Experts.css";
import expertsImage from "../assets/experts.png";

function Experts() {
const API_URL =
  "https://caliyog-fitness-backend-production.up.railway.app";
  const [showInfo, setShowInfo] = useState(false);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.experts)) return data.experts;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const fetchExperts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/experts`);

      if (!response.ok) {
        throw new Error("Failed to load experts");
      }

      const data = await response.json();
      const expertList = getArrayData(data);

      setExperts(expertList);
    } catch (error) {
      console.error("Error fetching experts:", error);
      setExperts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <section id="experts" className="experts-section">
      <div className="experts-heading">
        <h2>MEET OUR FITNESS EXPERTS</h2>

        <p>
          Learn from certified coaches, athletes, and fitness professionals
          dedicated to helping you achieve your fitness goals.
        </p>
      </div>

      <div className="experts-image-container">
        <img
          src={expertsImage}
          alt="CaliYog Fitness Experts"
          className="experts-image"
          loading="lazy"
        />
      </div>

      <div className="expert-btn-box">
        <button
          type="button"
          className="expert-info-btn"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {showInfo ? "Hide Information" : "All Information"}
        </button>
      </div>

      {showInfo && (
        <div className="experts-info-container">
          {loading ? (
            <p>Loading experts...</p>
          ) : experts.length === 0 ? (
            <p>No experts added yet.</p>
          ) : (
            experts.map((expert, index) => (
              <div className="expert-info-card" key={expert._id || index}>
                <h3>{expert.name || expert.title || "Expert Name"}</h3>

                <h4>
                  {expert.specialization ||
                    expert.role ||
                    expert.designation ||
                    "Fitness Expert"}
                </h4>

                <p>
                  {expert.experience ||
                    expert.description ||
                    expert.bio ||
                    "Expert information will be updated soon."}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Experts;
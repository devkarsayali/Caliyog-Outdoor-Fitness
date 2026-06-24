import React, { useEffect, useState } from "react";
import "../style/Experts.css";
import expertsImage from "../assets/experts.png";

function Experts() {
  const [showInfo, setShowInfo] = useState(false);
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
  try {
const response = await fetch("http://192.168.11.5:5000/api/experts");
    const data = await response.json();

    console.log("Experts API response:", data);

    if (Array.isArray(data)) {
      setExperts(data);
    } else if (Array.isArray(data.experts)) {
      setExperts(data.experts);
    } else if (Array.isArray(data.data)) {
      setExperts(data.data);
    } else {
      setExperts([]);
    }
  } catch (error) {
    console.error("Error fetching experts:", error);
  }
};

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
          className="expert-info-btn"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {showInfo ? "Hide Information" : "All Information"}
        </button>
      </div>

      {showInfo && (
        <div className="experts-info-container">
          {experts.length === 0 ? (
            <p>No experts added yet.</p>
          ) : (
            experts.map((expert) => (
              <div className="expert-info-card" key={expert._id}>
                <h3>{expert.name}</h3>
                <h4>{expert.specialization}</h4>
                <p>{expert.experience}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Experts;
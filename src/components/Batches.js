import React, { useEffect, useState } from "react";
import "../style/Batches.css";

const API_URL =
 "https://caliyog-fitness-backend-production-2144.up.railway.app";

function Batches() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const response = await fetch(`${API_URL}/api/batches`);
        const data = await response.json();

        if (response.ok) {
          if (Array.isArray(data)) {
            setBatches(data);
          } else if (Array.isArray(data.data)) {
            setBatches(data.data);
          } else {
            setBatches([]);
          }
        }
      } catch (error) {
        console.error("Batches Load Error:", error);
      }
    };

    loadBatches();
  }, []);

  return (
    <section className="batches-section" id="batches">
      <div className="section-title">
        <span>TRAINING PROGRAMS</span>
        <h2>Batches We Provide</h2>
        <p>Professional fitness programs designed for all age groups.</p>
      </div>

      <div className="batch-details">
        {batches.length === 0 ? (
          <p className="batch-empty-message">No batches available yet.</p>
        ) : (
          batches.map((batch) => (
            <div className="batch-card" key={batch._id}>
              <div className="batch-icon">{batch.icon || "💪"}</div>

              <h3>{batch.title}</h3>

              <ul>
                {Array.isArray(batch.points) && batch.points.length > 0 ? (
                  batch.points.map((point, i) => <li key={i}>{point}</li>)
                ) : (
                  <li>No points added yet.</li>
                )}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="timing-section">
        <div className="section-title">
          <span>BATCH TIMINGS</span>
          <h2>Choose Your Perfect Time Slot</h2>
          <p>Morning and evening batches available for all age groups.</p>
        </div>

        <div className="timing-grid">
          <div className="timing-box">
            <div className="timing-icon">☀️</div>
            <h4>Morning Batch</h4>
            <p>6:00 AM - 7:00 AM</p>
            <p>7:00 AM - 8:00 AM</p>
            <p>8:00 AM - 9:00 AM</p>
            <p>10:00 AM - 11:00 AM</p>
          </div>

          <div className="timing-box">
            <div className="timing-icon">🌇</div>
            <h4>Evening Batch</h4>
            <p>5:00 PM - 6:00 PM</p>
            <p>6:00 PM - 7:00 PM</p>
            <p>7:00 PM - 8:00 PM</p>
            <p>Kids Batch 6:00 PM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Batches;
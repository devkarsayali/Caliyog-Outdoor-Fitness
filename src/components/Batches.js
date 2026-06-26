import React, { useEffect, useState } from "react";
import "../style/Batches.css";

const API_URL = "http://192.168.11.11:5000";

function Batches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const response = await fetch(`${API_URL}/api/batches`);

        if (!response.ok) {
          throw new Error("Failed to load batches");
        }

        const data = await response.json();

        /*
          Backend may return:
          1. Direct array: [...]
          2. Object with data: { data: [...] }
          3. Object with batches: { batches: [...] }
        */
        const batchList = Array.isArray(data)
          ? data
          : data.data || data.batches || [];

        setBatches(batchList);
      } catch (error) {
        console.error("Batches Load Error:", error);
        setBatches([]);
      } finally {
        setLoading(false);
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

      {loading && (
        <p className="batch-empty-message">Loading batches...</p>
      )}

      <div className="batch-details">
        {!loading && batches.length === 0 ? (
          <p className="batch-empty-message">No batches available yet.</p>
        ) : (
          batches.map((batch, index) => {
            /*
              These variables support different field names
              saved from Admin Panel.

              Example:
              title / name / batchName
              points / features / benefits
            */

            const icon = batch.icon || batch.emoji || "💪";

            const title =
              batch.title ||
              batch.name ||
              batch.batchName ||
              batch.programName ||
              "Fitness Batch";

            let points =
              batch.points ||
              batch.features ||
              batch.benefits ||
              batch.programPoints ||
              [];

            /*
              If admin saved points as one text instead of array,
              this converts it into list items.
            */
            if (typeof points === "string") {
              points = points
                .split("\n")
                .map((point) => point.trim())
                .filter(Boolean);
            }

            /*
              If no points array is available,
              use description as one point.
            */
            if (
              (!Array.isArray(points) || points.length === 0) &&
              batch.description
            ) {
              points = [batch.description];
            }

            return (
              <div
                className="batch-card"
                key={batch._id || batch.id || index}
              >
                <div className="batch-icon">{icon}</div>

                <h3>{title}</h3>

                <ul>
                  {Array.isArray(points) && points.length > 0 ? (
                    points.map((point, i) => <li key={i}>{point}</li>)
                  ) : (
                    <li>No points added yet.</li>
                  )}
                </ul>
              </div>
            );
          })
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
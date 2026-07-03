import React, { useState, useEffect, useCallback } from "react";
import "../style/Transformations.css";

const API_URL = "https://caliyog-fitness-backend-production-2144.up.railway.app";

function Transformations() {
  const [transformations, setTransformations] = useState([]);

  // ✅ Image is base64 string from backend
  const getImageUrl = useCallback((img) => {
    if (!img) return "";
    if (typeof img === "string") {
      if (img.startsWith("data:image")) return img;
      if (img.startsWith("http")) return img;
    }
    return "";
  }, []);

  const loadTransformations = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transformations`);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setTransformations(result.data);
      }
    } catch (error) {
      console.error("Transformations Load Error:", error);
      setTransformations([]);
    }
  }, []);

  useEffect(() => {
    loadTransformations();
  }, [loadTransformations]);

  return (
    <section className="transform-section" id="transformations">
      <div className="transform-heading">
        <h2>Transformations We Did</h2>
        <p>
          Real fitness journeys and amazing results achieved by our members.
        </p>
      </div>

      <div className="transform-grid">
        {transformations.map((item) => (
          <div className="transform-card" key={item._id}>
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="transform-content">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}

        {transformations.length === 0 && (
          <p className="transform-message">No transformations added yet.</p>
        )}
      </div>
    </section>
  );
}

export default Transformations;
import React, { useState, useEffect, useCallback } from "react";
import "../style/Transformations.css";

const API_URL =
  "https://caliyog-fitness-backend-production-2144.up.railway.app";

function Transformations() {
  const [transformations, setTransformations] = useState([]);

  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath || imagePath.trim() === "") return "";
    if (imagePath.startsWith("http")) return imagePath;

    return `${API_URL}${imagePath}`;
  }, []);

  const parseResponse = async (response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }
  };

  const loadTransformations = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transformations`);
      const result = await parseResponse(response);

      if (result.success && Array.isArray(result.data)) {
        const validTransformations = result.data.filter(
          (item) => item.image && item.name
        );

        setTransformations(validTransformations);
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
            />

            <div className="transform-content">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Transformations;
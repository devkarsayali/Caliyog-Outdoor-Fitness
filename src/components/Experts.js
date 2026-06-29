import React, { useCallback, useEffect, useState } from "react";
import "../style/Experts.css";
import expertsImage from "../assets/experts.png";

function Experts() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [showInfo, setShowInfo] = useState(false);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.experts)) return data.experts;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const getImageUrl = (expert) => {
  const image =
    expert.image ||
    expert.photo ||
    expert.profileImage ||
    expert.expertImage ||
    expert.img ||
    expert.imageUrl;

  if (!image) return expertsImage;

  if (image.startsWith("http")) return image;

  return `${API_URL}${image.startsWith("/") ? image : "/" + image}`;
};

  const fetchExperts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/experts`);

      if (!response.ok) {
        throw new Error("Failed to load experts");
      }

      const data = await response.json();
      setExperts(getArrayData(data));
    } catch (error) {
      console.error("Error fetching experts:", error);
      setExperts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowInfo = () => {
    setShowInfo((prev) => !prev);

    if (!showInfo && experts.length === 0) {
      fetchExperts();
    }
  };

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
          onClick={handleShowInfo}
        >
          {showInfo ? "Hide Information" : "All Information"}
        </button>
      </div>

      {showInfo && (
        <div className="experts-info-container">
          {loading ? (
            <p className="experts-message">Loading experts...</p>
          ) : experts.length === 0 ? (
            <p className="experts-message">No experts added yet.</p>
          ) : (
            experts.map((expert, index) => (
              <div className="expert-info-card" key={expert._id || index}>
                <div className="expert-card-image-box">
                 <img
  src={getImageUrl(expert)}
  alt={expert.name || "Fitness Expert"}
  className="expert-card-image"
  loading="lazy"
  onError={(e) => {
    e.currentTarget.src = expertsImage;
  }}
/>
                </div>

                <div className="expert-card-content">
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
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Experts;
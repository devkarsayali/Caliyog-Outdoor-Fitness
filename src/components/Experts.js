import React, { useCallback, useEffect, useState } from "react";
import "../style/Experts.css";
import expertsImage from "../assets/experts.JPG";

function Experts() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.experts)) return data.experts;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  // ✅ FIX: Handle both object and string image formats
  const getImageUrl = (expert) => {
    const image =
      expert?.image ||
      expert?.img ||
      expert?.photo ||
      expert?.profileImage ||
      expert?.expertImage ||
      expert?.imageUrl;

    if (!image) return expertsImage;

    // If image is an object (new format from backend)
    if (typeof image === "object" && image !== null) {
      if (image.imageUrl) return image.imageUrl;
      if (image.data && image.contentType) {
        return `data:${image.contentType};base64,${image.data}`;
      }
      return expertsImage;
    }

    // Base64 image (string)
    if (typeof image === "string" && image.startsWith("data:image")) {
      return image;
    }

    // Already full URL
    if (typeof image === "string" && (image.startsWith("http://") || image.startsWith("https://"))) {
      return image;
    }

    // Relative uploads path
    if (typeof image === "string" && image.startsWith("/uploads")) {
      return `${API_URL}${image}`;
    }

    // Fallback
    return expertsImage;
  };

  // ---------------- Fetch Experts ----------------

  const fetchExperts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/experts`);

      if (!response.ok) {
        throw new Error("Failed to load experts");
      }

      const data = await response.json();

      setExperts(getArrayData(data));
    } catch (err) {
      console.error("Experts Load Error:", err);
      setExperts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <section className="experts-section" id="experts">
      <div className="experts-heading">
        <h2>MEET OUR FITNESS EXPERTS</h2>

        <p>
          Learn from certified coaches, athletes, and fitness professionals
          dedicated to helping you achieve your fitness goals.
        </p>
      </div>

      {/* Banner */}
      <div className="experts-image-container">
        <img
          src={expertsImage}
          alt="Experts"
          className="experts-image"
          loading="lazy"
        />
      </div>

      {/* Cards */}
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
                  className="expert-card-image"
                  src={getImageUrl(expert)}
                  alt={expert.name || "Fitness Expert"}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = expertsImage;
                  }}
                />
              </div>

              <div className="expert-card-content">
                <h3>{expert.name || "Expert Name"}</h3>

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
                    "Information coming soon."}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Experts;
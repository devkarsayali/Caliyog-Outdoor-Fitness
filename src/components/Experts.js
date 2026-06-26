import React, { useEffect, useState } from "react";
import "../style/Experts.css";

/*
  TEMPORARY CLIENT DEMO IMAGE

  Main experts banner image is coming from src/assets.
  Admin uploaded expert photos are commented for now.
  Expert name/details will still come from Admin Panel/backend.
*/

import expertsImage from "../assets/experts.png";

function Experts() {
  const API_URL = "http://192.168.11.11:5000";

  const [showInfo, setShowInfo] = useState(false);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, []);

  /*
    ADMIN IMAGE FUNCTION COMMENTED FOR NOW

    Later, when admin expert image upload is fixed,
    you can use this function.

    const getImageUrl = (expert) => {
      const imagePath = expert?.img || expert?.image || expert?.photo || "";

      if (!imagePath || imagePath.trim() === "") {
        return null;
      }

      if (
        imagePath.startsWith("http") ||
        imagePath.startsWith("data:image")
      ) {
        return imagePath;
      }

      return `${API_URL}${imagePath}`;
    };
  */

  const fetchExperts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/experts`);

      if (!response.ok) {
        throw new Error("Failed to load experts");
      }

      const data = await response.json();

      /*
        Backend may return:
        1. Direct array: [...]
        2. { experts: [...] }
        3. { data: [...] }
      */

      const expertList = Array.isArray(data)
        ? data
        : data.experts || data.data || [];

      setExperts(expertList);
    } catch (error) {
      console.error("Experts Load Error:", error);
      setExperts([]);
    } finally {
      setLoading(false);
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

        {/*
          ADMIN BANNER / EXPERT IMAGE COMMENTED FOR CLIENT DEMO

          Currently using:
          src/assets/experts.png

          Later you can replace this with admin image.
        */}
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
            experts.map((expert, index) => {
              /*
                These variables support different field names
                saved from Admin Panel.
              */

              const name =
                expert.name ||
                expert.expertName ||
                expert.coachName ||
                "Fitness Expert";

              const specialization =
                expert.specialization ||
                expert.designation ||
                expert.role ||
                expert.category ||
                "Fitness Coach";

              const experience =
                expert.experience ||
                expert.description ||
                expert.details ||
                expert.bio ||
                "Certified fitness professional.";

              return (
                <div
                  className="expert-info-card"
                  key={expert._id || expert.id || index}
                >
                  {/*
                    ADMIN EXPERT PHOTO COMMENTED FOR NOW

                    const imageUrl = getImageUrl(expert);

                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={name}
                        className="expert-card-image"
                      />
                    )}
                  */}

                  <h3>{name}</h3>
                  <h4>{specialization}</h4>
                  <p>{experience}</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
}

export default Experts;
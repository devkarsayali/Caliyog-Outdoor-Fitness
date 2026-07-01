import React, { useEffect, useState } from "react";
import aboutImage from "../assets/about-caliyog.png";
import calisthenicsImage from "../assets/about-calisthenics.png";
import "../style/About.css";

const API_URL =
  "https://caliyog-fitness-backend-production-2144.up.railway.app";

function About() {
  const [about, setAbout] = useState({
    title: "Welcome to CaliYog",
    subtitle: "With Strength and Grace",
    description:
      "At CaliYog Outdoor Fitness Club, we believe fitness is not just about looking good—it's about becoming stronger, healthier, and more confident every day.",
    mission:
      "To inspire people to live healthier, stronger, and more confident lives through outdoor fitness, calisthenics, and a supportive fitness community.",
    vision: "",
    image1: "",
    image2: "",
  });

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/about`);
      const result = await response.json();

      if (result.success && result.data) {
        setAbout(result.data);
      }
    } catch (error) {
      console.error("About Load Error:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.trim() === "") return null;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("/uploads/about/")) {
      return `${API_URL}${imagePath}`;
    }

    if (imagePath.startsWith("/uploads/")) {
      return `${API_URL}${imagePath}`;
    }

    return `${API_URL}/uploads/about/${imagePath}`;
  };

  const aboutImageUrl = getImageUrl(about.image1) || aboutImage;
  const calisthenicsImageUrl = getImageUrl(about.image2) || calisthenicsImage;

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src={aboutImageUrl}
            alt="About CaliYog"
            className="about-img"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = aboutImage;
            }}
          />
        </div>

        <div className="about-content">
          <span className="about-tag">ABOUT CALIYOG</span>

          <h2>{about.title}</h2>
          <h3>{about.subtitle}</h3>

          <p>{about.description}</p>

          {about.vision && <p>{about.vision}</p>}

          <div className="about-features">
            <div className="feature">✓ Strength Training</div>
            <div className="feature">✓ Weight Loss Programs</div>
            <div className="feature">✓ Functional Fitness</div>
            <div className="feature">✓ Yoga & Mobility</div>
          </div>
        </div>
      </div>

      <div className="calisthenics-section">
        <div className="calisthenics-content">
          <div className="calisthenics-text">
            <span className="about-tag">ABOUT CALISTHENICS</span>

            <h2>Build Strength Naturally</h2>

            <p>
              Calisthenics is a form of exercise that uses your own body weight
              as resistance to build strength, endurance, flexibility, and
              balance.
            </p>

            <p>
              Unlike traditional gym workouts, calisthenics focuses on mastering
              movement patterns and developing complete body control through
              natural exercises.
            </p>

            <p>
              Modern calisthenics combines bodyweight strength, mobility,
              flexibility, and advanced skills to create a complete fitness
              transformation.
            </p>

            <div className="highlight-box">
              Modern Calisthenics emphasizes body control, functional strength,
              endurance, mobility, flexibility, and athletic performance.
            </div>
          </div>

          <div className="calisthenics-image">
            <img
              src={calisthenicsImageUrl}
              alt="About Calisthenics"
              className="about-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = calisthenicsImage;
              }}
            />
          </div>
        </div>
      </div>

       <div className="achievement-stats">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Members Trained</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Transformations</p>
          </div>

          <div className="stat-card">
            <h3>15+</h3>
            <p>National Competitions</p>
          </div>

          <div className="stat-card">
            <h3>20+</h3>
            <p>Trophies Won</p>
          </div>
        </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>{about.mission}</p>
      </div>
    </section>
  );
}

export default About;
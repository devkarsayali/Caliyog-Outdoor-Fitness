import React from "react";
import aboutImage from "../assets/about-caliyog.png";
import calisthenicsImage from "../assets/about-calisthenics.png";
import "../style/About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src={aboutImage}
            alt="About CaliYog"
            className="about-img"
            loading="lazy"
          />
        </div>

        <div className="about-content">
          <span className="about-tag">ABOUT CALIYOG</span>

          <h2>Welcome to CaliYog</h2>
          <h3>With Strength and Grace</h3>

          <p>
            At CaliYog Outdoor Fitness Club, we believe fitness is not just
            about looking good—it's about becoming stronger, healthier, and more
            confident every day.
          </p>

          <p>
            With over 6 years of experience, CaliYog has helped hundreds of
            members achieve their fitness goals through calisthenics, functional
            training, strength development, mobility work, and yoga.
          </p>

          <p>
            Our outdoor training environment creates a unique fitness experience
            that combines discipline, community support, and personal growth.
          </p>

          <div className="about-features">
            <div className="feature">✓ Strength Training</div>
            <div className="feature">✓ Weight Loss Programs</div>
            <div className="feature">✓ Functional Fitness</div>
            <div className="feature">✓ Yoga & Mobility</div>
          </div>

          <a href="#contact" className="about-btn">
            Join Our Community →
          </a>
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
              src={calisthenicsImage}
              alt="About Calisthenics"
              className="about-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>

        <p>
          To inspire people to live healthier, stronger, and more confident
          lives through outdoor fitness, calisthenics, and a supportive fitness
          community.
        </p>
      </div>
    </section>
  );
}

export default About;
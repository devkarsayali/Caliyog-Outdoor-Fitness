import React, { useState } from "react";
import "../style/Contact.css";


function Contact() {
  const API_URL = "http://192.168.11.5:5000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit enquiry");
        return;
      }

      alert(
        data.message ||
          "Thank you! Your enquiry has been submitted successfully."
      );

      setFormData({
        name: "",
        email: "",
        contact: "",
        message: "",
      });
    } catch (error) {
      console.error("Enquiry Error:", error);

      alert(
        "Backend connection failed. Please check backend server and IP address."
      );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-heading">
        <h2>Contact Us</h2>

        <p>
          Join CALIYOG Outdoor Fitness Club and start your fitness journey today.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Get In Touch</h3>

          <p>
            <strong>📍 Address:</strong>
            Near Your Location, Sangli
          </p>

          <p>
            <strong>📞 Phone:</strong>{" "}
            <a href="tel:+919876543210">
              +91 98765 43210
            </a>
          </p>

          <p>
            <strong>📧 Email:</strong>{" "}
            <a href="mailto:caliyogfitness@gmail.com">
              caliyogfitness@gmail.com
            </a>
          </p>

          <p>
            <strong>🌐 Website:</strong>{" "}
            <a
              href="https://www.caliyogfitness.com"
              target="_blank"
              rel="noreferrer"
            >
              www.caliyogfitness.com
            </a>
          </p>

          <p>
            <strong>📸 Instagram:</strong>{" "}
            <a
              href="https://www.instagram.com/caliyog_fitness_club"
              target="_blank"
              rel="noreferrer"
            >
              @caliyog_fitness_club
            </a>
          </p>

          <p>
            <strong>📘 Facebook:</strong>{" "}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              CaliYog Outdoor Fitness Club
            </a>
          </p>

          <p>
            <strong>💬 WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </p>

          <p>
            <strong>⏰ Timings:</strong>
            Morning & Evening Batches Available
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Enter Your Phone Number"
            value={formData.contact}
            onChange={handleChange}
           
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Write Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Send Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
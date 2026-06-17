import React from "react";
import "../style/Contact.css";

function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
  };

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-heading">
        <h2>Contact Us</h2>

        <p>
          Join CALIYOG Outdoor Fitness Club and start
          your fitness journey today.
        </p>
      </div>

      <div className="contact-container">

        {/* Contact Information */}
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

        {/* Contact Form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Enter Your Name"
            required
          />

          <input
            type="email"
            placeholder="Enter Your Email"
            required
          />

          <input
            type="tel"
            placeholder="Enter Your Phone Number"
            required
          />

          <textarea
            rows="5"
            placeholder="Write Your Message..."
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;
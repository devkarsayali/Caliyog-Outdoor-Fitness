import React, { useEffect, useState } from "react";
import "../style/Events.css";

/*
  TEMPORARY CLIENT DEMO IMAGE IMPORTS

  These images are manually added from src/assets.
  Admin uploaded images are commented for now.
  Text data will still come from Admin Panel/backend.
*/

import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import e5 from "../assets/e5.png";
import e6 from "../assets/e6.png";

function Events() {
  const API_URL = "http://192.168.11.11:5000";

  const [events, setEvents] = useState([]);
  const [organisedEvents, setOrganisedEvents] = useState([]);

  const demoGalleryImages = [e1, e2, e3, e4, e5, e6];

  useEffect(() => {
    fetchEvents();
  }, []);

  /*
    ADMIN IMAGE FUNCTION COMMENTED FOR NOW

    Later, when admin image upload is fixed,
    use this function again and replace demo image.

    const getImageUrl = (item) => {
      const imagePath = item?.img || item?.image || "";

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

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);

      if (!response.ok) {
        throw new Error("Failed to load events");
      }

      const data = await response.json();

      const eventList = Array.isArray(data)
        ? data
        : data.events || data.data || [];

      const galleryEvents = eventList.filter(
        (item) => item.eventType === "gallery"
      );

      const majorEvents = eventList.filter(
        (item) =>
          item.eventType === "organized" ||
          item.eventType === "organised"
      );

      setEvents(galleryEvents);
      setOrganisedEvents(majorEvents);
    } catch (error) {
      console.error("Events Load Error:", error);
    }
  };

  return (
    <section className="events-section" id="events">
      <div className="events-heading">
        <h2>Events and Clicks</h2>
        <p>Memorable moments from our fitness events and group activities.</p>
      </div>

      <div className="events-grid">
        {events.length === 0 ? (
          <p>No gallery events added yet.</p>
        ) : (
          events.map((item, index) => {
            /*
              ADMIN IMAGE COMMENTED FOR CLIENT DEMO

              const imageUrl = getImageUrl(item);

              Currently using manual image from src/assets.
            */

            const demoImage =
              demoGalleryImages[index % demoGalleryImages.length];

            return (
              <div className="event-card" key={item._id || index}>
                <div className="event-img-box">
                  <img
                    src={demoImage}
                    alt={item.title || "Gallery Event"}
                    loading="lazy"
                  />

                  {/*
                    ADMIN IMAGE CODE COMMENTED FOR NOW

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title || "Gallery Event"}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-event-image">
                        No Image Available
                      </div>
                    )}
                  */}
                </div>

                <div className="event-content">
                  <h3>{item.title || "Untitled Event"}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="events-achievements">
        <div className="achievement-header">
          <span>MAJOR EVENTS</span>
          <h2>Events We Organised In Last Two Years</h2>
          <p>Organised big fitness events through CaliYog.</p>
        </div>

        <div className="achievement-list">
          {organisedEvents.length === 0 ? (
            <p>No organised events added yet.</p>
          ) : (
            organisedEvents.map((event, index) => (
              <div className="achievement-item" key={event._id || index}>
                <span>{index + 1}</span>
                <div>
                  <p>{event.title || "Untitled Organised Event"}</p>

                  {/*
                    If organised event image is added by admin,
                    keep it commented for now.
                    For client demo, organised events only show title.
                  */}
                </div>
              </div>
            ))
          )}
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

        <div className="coach-message">
          <h3>10+ Coaches Dedicated To One Mission</h3>
          <p>
            Introducing fitness into everyone's life through outdoor training,
            community support, discipline, and performance-based fitness.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Events;
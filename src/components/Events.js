import React, { useEffect, useState } from "react";
import "../style/Events.css";

function Events() {
  const API_URL = "http://192.168.11.5:5000";

  const [events, setEvents] = useState([]);
  const [organisedEvents, setOrganisedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

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
            const imageUrl = getImageUrl(item);

            return (
              <div className="event-card" key={item._id || index}>
                <div className="event-img-box">
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
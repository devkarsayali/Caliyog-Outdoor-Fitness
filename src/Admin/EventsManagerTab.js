import React, { useState } from "react";
import EventsTab from "./EventsTab";
import GalleryEventsTab from "./GalleryEventsTab";

function EventsManagerTab() {
  const [selectedEventPage, setSelectedEventPage] = useState("");

  if (selectedEventPage === "organized") {
    return (
      <>
        <div className="page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => setSelectedEventPage("")}
          >
            ← Back
          </button>
        </div>

        <EventsTab />
      </>
    );
  }

  if (selectedEventPage === "gallery") {
    return (
      <>
        <div className="page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => setSelectedEventPage("")}
          >
            ← Back
          </button>
        </div>

        <GalleryEventsTab />
      </>
    );
  }

  return (
    <div className="admin-selection-page">
      <h2>Events Management</h2>
      <p>Select which events section you want to manage.</p>

      <div className="admin-selection-cards">
        <button
          type="button"
          onClick={() => setSelectedEventPage("organized")}
        >
          <span>🎉</span>
          <h3>Organized Events</h3>
          <p>Manage main events organized by CaliYog.</p>
        </button>

        <button type="button" onClick={() => setSelectedEventPage("gallery")}>
          <span>🖼️</span>
          <h3>Gallery Events</h3>
          <p>Manage event gallery images and memories.</p>
        </button>
      </div>
    </div>
  );
}

export default EventsManagerTab;
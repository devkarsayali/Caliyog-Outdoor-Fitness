import React, { useState, useEffect, useRef } from "react";
import { db } from "../utils/db";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiUpload,
  FiImage,
} from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/EventsTab.css";

import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import e5 from "../assets/e5.png";
import e6 from "../assets/e6.png";
import e7 from "../assets/e7.png";
import e8 from "../assets/e8.png";

const resolveImage = (img) => {
  if (img === "e1") return e1;
  if (img === "e2") return e2;
  if (img === "e3") return e3;
  if (img === "e4") return e4;
  if (img === "e5") return e5;
  if (img === "e6") return e6;
  if (img === "e7") return e7;
  if (img === "e8") return e8;
  return img;
};

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [organisedEvents, setOrganisedEvents] = useState([]);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showOrganisedModal, setShowOrganisedModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editIndex, setEditIndex] = useState(null);

  const fileInputRef = useRef(null);

  const [galleryForm, setGalleryForm] = useState({
    img: "e1",
    title: "",
  });

  const [organisedForm, setOrganisedForm] = useState("");

  const loadData = () => {
    setEvents(db.getEvents());
    setOrganisedEvents(db.getOrganisedEvents());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("caliyog_db_update", loadData);

    return () =>
      window.removeEventListener("caliyog_db_update", loadData);
  }, []);

  const triggerUpdate = () => {
    window.dispatchEvent(new Event("caliyog_db_update"));
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setEditIndex(null);
    setGalleryForm({
      img: "e1",
      title: "",
    });
  };

  const closeOrganisedModal = () => {
    setShowOrganisedModal(false);
    setEditIndex(null);
    setOrganisedForm("");
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      db.addEvent(galleryForm);
    } else {
      db.updateEvent(editIndex, galleryForm);
    }

    triggerUpdate();
    closeGalleryModal();
  };

  const handleOrganisedSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      db.addOrganisedEvent(organisedForm);
    } else {
      db.updateOrganisedEvent(editIndex, organisedForm);
    }

    triggerUpdate();
    closeOrganisedModal();
  };

  const deleteGalleryEvent = (index) => {
    if (window.confirm("Are you sure you want to delete this gallery event?")) {
      db.deleteEvent(index);
      triggerUpdate();
    }
  };

  const deleteOrganisedEvent = (index) => {
    if (window.confirm("Are you sure you want to delete this major event?")) {
      db.deleteOrganisedEvent(index);
      triggerUpdate();
    }
  };

  const openBrowse = () => {
    fileInputRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large! Please upload image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setGalleryForm({
        ...galleryForm,
        img: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-content-window">

      <div className="events-header-box">
        <div>
          <span className="events-label">Events Management</span>
          <h2>Manage Events</h2>
          <p>
            Add gallery events and organised major events for CaliYog website.
          </p>
        </div>

        <div className="events-header-actions">
          <button
            className="events-action-btn secondary"
            onClick={() => {
              setModalMode("add");
              setShowOrganisedModal(true);
            }}
          >
            <FiPlus /> Add Organized Event
          </button>

          <button
            className="events-action-btn primary"
            onClick={() => {
              setModalMode("add");
              setShowGalleryModal(true);
            }}
          >
            <FiPlus /> Add Gallery Event
          </button>
        </div>
      </div>

      <div className="events-layout">

        <div className="events-left">
          <div className="section-title-row">
            <h2>Gallery Cards</h2>
            <span>{events.length} Items</span>
          </div>

          <div className="events-cards-grid">
            {events.map((evt, index) => (
              <article className="event-card-admin" key={index}>
                <div className="event-img-box">
                  <img
                    src={resolveImage(evt.img)}
                    alt={evt.title}
                    className="event-img"
                  />
                </div>

                <div className="event-card-content">
                  <h3>{evt.title}</h3>
                </div>

                <div className="event-card-footer">
                  <button
                    className="event-edit-btn"
                    onClick={() => {
                      setGalleryForm(evt);
                      setEditIndex(index);
                      setModalMode("edit");
                      setShowGalleryModal(true);
                    }}
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    className="event-delete-btn"
                    onClick={() => deleteGalleryEvent(index)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="events-right">
          <div className="section-title-row">
            <h2>Major Organised Events</h2>
            <span>{organisedEvents.length} Items</span>
          </div>

          <div className="major-events-list">
            {organisedEvents.map((evt, index) => (
              <div className="major-event-card" key={index}>
                <div>
                  <h3>{evt}</h3>
                  <p>Organised Event</p>
                </div>

                <div className="major-actions">
                  <button
                    className="small-edit-btn"
                    onClick={() => {
                      setOrganisedForm(evt);
                      setEditIndex(index);
                      setModalMode("edit");
                      setShowOrganisedModal(true);
                    }}
                  >
                    <FiEdit />
                  </button>

                  <button
                    className="small-delete-btn"
                    onClick={() => deleteOrganisedEvent(index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {showGalleryModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">

            <div className="event-modal-header">
              <h3>
                {modalMode === "add" ? "Add" : "Edit"} Gallery Event
              </h3>

              <button onClick={closeGalleryModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit}>
              <div className="event-modal-body">

                <div
                  className="event-image-preview"
                  onClick={openBrowse}
                >
                  {galleryForm.img ? (
                    <img
                      src={resolveImage(galleryForm.img)}
                      alt="Preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <FiImage />
                      <span>Add Image</span>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden-file-input"
                />

                <button
                  type="button"
                  className="event-upload-btn"
                  onClick={openBrowse}
                >
                  <FiUpload /> Upload Event Image
                </button>

                <div className="admin-form-group">
                  <label>Event Title</label>

                  <input
                    type="text"
                    className="admin-form-control"
                    value={galleryForm.title}
                    onChange={(e) =>
                      setGalleryForm({
                        ...galleryForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Select Default Image</label>

                  <select
                    className="admin-form-control"
                    value={
                      galleryForm.img.startsWith("data:")
                        ? "custom"
                        : galleryForm.img
                    }
                    onChange={(e) => {
                      if (e.target.value !== "custom") {
                        setGalleryForm({
                          ...galleryForm,
                          img: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value="e1">Default Event 1</option>
                    <option value="e2">Default Event 2</option>
                    <option value="e3">Default Event 3</option>
                    <option value="e4">Default Event 4</option>
                    <option value="e5">Default Event 5</option>
                    <option value="e6">Default Event 6</option>
                    <option value="e7">Default Event 7</option>
                    <option value="e8">Default Event 8</option>
                    <option value="custom">Custom Upload</option>
                  </select>
                </div>

              </div>

              <div className="event-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeGalleryModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {showOrganisedModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">

            <div className="event-modal-header">
              <h3>
                {modalMode === "add" ? "Add" : "Edit"} Organized Event
              </h3>

              <button onClick={closeOrganisedModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleOrganisedSubmit}>
              <div className="event-modal-body">

                <div className="organized-icon-box">
                  <FiPlus />
                  <span>Major Event</span>
                </div>

                <div className="admin-form-group">
                  <label>Event Description Name</label>

                  <input
                    type="text"
                    className="admin-form-control"
                    value={organisedForm}
                    onChange={(e) =>
                      setOrganisedForm(e.target.value)
                    }
                    placeholder="e.g. CaliYog Run Club 2026"
                    required
                  />
                </div>

              </div>

              <div className="event-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeOrganisedModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default EventsTab;
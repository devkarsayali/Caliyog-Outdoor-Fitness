import React, { useState, useEffect, useRef, useCallback } from "react";
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

function EventsTab() {
  const API_URL = "http://192.168.11.11:5000";

  const [events, setEvents] = useState([]);
  const [organisedEvents, setOrganisedEvents] = useState([]);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showOrganisedModal, setShowOrganisedModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const [galleryForm, setGalleryForm] = useState({
    img: "",
    title: "",
  });

  const [organisedForm, setOrganisedForm] = useState("");

  const getAuthHeaders = () => {
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const safeJson = async (response) => {
    const text = await response.text();

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return {
        message: text || "Server returned invalid response",
      };
    }
  };

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.events)) return data.events;
    return [];
  };

  const hasImage = (img) => {
    return typeof img === "string" && img.trim() !== "";
  };

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await safeJson(response);

      const eventList = getArrayData(data);

      setEvents(eventList.filter((item) => item.eventType === "gallery"));

      setOrganisedEvents(
        eventList.filter(
          (item) =>
            item.eventType === "organized" || item.eventType === "organised"
        )
      );
    } catch (error) {
      console.error("Events Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setEditId(null);
    setModalMode("add");
    setGalleryForm({
      img: "",
      title: "",
    });
  };

  const closeOrganisedModal = () => {
    setShowOrganisedModal(false);
    setEditId(null);
    setModalMode("add");
    setOrganisedForm("");
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/events`
          : `${API_URL}/api/events/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          eventType: "gallery",
          title: galleryForm.title,
          img: galleryForm.img,
        }),
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to save gallery event");
        return;
      }

      alert(data.message || "Gallery event saved successfully");
      await loadData();
      closeGalleryModal();
    } catch (error) {
      console.error("Gallery Save Error:", error);
      alert("Backend connection failed while saving gallery event");
    }
  };

  const handleOrganisedSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/events`
          : `${API_URL}/api/events/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          eventType: "organized",
          title: organisedForm,
          description: organisedForm,
          location: "CaliYog Fitness Club",
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to save organized event");
        return;
      }

      alert(data.message || "Organized event saved successfully");
      await loadData();
      closeOrganisedModal();
    } catch (error) {
      console.error("Organised Event Save Error:", error);
      alert("Backend connection failed while saving organized event");
    }
  };

 const deleteEvent = async (id) => {
  if (!window.confirm("Are you sure you want to delete this event?")) return;

  try {
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete event");
      return;
    }

    alert(data.message || "Event deleted successfully");
    await loadData();
  } catch (error) {
    console.error("Delete Event Error:", error);
    alert("Backend connection failed while deleting event");
  }
};

  const openBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large! Please upload image smaller than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setGalleryForm((prev) => ({
        ...prev,
        img: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-content-window">
      <div className="events-header-box">
        <div>
          <span className="events-label">Events Management</span>
          <h2>Manage Events</h2>
          <p>Add gallery events and organised major events separately.</p>
        </div>

        <div className="events-header-actions">
          <button
            type="button"
            className="events-action-btn secondary"
            onClick={() => {
              setModalMode("add");
              setShowOrganisedModal(true);
            }}
          >
            <FiPlus /> Add Organized Event
          </button>

          <button
            type="button"
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
            {events.map((evt) => (
              <article className="event-card-admin" key={evt._id}>
                <div className="event-img-box">
                  {hasImage(evt.img) ? (
                    <img
                      src={evt.img}
                      alt={evt.title || "Gallery Event"}
                      className="event-img"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <FiImage />
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className="event-card-content">
                  <h3>{evt.title || "Untitled Event"}</h3>
                </div>

                <div className="event-card-footer">
                  <button
                    type="button"
                    className="event-edit-btn"
                    onClick={() => {
                      setGalleryForm({
                        img: evt.img || "",
                        title: evt.title || "",
                      });

                      setEditId(evt._id);
                      setModalMode("edit");
                      setShowGalleryModal(true);
                    }}
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    type="button"
                    className="event-delete-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteEvent(evt._id);
                    }}
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
            {organisedEvents.map((evt) => (
              <div className="major-event-card" key={evt._id}>
                <div>
                  <h3>{evt.title || "Untitled Organised Event"}</h3>
                  <p>Organised Event</p>
                </div>

                <div className="major-actions">
                  <button
                    type="button"
                    className="small-edit-btn"
                    onClick={() => {
                      setOrganisedForm(evt.title || "");
                      setEditId(evt._id);
                      setModalMode("edit");
                      setShowOrganisedModal(true);
                    }}
                  >
                    <FiEdit />
                  </button>

                  <button
                    type="button"
                    className="small-delete-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteEvent(evt._id);
                    }}
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
              <h3>{modalMode === "add" ? "Add" : "Edit"} Gallery Event</h3>
              <button type="button" onClick={closeGalleryModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit}>
              <div className="event-modal-body">
                <div className="event-image-preview" onClick={openBrowse}>
                  {hasImage(galleryForm.img) ? (
                    <img src={galleryForm.img} alt="Preview" />
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
              </div>

              <div className="event-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeGalleryModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Save Gallery Event
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
              <h3>{modalMode === "add" ? "Add" : "Edit"} Organized Event</h3>
              <button type="button" onClick={closeOrganisedModal}>
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
                  <label>Organized Event Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={organisedForm}
                    onChange={(e) => setOrganisedForm(e.target.value)}
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

                <button type="submit" className="save-btn">
                  Save Organized Event
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
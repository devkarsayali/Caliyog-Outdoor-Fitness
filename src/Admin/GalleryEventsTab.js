import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX, FiUpload, FiImage } from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/EventsTab.css";

function GalleryEventsTab() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [events, setEvents] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const [galleryForm, setGalleryForm] = useState({
    img: "",
    imageFile: null,
    title: "",
  });

  const getAuthToken = () =>
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  const safeJson = async (response) => {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { message: text || "Server returned invalid response" };
    }
  };

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.events)) return data.events;
    return [];
  };

  const hasImage = (img) => typeof img === "string" && img.trim() !== "";

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("blob:") || img.startsWith("http")) return img;
    return `${API_URL}${img}`;
  };

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await safeJson(response);
      const eventList = getArrayData(data);

      setEvents(eventList.filter((item) => item.eventType === "gallery"));
    } catch (error) {
      console.error("Gallery Events Load Error:", error);
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
      imageFile: null,
      title: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openBrowse = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large! Please upload image smaller than 10MB.");
      return;
    }

    setGalleryForm((prev) => ({
      ...prev,
      imageFile: file,
      img: URL.createObjectURL(file),
    }));
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/events`
          : `${API_URL}/api/events/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";
      const token = getAuthToken();

      const formData = new FormData();
      formData.append("eventType", "gallery");
      formData.append("title", galleryForm.title);
      formData.append("description", "");
      formData.append("location", "");
      formData.append("date", "");

      if (galleryForm.imageFile) {
        formData.append("image", galleryForm.imageFile);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
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

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery event?")) return;

    try {
      const token = getAuthToken();

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to delete gallery event");
        return;
      }

      alert(data.message || "Gallery event deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Delete Gallery Event Error:", error);
      alert("Backend connection failed while deleting gallery event");
    }
  };

  return (
    <div className="admin-content-window">
      <div className="events-header-box">
        <div>
          <span className="events-label">Gallery Event Management</span>
          <h2>Gallery Events</h2>
          <p>Add, update and delete only gallery event images here.</p>
        </div>

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

      <div className="section-title-row">
        <h2>Gallery Cards</h2>
        <span>{events.length} Items</span>
      </div>

      <div className="events-cards-grid">
        {events.map((evt) => (
          <article className="event-card-admin" key={evt._id}>
            <div className="event-img-box">
              {hasImage(evt.image || evt.img) ? (
                <img
                  src={getImageUrl(evt.image || evt.img)}
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
                    img: evt.image || evt.img || "",
                    imageFile: null,
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
                onClick={() => deleteEvent(evt._id)}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </article>
        ))}
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
                    <img src={getImageUrl(galleryForm.img)} alt="Preview" />
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
                <button type="button" className="cancel-btn" onClick={closeGalleryModal}>
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
    </div>
  );
}

export default GalleryEventsTab;
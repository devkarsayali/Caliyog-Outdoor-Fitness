import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX, FiUpload, FiImage } from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/EventsTab.css";

function GalleryEventsTab() {
  const API_URL = "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [events, setEvents] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const [galleryForm, setGalleryForm] = useState({
    imagePreview: "",
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

  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") {
      if (img.startsWith("blob:")) return img;
      if (img.startsWith("data:image")) return img;
      if (img.startsWith("http")) return img;
      if (img.startsWith("/uploads")) return `${API_URL}${img}`;
    }
    return "";
  };

  const hasImage = (img) => {
    if (!img) return false;
    if (typeof img === "string") return img.trim() !== "";
    return false;
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
    setGalleryForm({ imagePreview: "", imageFile: null, title: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openBrowse = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large! Max 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setGalleryForm((prev) => ({
        ...prev,
        imagePreview: reader.result,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
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
        headers: { Authorization: token ? `Bearer ${token}` : "" },
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
    if (!window.confirm("Delete this gallery event?")) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
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

  const openGalleryAdd = () => {
    setModalMode("add");
    setShowGalleryModal(true);
  };

  const openGalleryEdit = (evt) => {
    setGalleryForm({
      imagePreview: getImageUrl(evt.image || evt.img),
      imageFile: null,
      title: evt.title || "",
    });
    setEditId(evt._id);
    setModalMode("edit");
    setShowGalleryModal(true);
  };

  return (
    <div className="admin-content-window">
      <button
        type="button"
        className="events-action-btn primary"
        onClick={openGalleryAdd}
      >
        <FiPlus /> Add Gallery Event
      </button>

      <div className="section-title-row">
        <h2>Gallery Cards</h2>
        <span>{events.length} Items</span>
      </div>

      <div className="events-cards-grid">
        {events.map((evt) => {
          const imageUrl = getImageUrl(evt.image || evt.img);

          return (
            <article className="event-card-admin" key={evt._id}>
              <div className="event-img-box">
                {hasImage(evt.image || evt.img) ? (
                  <img
                    src={imageUrl}
                    alt={evt.title || "Gallery Event"}
                    className="event-img"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
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
                  onClick={() => openGalleryEdit(evt)}
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
          );
        })}

        {events.length === 0 && (
          <div className="admin-empty-box">
            <div className="empty-icon"><FiImage /></div>
            <h3>No Gallery Events</h3>
            <p>Click "Add Gallery Event" to upload images.</p>
          </div>
        )}
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
                  {hasImage(galleryForm.imagePreview) ? (
                    <img src={galleryForm.imagePreview} alt="Preview" />
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
                      setGalleryForm({ ...galleryForm, title: e.target.value })
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
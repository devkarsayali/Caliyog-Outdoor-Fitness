import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/EventsTab.css";

function EventsTab() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [organisedEvents, setOrganisedEvents] = useState([]);
  const [showOrganisedModal, setShowOrganisedModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);
  const [organisedForm, setOrganisedForm] = useState("");

  const getAuthToken = () =>
    localStorage.getItem("adminToken") || localStorage.getItem("token");

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

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await safeJson(response);
      const eventList = getArrayData(data);

      setOrganisedEvents(
        eventList.filter(
          (item) =>
            item.eventType === "organized" || item.eventType === "organised"
        )
      );
    } catch (error) {
      console.error("Organized Events Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const closeOrganisedModal = () => {
    setShowOrganisedModal(false);
    setEditId(null);
    setModalMode("add");
    setOrganisedForm("");
  };

  const handleOrganisedSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/events`
          : `${API_URL}/api/events/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";
      const token = getAuthToken();

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
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
    if (!window.confirm("Are you sure you want to delete this organized event?")) return;

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
        alert(data.message || "Failed to delete organized event");
        return;
      }

      alert(data.message || "Organized event deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Delete Organized Event Error:", error);
      alert("Backend connection failed while deleting organized event");
    }
  };

  return (
    <div className="admin-content-window">
      <div className="events-header-box">
        <div>
          <span className="events-label">Organized Events Management</span>
          <h2>Events We Organized</h2>
          <p>Add, update and delete major organized events here.</p>
        </div>

        <button
          type="button"
          className="events-action-btn primary"
          onClick={() => {
            setModalMode("add");
            setShowOrganisedModal(true);
          }}
        >
          <FiPlus /> Add Organized Event
        </button>
      </div>

      <div className="section-title-row">
        <h2>Major Organized Events</h2>
        <span>{organisedEvents.length} Items</span>
      </div>

      <div className="major-events-list">
        {organisedEvents.map((evt) => (
          <div className="major-event-card" key={evt._id}>
            <div>
              <h3>{evt.title || "Untitled Organized Event"}</h3>
              <p>Organized Event</p>
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
                onClick={() => deleteEvent(evt._id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

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
                <button type="button" className="cancel-btn" onClick={closeOrganisedModal}>
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
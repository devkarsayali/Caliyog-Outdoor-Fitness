import React, { useEffect, useRef, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiUserCheck,
  FiImage,
  FiUpload,
} from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/ExpertsTab.css";

function ExpertsTab() {
  const API_URL = "http://192.168.11.11:5000";

  const [experts, setExperts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    image: "",
  });

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const loadData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/experts`);
      const data = await response.json();

      if (response.ok) {
        setExperts(Array.isArray(data) ? data : data.data || []);
      } else {
        alert(data.message || "Failed to load experts");
      }
    } catch (error) {
      console.error("Experts Load Error:", error);
      alert("Backend connection failed while loading experts");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);

    setForm({
      name: "",
      specialization: "",
      experience: "",
      image: "",
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (expert) => {
    setForm({
      name: expert.name || "",
      specialization: expert.specialization || "",
      experience: expert.experience || "",
      image: expert.image || "",
    });

    setEditId(expert._id);
    setModalMode("edit");
    setShowModal(true);
  };

  const openBrowse = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large! Please upload image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/experts`
          : `${API_URL}/api/experts/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save expert");
        return;
      }

      alert(data.message || "Expert saved successfully");

      await loadData();
      closeModal();
    } catch (error) {
      console.error("Expert Save Error:", error);
      alert("Backend connection failed while saving expert");
    }
  };

  const deleteExpert = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fitness expert?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/experts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete expert");
        return;
      }

      alert(data.message || "Expert deleted successfully");

      await loadData();
    } catch (error) {
      console.error("Expert Delete Error:", error);
      alert("Backend connection failed while deleting expert");
    }
  };

  return (
    <div className="admin-content-window">
      <div className="experts-header-box">
        <div>
          <span className="experts-label">Trainer Management</span>
          <h2>Fitness Experts</h2>
          <p>
            Manage trainers, coaches, founders and expert profiles displayed on
            the CaliYog website.
          </p>
        </div>

        <button
          type="button"
          className="experts-add-btn"
          onClick={openAddModal}
        >
          <FiPlus /> Add Expert
        </button>
      </div>

      <div className="admin-cards-grid">
        {experts.map((expert) => (
          <article className="expert-card" key={expert._id}>
            <div className="expert-image-box">
              {expert.image ? (
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="expert-image"
                />
              ) : (
                <div className="expert-avatar">
                  <FiUserCheck />
                </div>
              )}

              <span className="expert-status">Active Expert</span>
            </div>

            <div className="expert-card-content">
              <h3>{expert.name}</h3>
              <span className="expert-specialization">{expert.specialization}</span>
              <p>{expert.experience}</p>
            </div>

            <div className="expert-card-footer">
              <button
                type="button"
                className="expert-edit-btn"
                onClick={() => openEditModal(expert)}
              >
                <FiEdit /> Edit
              </button>

              <button
                type="button"
                className="expert-delete-btn"
                onClick={() => deleteExpert(expert._id)}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </article>
        ))}

        {experts.length === 0 && (
          <div className="admin-empty-box">
            <div className="empty-icon">
              <FiUserCheck />
            </div>

            <h3>No Experts Found</h3>
            <p>Click Add Expert to create your first fitness expert profile.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal small-expert-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalMode === "add" ? "Add" : "Edit"} Fitness Expert
              </h3>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeModal}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body compact-modal-body">
                <div
                  className="expert-photo-preview"
                  onClick={openBrowse}
                  title="Click to upload photo"
                >
                  {form.image ? (
                    <img src={form.image} alt="Preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <FiImage />
                      <span>Add Photo</span>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                />

                <button
                  type="button"
                  className="upload-photo-btn"
                  onClick={openBrowse}
                >
                  <FiUpload /> Upload Expert Photo
                </button>

                <div className="admin-form-group">
                  <label>Expert Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter expert name"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={form.specialization}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        specialization: e.target.value,
                      })
                    }
                    placeholder="e.g. Head Coach"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Experience</label>
                  <textarea
                    rows="2"
                    className="admin-form-control"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience: e.target.value,
                      })
                    }
                    placeholder="Experience and certifications"
                    required
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="admin-btn admin-btn-primary">
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

export default ExpertsTab;
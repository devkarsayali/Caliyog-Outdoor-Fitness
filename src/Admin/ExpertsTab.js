import React, { useEffect, useRef, useState } from "react";
import { db } from "../utils/db";
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
  const [experts, setExperts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editIndex, setEditIndex] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    info: "",
    image: "",
  });

  const loadData = () => {
    setExperts(db.getExperts());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("caliyog_db_update", loadData);

    return () => {
      window.removeEventListener("caliyog_db_update", loadData);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setEditIndex(null);

    setForm({
      name: "",
      role: "",
      info: "",
      image: "",
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (expert, index) => {
    setForm({
      name: expert.name || "",
      role: expert.role || "",
      info: expert.info || "",
      image: expert.image || "",
    });

    setEditIndex(index);
    setModalMode("edit");
    setShowModal(true);
  };

  const openBrowse = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      db.addExpert(form);
    } else {
      db.updateExpert(editIndex, form);
    }

    closeModal();
  };

  const deleteExpert = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fitness expert?"
    );

    if (confirmDelete) {
      db.deleteExpert(index);
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
        {experts.map((expert, index) => (
          <article className="expert-card" key={index}>
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
              <span className="expert-role">{expert.role}</span>
              <p>{expert.info}</p>
            </div>

            <div className="expert-card-footer">
              <button
                type="button"
                className="expert-edit-btn"
                onClick={() => openEditModal(expert, index)}
              >
                <FiEdit /> Edit
              </button>

              <button
                type="button"
                className="expert-delete-btn"
                onClick={() => deleteExpert(index)}
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
                  <label>Role / Position</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value,
                      })
                    }
                    placeholder="e.g. Head Coach"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    rows="2"
                    className="admin-form-control"
                    value={form.info}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        info: e.target.value,
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
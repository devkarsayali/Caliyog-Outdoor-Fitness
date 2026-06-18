import React, { useEffect, useState } from "react";
import { db } from "../utils/db";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/MembershipTab.css";

function MembershipTab() {
  const [memberships, setMemberships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    subtitle: "",
    features: [""],
    featured: false,
  });

  const loadData = () => {
    setMemberships(db.getMemberships());
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
      title: "",
      price: "",
      subtitle: "",
      features: [""],
      featured: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredFeatures = form.features.filter(
      (feature) => feature.trim() !== ""
    );

    const finalForm = {
      ...form,
      features: filteredFeatures,
    };

    if (modalMode === "add") {
      db.addMembership(finalForm);
    } else {
      db.updateMembership(editIndex, finalForm);
    }

    closeModal();
  };

  const deleteMembership = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this membership plan?"
    );

    if (confirmDelete) {
      db.deleteMembership(index);
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...form.features];
    updatedFeatures[index] = value;

    setForm({
      ...form,
      features: updatedFeatures,
    });
  };

  const addFeatureInput = () => {
    setForm({
      ...form,
      features: [...form.features, ""],
    });
  };

  const removeFeatureInput = (index) => {
    const updatedFeatures = [...form.features];
    updatedFeatures.splice(index, 1);

    setForm({
      ...form,
      features: updatedFeatures,
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (membership, index) => {
    setForm({
      title: membership.title || "",
      price: membership.price || "",
      subtitle: membership.subtitle || "",
      features:
        membership.features && membership.features.length > 0
          ? membership.features
          : [""],
      featured: !!membership.featured,
    });

    setEditIndex(index);
    setModalMode("edit");
    setShowModal(true);
  };

  return (
    <div className="admin-content-window">
      <header className="admin-header">
        <div className="admin-header-title">
          <h1>Membership Packages</h1>
          <p>Modify duration packages, rates, plans, and feature lists.</p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={openAddModal}
          >
            <FiPlus /> Add Package
          </button>
        </div>
      </header>

      <div className="admin-cards-grid">
        {memberships.map((membership, index) => (
          <article className="admin-item-card" key={index}>
            <div className="admin-item-content">
              <div className="admin-item-title">{membership.title}</div>

              <div className="admin-item-subtitle membership-price">
                {membership.price}
              </div>

              {membership.featured && (
                <span className="admin-badge admin-badge-replied membership-badge">
                  Featured Plan
                </span>
              )}

              <p className="membership-subtitle">
                {membership.subtitle}
              </p>

              <ul className="membership-feature-list">
                {membership.features?.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="admin-item-footer">
              <button
                type="button"
                className="btn-icon"
                onClick={() => openEditModal(membership, index)}
              >
                <FiEdit />
              </button>

              <button
                type="button"
                className="btn-icon btn-icon-danger"
                onClick={() => deleteMembership(index)}
              >
                <FiTrash2 />
              </button>
            </div>
          </article>
        ))}

        {memberships.length === 0 && (
          <div className="admin-empty-box">
            No membership plans found. Click Add Package.
          </div>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {modalMode === "add" ? "Add" : "Edit"} Membership Plan
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
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Plan Title</label>

                  <input
                    type="text"
                    className="admin-form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    placeholder="Yearly Membership"
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Pricing Rate</label>

                    <input
                      type="text"
                      className="admin-form-control"
                      value={form.price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          price: e.target.value,
                        })
                      }
                      placeholder="₹24,000"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Subtitle / Caption</label>

                    <input
                      type="text"
                      className="admin-form-control"
                      value={form.subtitle}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Best Value Plan"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          featured: e.target.checked,
                        })
                      }
                    />
                    Feature this card
                  </label>
                </div>

                <div className="admin-form-group">
                  <label>Included Features List</label>

                  <div className="features-input-list">
                    {form.features.map((feature, index) => (
                      <div className="features-input-item" key={index}>
                        <input
                          type="text"
                          className="admin-form-control"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          placeholder={`Feature #${index + 1}`}
                          required
                        />

                        {form.features.length > 1 && (
                          <button
                            type="button"
                            className="btn-icon btn-icon-danger feature-remove-btn"
                            onClick={() => removeFeatureInput(index)}
                          >
                            <FiX />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary add-feature-btn"
                      onClick={addFeatureInput}
                    >
                      <FiPlus /> Add Plan Feature
                    </button>
                  </div>
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

                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipTab;
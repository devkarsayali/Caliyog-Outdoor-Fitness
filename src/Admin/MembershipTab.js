import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/MembershipTab.css";

const API_URL = "http://192.168.11.11:5000";

function MembershipTab() {
  const [memberships, setMemberships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    subtitle: "",
    features: [""],
    featured: false,
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/memberships`);
      const data = await response.json();

      setMemberships(
        Array.isArray(data) ? data : data.memberships || data.data || []
      );
    } catch (error) {
      console.error("Membership Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({
      title: "",
      price: "",
      subtitle: "",
      features: [""],
      featured: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      duration: form.title,
      features: form.features.filter((feature) => feature.trim() !== ""),
    };

    try {
      const url =
        modalMode === "add"
          ? `${API_URL}/api/memberships`
          : `${API_URL}/api/memberships/${editId}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(finalForm),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save membership");
        return;
      }

      alert(data.message || "Membership saved successfully");
      await loadData();
      closeModal();
    } catch (error) {
      console.error("Membership Save Error:", error);
      alert("Backend connection failed while saving membership");
    }
  };

  const deleteMembership = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this membership plan?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/memberships/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete membership");
        return;
      }

      alert(data.message || "Membership deleted successfully");
      await loadData();
    } catch (error) {
      console.error("Membership Delete Error:", error);
      alert("Backend connection failed while deleting membership");
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
      features: updatedFeatures.length > 0 ? updatedFeatures : [""],
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (membership) => {
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

    setEditId(membership._id);
    setModalMode("edit");
    setShowModal(true);
  };

  return (
    <div className="admin-content-window">
      <header className="admin-header">
        <div className="membership-header-box">
  <div>
    <span className="membership-label">Membership Management</span>
    <h2>Membership Plans</h2>
    <p>Add, edit, and delete user-side membership packages.</p>
  </div>

  <button
    type="button"
    className="membership-add-btn"
    onClick={openAddModal}
  >
    + Add Plan
  </button>
</div>
      </header>

      <div className="admin-cards-grid">
        {memberships.map((membership) => (
          <article className="admin-item-card" key={membership._id}>
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

              <p className="membership-subtitle">{membership.subtitle}</p>

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
                onClick={() => openEditModal(membership)}
              >
                <FiEdit />
              </button>

              <button
                type="button"
                className="btn-icon btn-icon-danger"
                onClick={() => deleteMembership(membership._id)}
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

                <button type="submit" className="admin-btn admin-btn-primary">
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
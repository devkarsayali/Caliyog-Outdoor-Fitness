import React, { useState, useEffect, useCallback, useRef } from "react";
import "../style/Admin/WhyChooseUsTab.css";

const API_URL = "https://caliyog-fitness-backend-production-2144.up.railway.app";

function WhyChooseUsTab() {
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // ✅ Image is now a base64 string from backend
  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") {
      if (img.startsWith("data:image")) return img;
      if (img.startsWith("blob:")) return img;
      if (img.startsWith("http")) return img;
    }
    return "";
  };

  const parseResponse = async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }
  };

  const loadItems = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/why-choose-us`);
      const result = await parseResponse(response);
      if (result.success) {
        setItems(result.data || []);
      }
    } catch (error) {
      console.error("Why Choose Us Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large! Max 5MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditingId(null);
    setImagePreview("");
    setImageFile(null);
    setShowForm(false);
    setFormData({ title: "", description: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `${API_URL}/api/why-choose-us/${editingId}`
      : `${API_URL}/api/why-choose-us`;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: data,
      });

      const result = await parseResponse(response);

      if (!response.ok) {
        alert(result.message || "Failed to save card");
        return;
      }

      alert(editingId ? "Card updated successfully" : "Card added successfully");
      resetForm();
      loadItems();
    } catch (error) {
      console.error("Why Choose Us Save Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditingId(item._id);
    setImagePreview(getImageUrl(item.image));
    setImageFile(null);
    setFormData({
      title: item.title || "",
      description: item.description || "",
    });
    setShowForm(true);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this card?")) return;
    try {
      const response = await fetch(`${API_URL}/api/why-choose-us/${id}`, {
        method: "DELETE",
      });
      const result = await parseResponse(response);
      if (result.success) {
        alert("Card deleted successfully");
        loadItems();
      } else {
        alert(result.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Why Choose Us Delete Error:", error);
    }
  };

  return (
    <div className="admin-content-window">
      <div className="section-title-row">
        <h2>Why Choose Us Cards</h2>
        <span>{items.length} Items</span>
        <button type="button" className="why-add-btn" onClick={openAddForm}>
          + Add Card
        </button>
      </div>

      <div className="why-list">
        {items.map((item) => (
          <div className="why-card-admin" key={item._id}>
            <div className="why-card-image">
              {item.image ? (
                <img src={getImageUrl(item.image)} alt={item.title} />
              ) : (
                <span>🖼️</span>
              )}
            </div>

            <div className="why-card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="why-card-buttons">
              <button type="button" onClick={() => editItem(item)}>
                Edit
              </button>
              <button type="button" onClick={() => deleteItem(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="admin-empty-box">
            <h3>No Cards Yet</h3>
            <p>Click "Add Card" to create your first Why Choose Us card.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="why-form-overlay" onClick={resetForm}>
          <form
            className="why-form"
            onSubmit={saveItem}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="why-form-close" onClick={resetForm}>
              ×
            </button>

            <div className="why-form-title">
              <h3>{editingId ? "Update Feature Card" : "Add New Feature Card"}</h3>
              <p>Upload image, add title, and description for the website card.</p>
            </div>

            <div className="form-group">
              <label>Card Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small>Max 5MB. Image is stored in MongoDB.</small>
            </div>

            {imagePreview && (
              <div className="why-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Expert Trainers"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write card description"
                rows="4"
                required
              />
            </div>

            <div className="why-actions">
              <button type="submit" className="why-save-btn" disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update Card" : "Save Card"}
              </button>
              <button type="button" className="why-cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default WhyChooseUsTab;
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../style/Admin/TransformationsTab.css";

const API_URL = "https://caliyog-fitness-backend-production-2144.up.railway.app";

function TransformationTab() {
  const fileInputRef = useRef(null);

  const [transformations, setTransformations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Image is base64 string from backend
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

  const loadTransformations = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transformations`);
      const result = await parseResponse(response);
      if (result.success) {
        setTransformations(result.data || []);
      }
    } catch (error) {
      console.error("Transformations Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadTransformations();
  }, [loadTransformations]);

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

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setImagePreview("");
    setImageFile(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const saveTransformation = async (e) => {
    e.preventDefault();

    if (!editingId && !imageFile) {
      alert("Please select transformation image");
      return;
    }

    setLoading(true);

    const url = editingId
      ? `${API_URL}/api/transformations/${editingId}`
      : `${API_URL}/api/transformations`;

    const data = new FormData();
    data.append("name", name);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await parseResponse(response);

      if (!response.ok) {
        alert(result.message || "Failed to save transformation");
        return;
      }

      alert(
        editingId
          ? "Transformation updated successfully"
          : "Transformation added successfully"
      );
      resetForm();
      loadTransformations();
    } catch (error) {
      console.error("Transformation Save Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editTransformation = (item) => {
    setEditingId(item._id);
    setName(item.name || "");
    setImagePreview(getImageUrl(item.image));
    setImageFile(null);
    setShowForm(true);
  };

  const deleteTransformation = async (id) => {
    if (!window.confirm("Delete this transformation?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/transformations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await parseResponse(response);

      if (!response.ok) {
        alert(result.message || "Failed to delete");
        return;
      }

      alert("Transformation deleted successfully");
      loadTransformations();
    } catch (error) {
      console.error("Transformation Delete Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="admin-content-window">
      <div className="section-title-row">
        <h2>Transformations</h2>
        <span>{transformations.length} Items</span>
        <button
          type="button"
          className="transformation-add-btn"
          onClick={openAddForm}
        >
          + Add Transformation
        </button>
      </div>

      <div className="transformation-list">
        {transformations.map((item) => (
          <div className="transformation-card-admin" key={item._id}>
            <img src={getImageUrl(item.image)} alt={item.name} />
            <h3>{item.name}</h3>
            <div className="transformation-card-buttons">
              <button type="button" onClick={() => editTransformation(item)}>
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteTransformation(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {transformations.length === 0 && (
          <div className="admin-empty-box">
            <h3>No Transformations Yet</h3>
            <p>Click "Add Transformation" to upload your first one.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="transformation-form-overlay" onClick={resetForm}>
          <form
            className="transformation-form"
            onSubmit={saveTransformation}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="transformation-form-close"
              onClick={resetForm}
            >
              ×
            </button>

            <div className="transformation-form-title">
              <h3>
                {editingId ? "Update Transformation" : "Add Transformation"}
              </h3>
              <p>Upload transformation image and add a title/name.</p>
            </div>

            <div className="form-group">
              <label>Transformation Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Transformation 1"
                required
              />
            </div>

            <div className="form-group">
              <label>Transformation Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small>Max 5MB. Image is stored in MongoDB.</small>
            </div>

            {imagePreview && (
              <div className="transformation-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}

            <div className="transformation-actions">
              <button
                type="submit"
                className="transformation-save-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Transformation"
                  : "Add Transformation"}
              </button>

              <button
                type="button"
                className="transformation-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TransformationTab;
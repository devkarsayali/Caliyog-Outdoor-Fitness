import React, { useCallback, useEffect, useState } from "react";
import "../style/Admin/TransformationsTab.css";

const API_URL =
  "https://caliyog-fitness-backend-production-2144.up.railway.app";

function TransformationTab() {
  const [transformations, setTransformations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}${imagePath}`;
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

  const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image compression failed"));
                return;
              }

              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, ".jpg"),
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );

              resolve(compressedFile);
            },
            "image/jpeg",
            quality
          );
        };

        img.onerror = () => reject(new Error("Invalid image file"));
      };

      reader.onerror = () => reject(new Error("Image reading failed"));
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setCompressing(true);

      const compressedFile = await compressImage(file, 1200, 0.7);

      if (compressedFile.size > 2 * 1024 * 1024) {
        alert(
          "Image is still larger than 2MB after compression. Please choose a smaller image."
        );
        e.target.value = "";
        setImage(null);
        return;
      }

      setImage(compressedFile);
    } catch (error) {
      alert(error.message || "Image compression failed");
      e.target.value = "";
      setImage(null);
    } finally {
      setCompressing(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setImage(null);
    setOldImage("");
    setShowForm(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setName("");
    setImage(null);
    setOldImage("");
    setShowForm(true);
  };

  const saveTransformation = async (e) => {
    e.preventDefault();

    if (!editingId && !image) {
      alert("Please select transformation image");
      return;
    }

    setLoading(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/api/transformations/${editingId}`
      : `${API_URL}/api/transformations`;

    const data = new FormData();
    data.append("name", name);

    if (image) {
      data.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        method,
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

      if (result.success) {
        alert(
          editingId
            ? "Transformation updated successfully"
            : "Transformation added successfully"
        );
        resetForm();
        loadTransformations();
      } else {
        alert(result.message || "Failed to save transformation");
      }
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
    setOldImage(item.image || "");
    setImage(null);
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
        alert(result.message || "Failed to delete transformation");
        return;
      }

      if (result.success) {
        alert("Transformation deleted successfully");
        loadTransformations();
      } else {
        alert(result.message || "Failed to delete transformation");
      }
    } catch (error) {
      console.error("Transformation Delete Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="transformation-admin">
        <div className="transformation-admin-header">
          <div>
            <h2>Transformations</h2>
            <p>Add, edit and delete transformation results</p>
          </div>

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
        </div>
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
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <small>Image will be compressed automatically under 2MB</small>
            </div>

            {(image || oldImage) && (
              <div className="transformation-preview">
                <img
                  src={image ? URL.createObjectURL(image) : getImageUrl(oldImage)}
                  alt="Transformation Preview"
                />
              </div>
            )}

            <div className="transformation-actions">
              <button
                type="submit"
                className="transformation-save-btn"
                disabled={loading || compressing}
              >
                {compressing
                  ? "Compressing Image..."
                  : loading
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
    </>
  );
}

export default TransformationTab;
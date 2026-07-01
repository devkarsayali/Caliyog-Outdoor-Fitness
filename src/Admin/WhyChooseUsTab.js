import React, { useEffect, useState, useCallback } from "react";
import "../style/Admin/WhyChooseUsTab.css";

const API_URL =
  "https://caliyog-fitness-backend-production-2144.up.railway.app";

function WhyChooseUsTab() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: ""
    
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setImage(null);
    setOldImage("");
    setShowForm(false);

    setFormData({
      title: "",
      description: ""
      
    });
  };

  const openAddForm = () => {
    setEditingId(null);
    setImage(null);
    setOldImage("");
    setFormData({
      title: "",
      description: ""
      
    });
    setShowForm(true);
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/api/why-choose-us/${editingId}`
      : `${API_URL}/api/why-choose-us`;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
   

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await fetch(url, {
        method,
        body: data,
      });

      const result = await parseResponse(response);

      if (!response.ok) {
        alert(result.message || "Failed to save card");
        return;
      }

      if (result.success) {
        alert(editingId ? "Card updated successfully" : "Card added successfully");
        resetForm();
        loadItems();
      } else {
        alert(result.message || "Failed to save card");
      }
    } catch (error) {
      console.error("Why Choose Us Save Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditingId(item._id);
    setOldImage(item.image || "");
    setImage(null);

    setFormData({
      title: item.title || "",
      description: item.description || ""
    
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
        alert(result.message || "Failed to delete card");
      }
    } catch (error) {
      console.error("Why Choose Us Delete Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="why-admin">
        <div className="why-header">
          <div>
            <span className="admin-section-label">Why Choose Us</span>
            <h2>Why Choose Us</h2>
            <p>Manage the features and benefits displayed on your website.</p>
          </div>

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
        </div>
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
              <p>
                Upload image, add title, description for the
                website card.
              </p>
            </div>

            <div className="why-form-grid">
              <div className="form-group">
                <label>Card Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <small>Image will be compressed automatically under 2MB</small>
              </div>

              
            </div>

            {(image || oldImage) && (
              <div className="why-preview">
                <img
                  src={image ? URL.createObjectURL(image) : getImageUrl(oldImage)}
                  alt="Why Choose Us Preview"
                />
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
              <button
                type="submit"
                className="why-save-btn"
                disabled={loading || compressing}
              >
                {compressing
                  ? "Compressing Image..."
                  : loading
                  ? "Saving..."
                  : editingId
                  ? "Update Card"
                  : "Save Card"}
              </button>

              <button type="button" className="why-cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default WhyChooseUsTab;
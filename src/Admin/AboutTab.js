import React, { useEffect, useState, useCallback } from "react";
import "../style/Admin/AboutTab.css";

const API_URL =
  "https://caliyog-fitness-backend-production-2144.up.railway.app";

function AboutTab() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    mission: "",
    vision: "",
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [oldImage1, setOldImage1] = useState("");
  const [oldImage2, setOldImage2] = useState("");
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

  const loadAbout = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/about`);
      const result = await parseResponse(response);

      if (result.success && result.data) {
        setFormData({
          title: result.data.title || "",
          subtitle: result.data.subtitle || "",
          description: result.data.description || "",
          mission: result.data.mission || "",
          vision: result.data.vision || "",
        });

        setOldImage1(result.data.image1 || "");
        setOldImage2(result.data.image2 || "");
      }
    } catch (error) {
      console.error("About Load Error:", error);
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleImage1Change = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setCompressing(true);
      const compressedFile = await compressImage(file);
      setImage1(compressedFile);
    } catch (error) {
      alert(error.message || "Image compression failed");
      e.target.value = "";
      setImage1(null);
    } finally {
      setCompressing(false);
    }
  };

  const handleImage2Change = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setCompressing(true);
      const compressedFile = await compressImage(file);
      setImage2(compressedFile);
    } catch (error) {
      alert(error.message || "Image compression failed");
      e.target.value = "";
      setImage2(null);
    } finally {
      setCompressing(false);
    }
  };

  const saveAbout = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("description", formData.description);
    data.append("mission", formData.mission);
    data.append("vision", formData.vision);

    if (image1) data.append("image1", image1);
    if (image2) data.append("image2", image2);

    try {
      const response = await fetch(`${API_URL}/api/about`, {
        method: "PUT",
        body: data,
      });

      const result = await parseResponse(response);

      if (!response.ok) {
        alert(result.message || "Failed to update about section");
        return;
      }

      if (result.success) {
        alert("About section updated successfully");
        setImage1(null);
        setImage2(null);
        loadAbout();
      } else {
        alert(result.message || "Failed to update about section");
      }
    } catch (error) {
      console.error("About Save Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about-tab">
      <div className="about-tab-header">
        <div>
          <span className="admin-section-label">About Management</span>

          <h2>About Section</h2>

          <p>Manage your website About section, description and images.</p>
        </div>
      </div>

      <form className="about-form" onSubmit={saveAbout}>
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Welcome to CaliYog"
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="With Strength and Grace"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write about your fitness club"
            rows="5"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Mission</label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              placeholder="Enter mission"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Vision</label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              placeholder="Enter vision"
              rows="4"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>About Image 1</label>
            <input type="file" accept="image/*" onChange={handleImage1Change} />
            <small>Large images will be compressed automatically</small>
          </div>

          <div className="form-group">
            <label>About Image 2</label>
            <input type="file" accept="image/*" onChange={handleImage2Change} />
            <small>Large images will be compressed automatically</small>
          </div>
        </div>

        <div className="preview-box">
          {(image1 || oldImage1) && (
            <img
              src={image1 ? URL.createObjectURL(image1) : getImageUrl(oldImage1)}
              alt="About Preview 1"
            />
          )}

          {(image2 || oldImage2) && (
            <img
              src={image2 ? URL.createObjectURL(image2) : getImageUrl(oldImage2)}
              alt="About Preview 2"
            />
          )}
        </div>

        <button
          className="save-about-btn"
          type="submit"
          disabled={loading || compressing}
        >
          {compressing
            ? "Compressing Image..."
            : loading
            ? "Saving..."
            : "Save About Section"}
        </button>
      </form>
    </div>
  );
}

export default AboutTab;
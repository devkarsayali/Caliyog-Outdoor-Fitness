import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/Admin/AdminCommon.css";
import logo from "../assets/CaliYog-Logo.png";
import homeVideo from "../assets/home-video.mp4";

function AdminRegister() {
  const navigate = useNavigate();

  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/admin/register`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      alert(response.data.message || "Admin Registered Successfully");
      navigate("/admin-login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Video Background */}
      <video
        className="admin-video-bg"
        src={homeVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920"
      />
      <div className="admin-video-overlay" />

      <div className="admin-login-page">
        <div className="admin-login-card admin-register-card">
          <div className="admin-login-header">
            <img src={logo} alt="CaliYog Logo" className="admin-login-logo" />
            <h1>REGISTER</h1>
            <p>Create CaliYog Admin Account</p>
          </div>

          <form onSubmit={registerAdmin}>
            <div className="admin-form-group">
              <label>
                <span className="label-icon">👤</span> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Admin Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>
                <span className="label-icon">📧</span> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Admin Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>
                <span className="label-icon">📱</span> Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>
                <span className="label-icon">🔒</span> Password
              </label>
              <div className="admin-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password (min 6 chars)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="admin-form-group">
              <label>
                <span className="label-icon">✅</span> Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="admin-btn-spinner" />
                  Registering...
                </>
              ) : (
                <>Create Admin Account →</>
              )}
            </button>
          </form>

          <p className="admin-login-footer">
            Already have an account?{" "}
            <span
              className="admin-login-link"
              onClick={() => navigate("/admin-login")}
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminRegister;
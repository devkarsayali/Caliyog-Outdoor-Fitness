import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/Admin/AdminCommon.css";
import logo from "../assets/CaliYog-Logo.png";
import homeVideo from "../assets/home-video.mp4";

function AdminLogin() {
  const navigate = useNavigate();

  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Backend returned non-JSON:", text);
        alert("Login API not found or backend returned HTML. Check backend route/deployment.");
        setLoading(false);
        return;
      }

      if (!response.ok || !data.token) {
        alert(data.message || "Invalid Admin Credentials");
        setLoading(false);
        return;
      }

      const confirmation = window.confirm(
        `⚠️ Security Check\n\nAn admin login attempt was detected.\n\nAdmin Email:\n${email}\n\nIs this you?\n\nPress OK if yes.\nPress Cancel if not.`
      );

      if (!confirmation) {
        alert("🚨 Login cancelled. Unauthorized attempt blocked.");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem(
        "adminData",
        JSON.stringify(data.admin || { email, name: "Admin" })
      );

      alert("✅ Login Successful. Welcome Admin!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Backend connection failed. Check backend server and CORS.");
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
        <div className="admin-login-card">
          <div className="admin-login-header">
            <img src={logo} alt="CaliYog Logo" className="admin-login-logo" />
            <h1>CALIYOG</h1>
            <p>Outdoor Fitness Club Admin Panel</p>
          </div>

          <form onSubmit={loginAdmin}>
            <div className="admin-form-group">
              <label>
                <span className="label-icon">📧</span> Admin Email
              </label>
              <input
                type="email"
                placeholder="Enter Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <p
              className="admin-login-link forgot-password"
              onClick={() =>
                alert("Forgot Password feature will be connected to backend later.")
              }
            >
              Forgot Password?
            </p>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="admin-btn-spinner" />
                  Logging in...
                </>
              ) : (
                <>Login to Dashboard →</>
              )}
            </button>
          </form>

          <p className="admin-login-footer">
            Don't have an admin account?{" "}
            <span
              className="admin-login-link"
              onClick={() => navigate("/admin-register")}
            >
              Register Here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
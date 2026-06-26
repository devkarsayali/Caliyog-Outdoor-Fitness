import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/Admin/AdminCommon.css";
import logo from "../assets/CaliYog-Logo.png";

function AdminLogin() {
  const navigate = useNavigate();
  const API_URL = "http://192.168.11.11:5000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid Admin Credentials");
        return;
      }

      const confirmation = window.confirm(
        `⚠️ Security Check

An admin login attempt was detected.

Admin Email:
${email}

Is this you?

Press OK if yes.
Press Cancel if not.`
      );

      if (!confirmation) {
        alert("🚨 Login cancelled. Unauthorized attempt blocked.");
        return;
      }

      localStorage.setItem("admin", "true");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminToken", data.token);
      }

      localStorage.setItem(
        "adminData",
        JSON.stringify(
          data.admin || {
            email,
            name: "Admin",
          }
        )
      );

      alert("✅ Login Successful. Welcome Admin!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Backend connection failed. Check backend server and CORS.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src={logo} alt="CaliYog Logo" className="admin-login-logo" />
          <h1>CALIYOG</h1>
          <p>Outdoor Fitness Club Admin Panel</p>
        </div>

        <form onSubmit={loginAdmin}>
          <div className="admin-form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Login to Dashboard
          </button>
        </form>

        <p
          className="admin-login-link forgot-password"
          onClick={() =>
            alert("Forgot Password feature will be connected to backend later.")
          }
        >
          Forgot Password?
        </p>

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
  );
}

export default AdminLogin;
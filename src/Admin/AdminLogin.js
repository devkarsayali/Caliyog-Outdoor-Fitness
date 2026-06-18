import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Admin/AdminCommon.css";
import logo from "../assets/CaliYog-Logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = (e) => {
    e.preventDefault();

    const adminData = JSON.parse(
      localStorage.getItem("adminData")
    );

    if (!adminData) {
      alert(
        "No Admin Registered. Please Register First."
      );
      navigate("/admin-register");
      return;
    }

    if (
      email === adminData.email &&
      password === adminData.password
    ) {
      const confirmation = window.confirm(
        `⚠️ Security Check

An admin login attempt was detected.

Admin Email:
${email}

Is this you?`
      );

      if (confirmation) {
        localStorage.setItem("admin", "true");

        alert(
          "✅ Login Successful. Welcome Admin!"
        );

        navigate("/admin-dashboard");
      } else {
        alert(
          "🚨 Unauthorized Login Attempt Blocked."
        );
      }
    } else {
      alert(
        "❌ Invalid Email or Password"
      );
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <img
            src={logo}
            alt="CaliYog Logo"
            className="admin-login-logo"
          />

          <h1>CALIYOG</h1>

          <p>
            Outdoor Fitness Club Admin Panel
          </p>
        </div>

        <form onSubmit={loginAdmin}>

          <div className="admin-form-group">
            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
          >
            Login to Dashboard
          </button>

        </form>

        <p
          className="admin-login-link"
          onClick={() =>
            alert(
              "Forgot Password feature will be connected to backend later."
            )
          }
        >
          Forgot Password?
        </p>

        <p className="admin-login-footer">
          Don't have an admin account?{" "}
          <span
            className="admin-login-link"
            onClick={() =>
              navigate("/admin-register")
            }
          >
            Register Here
          </span>
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/Admin/AdminCommon.css";
import logo from "../assets/CaliYog-Logo.png";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post(
"https://caliyog-fitness-backend-production-2144.up.railway.app",        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }
      );

      alert(
        response.data.message ||
          "Admin Registered Successfully"
      );

      navigate("/admin-login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card admin-register-card">

        <div className="admin-login-header">
          <img
            src={logo}
            alt="CaliYog Logo"
            className="admin-login-logo"
          />

          <h1>REGISTER</h1>

          <p>Create CaliYog Admin Account</p>
        </div>

        <form onSubmit={registerAdmin}>

          <div className="admin-form-group">
            <label>Full Name</label>

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
            <label>Email Address</label>

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
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
          >
            Register Admin
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
  );
}

export default AdminRegister;
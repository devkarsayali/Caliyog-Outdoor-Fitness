import React, { useState } from "react";
import "../style/Admin/SettingsTab.css";

function SettingsTab() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const savedAdmin = JSON.parse(localStorage.getItem("adminData")) || {};

  const [profileData, setProfileData] = useState({
    name: savedAdmin.name || "",
    email: savedAdmin.email || "",
    mobile: savedAdmin.mobile || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const token =
    localStorage.getItem("token") || localStorage.getItem("adminToken");

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!profileData.name || !profileData.email || !profileData.mobile) {
      alert("Please fill all profile fields");
      return;
    }

    try {
      setLoadingProfile(true);

      const response = await fetch(`${API_URL}/api/admin/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      const updatedAdmin = data.admin || profileData;

      localStorage.setItem("adminData", JSON.stringify(updatedAdmin));

      alert(data.message || "Profile updated successfully");
    } catch (error) {
      console.error("Profile Update Error:", error);
      alert("Backend connection failed while updating profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoadingPassword(true);

      const response = await fetch(`${API_URL}/api/admin/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update password");
        return;
      }

      alert(data.message || "Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password Update Error:", error);
      alert("Backend connection failed while updating password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="settings-tab">
      <div className="settings-header">
        <h2>⚙️ Account Settings</h2>
        <p>Update admin profile information and password.</p>
      </div>

      <form className="settings-card" onSubmit={updateProfile}>
        <h3>👤 Profile Information</h3>

        <div className="settings-grid">
          <div className="settings-group">
            <label>Admin Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter admin name"
              value={profileData.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="settings-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={profileData.email}
              onChange={handleProfileChange}
            />
          </div>

          <div className="settings-group full">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={profileData.mobile}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <button type="submit" className="settings-btn" disabled={loadingProfile}>
          {loadingProfile ? "Saving..." : "Save Profile Changes"}
        </button>
      </form>

      <form
        className="settings-card password-card"
        onSubmit={updatePassword}
      >
        <h3>🔒 Change Password</h3>

        <div className="settings-grid">
          <div className="settings-group full">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="settings-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="settings-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="settings-btn"
          disabled={loadingPassword}
        >
          {loadingPassword ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default SettingsTab;
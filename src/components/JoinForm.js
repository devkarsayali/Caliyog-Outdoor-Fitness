import React, { useEffect, useState } from "react";
import "../style/JoinForm.css";
import logo from "../assets/CaliYog-Logo.png";
import { db } from "../utils/db";

function JoinForm({ closeForm, selectedMembership }) {
  const [batch, setBatch] = useState("");
  const [timingType, setTimingType] = useState("");
  const [membership, setMembership] = useState(selectedMembership || "");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    parentName: "",
    parentContact: "",
    timing: "",
    transactionType: "",
  });

  const morningTimes = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "10:00 AM - 11:00 AM",
  ];

  const eveningTimes = [
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  const kidsTimes = ["6:00 PM - 7:00 PM"];

  useEffect(() => {
    if (selectedMembership) {
      setMembership(selectedMembership);
    }
  }, [selectedMembership]);

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
    setTimingType("");

    setFormData({
      ...formData,
      timing: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const joinRequest = {
      name: formData.name,
      email: formData.email,
      mobile: formData.contact,
      address: formData.address,
      batch: batch,
      timingType: timingType,
      timing: formData.timing,
      membership: membership,
      transactionType: formData.transactionType,
      parentName: formData.parentName,
      parentContact: formData.parentContact,
    };

    db.addJoinRequest(joinRequest);

    alert("Your membership request has been submitted successfully!");
    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="join-modal">
        <button className="close-btn" onClick={closeForm}>
          ✕
        </button>

        <div className="join-header">
          <img
            src={logo}
            alt="CaliYog Logo"
            className="join-logo"
          />

          <h2>Join CaliYog Fitness Club</h2>

          <p>
            Fill your details and start your fitness journey with us.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Batch</label>
            <select value={batch} onChange={handleBatchChange} required>
              <option value="">Choose Batch</option>
              <option value="Weight Loss & Fitness">Weight Loss & Fitness</option>
              <option value="Athlete Batch">Athlete Batch</option>
              <option value="Special Ladies Batch">Special Ladies Batch</option>
              <option value="Intermediate Calisthenics">
                Intermediate Calisthenics
              </option>
              <option value="Kids Batch">Kids Batch</option>
            </select>
          </div>

          {batch === "Kids Batch" && (
            <>
              <div className="form-group">
                <label>Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Enter parent name"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent Contact Number</label>
                <input
                  type="tel"
                  name="parentContact"
                  placeholder="Enter parent contact number"
                  value={formData.parentContact}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {batch && (
            <div className="form-group">
              <label>Select Timing Type</label>
              <select
                value={timingType}
                onChange={(e) => {
                  setTimingType(e.target.value);
                  setFormData({
                    ...formData,
                    timing: "",
                  });
                }}
                required
              >
                <option value="">Choose Morning / Evening</option>

                {batch !== "Kids Batch" && (
                  <option value="Morning">Morning</option>
                )}

                <option value="Evening">Evening</option>
              </select>
            </div>
          )}

          {timingType && (
            <div className="form-group">
              <label>Select Timing</label>
              <select
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                required
              >
                <option value="">Choose Time Slot</option>

                {batch === "Kids Batch" &&
                  kidsTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}

                {batch !== "Kids Batch" &&
                  timingType === "Morning" &&
                  morningTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}

                {batch !== "Kids Batch" &&
                  timingType === "Evening" &&
                  eveningTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Selected Membership</label>

            {selectedMembership ? (
              <input type="text" value={membership} readOnly />
            ) : (
              <select
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
                required
              >
                <option value="">Choose Membership</option>
                <option value="Weekly Plan">Weekly Plan - ₹2,500</option>
                <option value="15 Days">15 Days - ₹4,000</option>
                <option value="Monthly">Monthly - ₹6,000</option>
                <option value="3 Months">3 Months - ₹12,000</option>
                <option value="6 Months">6 Months - ₹18,000</option>
                <option value="Yearly Membership">Yearly - ₹24,000</option>
                <option value="Kids Yearly">Kids Yearly - ₹30,000</option>
              </select>
            )}
          </div>

          {membership && (
            <div className="form-group">
              <label>Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                required
              >
                <option value="">Choose Payment Type</option>
                <option value="UPI Payment">UPI Payment</option>
                <option value="Cash Payment">Cash Payment</option>
              </select>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
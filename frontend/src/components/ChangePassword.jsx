import { useState } from 'react';
import './Model.css';

export default function ChangePassword({ onClose }) {

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changePassword() {

    if (oldPassword === "") {
      alert("Please enter your current password.");
      return;

    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;

    }
    alert("Password changed successfully.");
    onClose();

  }

  return (

    <div className="model-overlay">

      <div className="model">

        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="model-buttons">

          <button
            className="blue-btn"
            onClick={changePassword}
          >
            Update Password
          </button>

          <button
            className="gray-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}
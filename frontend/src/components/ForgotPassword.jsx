import { useState } from 'react';
import './Model.css';
import { resetPassword, emailExists } from '../Utils/Auth.js';

export default function ForgotPassword({ onClose }) {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");


  function generateCode(length = 6) {

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  function sendCode() {



    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|co\.nz)$/;

    if (!emailExists(email)) {
      alert("Email not found.");
      return;
    }


    const randomCode = generateCode();

    setGeneratedCode(randomCode);
    setCodeSent(true);
    alert(
      "Verification code: " + randomCode
    );


    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!user) {
      alert("No account is linked to this email.");
      return;

    }

  }
  function resetPasswordClick() {

    if (code === "") {
      alert("Please enter verification code.");
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
    if (code !== generatedCode) {

      alert("Incorrect verification code.");

      return;

    }

    resetPassword(email, newPassword);

    alert("Password reset successfully.");

    onClose();

  }

  return (

    <div className="model-overlay">

      <div className="model">

        <h2>Forgot Password</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="blue-btn"
          onClick={sendCode}
        >
          Send Verification Code
        </button>

        {
          codeSent &&

          <>

            <input
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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

          </>

        }

        <div className="model-buttons">

          <button
            className="blue-btn"
            onClick={resetPasswordClick}
          >
            Reset Password
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

import { useState } from 'react';
import './Model.css';
import { useNavigate } from 'react-router-dom';
import { usernameExists, emailExists, saveUser } from '../Utils/Auth.js';

export default function CreateAccount({ onClose }) {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleCreate() {

    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Please complete all fields.");
      return;

    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|co\.nz)$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address ");
      return;
    }


    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;

    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;

    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    const exists = users.find(user => user.username === username);


    if (usernameExists(username)) {
      alert("Username already exists.");
      return;

    }

    if (emailExists(email)) {
      alert("Email already registered.");
      return;

    }

    users.push({
      username,
      password,
      firstName,
      lastName,
      email
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert(
      "Account created successfully."
    );

    onClose();

  }

  return (

    <div className="model-overlay">

      <div className="model">

        <h2>Create Account</h2>

        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">

          <input

            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />

          <button

            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}

          >

            {showPassword ? "🗨" : "👁‍🗨"}

          </button>

        </div>

        <div className="password-box">

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />

          <button

            type="button"
            className="eye-button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}

          >

            {showConfirmPassword ? "🗨" : "👁‍🗨"}

          </button>

        </div>

        <div className="model-buttons">

          <button
            className="blue-btn"
            onClick={handleCreate}
          >
            Submit
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
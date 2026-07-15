import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import { loginUser, setCurrentUser } from './utils/Auth.js';
import './components/Model.css';

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem("rememberUsername") || "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(localStorage.getItem("rememberMe") === "true");
  const [showCreate, setShowCreate] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {


    const user = loginUser(username, password);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("loggedIn", "true");
      if (remember) {

        localStorage.setItem("rememberUsername", username);

        localStorage.setItem("rememberMe", "true");

      }
      else {

        localStorage.removeItem("rememberUsername");
        localStorage.removeItem("rememberMe");
      }
      navigate("/dashboard");
    } else {
      alert("Incorrect username or password");
    }

  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }

  }

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>BNZ AI</h1>

        <p className="subtitle">
          BNZ OCR Scenario Simulator
        </p>

        <label>Username</label>

        <input
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <label>Password</label>

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🗨" : "👁‍🗨"}

          </button>

        </div>

        <div className="remember-row">

          <label>

            <input

              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />

            Remember Me

          </label>

        </div>

        <button

          className="login-button"
          onClick={handleLogin}

        >

          Sign In

        </button>

        <div className="link-row">

          <button
            onClick={() => setShowCreate(true)}
          >
            Create Account
          </button>


          <button
            onClick={() => setShowForgot(true)}
          >
            Forgot Password
          </button>

        </div>

        {/* <div className="link-row">

          <button
            onClick={() => setShowChange(true)}
          >
            Change Password
          </button>

        </div> */}

        <hr />

        <p className="privacy">

          By signing in, you agree to comply with the
          <br />

          • Privacy Act 2020 (New Zealand)

          <br />

          • BNZ Privacy Policy

        </p>
      </div>


      {showCreate && (
        <CreateAccount
          onClose={() => setShowCreate(false)}
        />
      )}

      {showForgot && (
        <ForgotPassword
          onClose={() => setShowForgot(false)}
        />
      )}

      {/* {showChange && (
        <ChangePassword
          onClose={() => setShowChange(false)}
        />
      )} */}

    </div>

  );
}

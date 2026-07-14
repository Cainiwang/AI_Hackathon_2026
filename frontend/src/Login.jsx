import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showChange, setShowChange] = useState(false);

    function handleLogin() {

        if (
            username === "abcd" &&
            password === "123456"
        ) {

            if (remember) {
                localStorage.setItem("loggedIn", "true");
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

                    onChange={(e)=>setUsername(e.target.value)}

                    onKeyDown={handleKeyDown}

                />

                <label>Password</label>

                <input

                    type="password"

                    value={password}

                    placeholder="Enter password"

                    onChange={(e)=>setPassword(e.target.value)}

                    onKeyDown={handleKeyDown}

                />

                <div className="remember-row">

                    <label>

                        <input

                            type="checkbox"

                            checked={remember}

                            onChange={(e)=>setRemember(e.target.checked)}

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
    onClick={()=>setShowCreate(true)}
>
    Create Account
</button>


<button
    onClick={()=>setShowForgot(true)}
>
    Forgot Password
</button>

                </div>

                <div className="link-row">

                    <button
    onClick={()=>setShowChange(true)}
>
    Change Password
</button>

                </div>

                <hr/>

                <p className="privacy">

                    By signing in, you agree to comply with the
                    <br/>

                    • Privacy Act 2020 (New Zealand)

                    <br/>

                    • BNZ Privacy Policy

                </p>
                </div>


            {showCreate && (
                <CreateAccountModal
                    close={()=>setShowCreate(false)}
                />
            )}

            {showForgot && (
                <ForgotPasswordModal
                    close={()=>setShowForgot(false)}
                />
            )}

            {showChange && (
                <ChangePasswordModal
                    close={()=>setShowChange(false)}
                />
            )}

        </div>

    );
}

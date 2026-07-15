import { getCurrentUser } from './utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Profile() {

  const user = getCurrentUser();
  const navigate = useNavigate();

  function returnDashboard() {
    navigate("/dashboard");
  }
  return (
    <div className="profile-page">


      <div className="profile-card">

        <h1>

          Profile

        </h1>

        <div className="profile-info">
          <strong>Username:</strong> {user.username}
        </div>

        <div className="profile-info">
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>

        <div className="profile-info">
          <strong>Email:</strong> {user.email}
        </div>

        <div className="profile-buttons">
          <button onClick={returnDashboard}>
            Return
          </button>
        </div>

      </div>

    </div >


  );


}
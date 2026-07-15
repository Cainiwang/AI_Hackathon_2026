import { getCurrentUser } from './utils/Auth.js';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const user = getCurrentUser();
  const navigate = useNavigate();

  function returnDashboard() {
    navigate("/dashboard");
  }
  return (
    <div>


      <h1>

        Profile

      </h1>


      <p>

        Username:

        {user.username}

      </p>


      <p>

        Name:

        {user.firstName}

        {user.lastName}

      </p>



      <p>

        Email:

        {user.email}

      </p>

      <button
        onClick={returnDashboard}
      >
        Return
      </button>

    </div >


  );


}
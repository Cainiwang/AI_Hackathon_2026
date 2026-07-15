import { useState } from 'react';
import { getCurrentUser, updateUser } from './utils/Auth.js';
import { useNavigate } from 'react-router-dom';



export default function Settings() {

  const navigate = useNavigate();
  const user = getCurrentUser();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  function save() {
    const updated = { ...user, email, password };
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|co\.nz)$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;

    }

    updateUser(updated);
    alert(
      "Updated successfully"
    );
    navigate("/dashboard");
  }

  function returnToDashboard() {
    navigate("/dashboard");
  }


  return (

    <div>


      <h1>

        Settings

      </h1>



      <h3>

        Change Email

      </h3>


      <input

        value={email}
        onChange={e => setEmail(e.target.value)

        }

      />



      <h3>

        Change Password

      </h3>


      <input

        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)

        }

      />



      <br />


      <button

        onClick={save}

      >

        Save

      </button>

      <button

        onClick={returnToDashboard}
      >
        Return

      </button>


    </div>


  );


}
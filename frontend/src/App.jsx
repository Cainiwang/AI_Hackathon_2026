import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Profile from './Profile.jsx'
import Settings from './Settings.jsx';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/create-account"
          element={<CreateAccount />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;

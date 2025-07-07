import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateAdPage from './pages/CreateAdPage';
import AdListPage from './pages/AdListPage';
import { Link } from 'react-router-dom';

function App() {
  return (
      <>
          <nav style={{ padding: "10px" }}>
              <Link to="/">Login</Link> |{" "}
              <Link to="/register">Register</Link> |{" "}
              <Link to="/profile">Profile</Link> | {" "}
              <Link to="/create">Create Casting Ad</Link> | {" "}
              <Link to="/adList">Ad List</Link>
          </nav>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/create" element={<CreateAdPage />} />
              <Route path="/adList" element={<AdListPage />} />
          </Routes>
      </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateAdPage from './pages/CreateAdPage';
import AdListPage from './pages/AdListPage';
import AdView from './components/AdView'
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    },[])
    const handleLogin = () =>{
        setIsLoggedIn(true);
        
    }
    
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }
    
  return (
      <>
          <nav style={{ padding: "10px" }}>
              {!isLoggedIn ? (
                  <>
                    <Link to="/">Login</Link> |{" "}
                    <Link to="/register">Register</Link>
                  </>
                  
          ) : (
                  <>
                    <Link to="/profile">Profile</Link> | {" "}
                    <Link to="/create">Create Casting Ad</Link> | {" "}
                    <Link to="/adList">Ad List</Link> | {" "}
                      <button onClick={handleLogOut} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                          Logout
                      </button>
                  </>
                  )}
          </nav>
          {!isLoggedIn ? (
          <Routes>
              <Route path="/" element={<LoginPage onLogin={handleLogin}/>} />
              <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          </Routes>
              ) : (
                  <Routes>
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/create" element={<CreateAdPage />} />
              <Route path="/adList/*" element={<AdListPage />} />
          </Routes>
          )}
      </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateAdPage from './pages/CreateAdPage';
import AdListPage from './pages/AdListPage';
import AdView from './components/AdView'
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

import * as React from "react";
import Layout from "./components/Layout";
import { Card, CardContent, CardHeader, CardActions, Button, Typography, Grid } from "@mui/material";

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
      <Layout title="Casting" isLoggedIn={isLoggedIn} onLogout={handleLogOut}>
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
                      <Route path="/adview/:id" element={<AdView />} />
          </Routes>
          )}
      </Layout>
  );
}

export default App;

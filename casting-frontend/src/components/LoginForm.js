import { useState } from 'react';
import { loginUser} from '../api/auth';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Box, Typography} from "@mui/material";

function LoginForm( {onLogin} ) 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({username: '', password:''});
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        let newErrors = {username:'', password:''};
        let hasError = false;

        if (!username.trim()){
            newErrors.username = "Username is required"
            hasError = true;
        }
        if (!password.trim()){
            newErrors.password = "Password is required"
            hasError = true;
        }
        setError(newErrors)
        if (hasError) return;
        try 
        {
            const res = await loginUser({ username, password});
            localStorage.setItem('token', res.data.token);
            if (onLogin) onLogin();
            alert('Login Successful');
            navigate ('./adList')
        } catch (err)
        {
            setError({
                username: "Incorrect username or password",
                password: "Incorrect username or password",
            });
            setLoginError(err.response?.data?.message || "Login Failed");
        }
    };
    
    return (
        <Box
            component="form"
            color="grey"
            sx={{ '& .MuiTextField-root': { m: 1.5, width: '30ch' } }}
            onSubmit={handleLogin}>
            
            <Typography variant="h5"
                        sx={{ fontFamily: "'Fondamento', cursive" }}
            >
                Login
            </Typography>
            <br/>
            <TextField
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                variant="standard"
                error={Boolean(error.username)}
                helperText={error.username}
            />
            <br />
            <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="standard"
                error={Boolean(error.password)}
                helperText={error.password}
            />
            <br />
            <Button type="submit"
                    sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold" }}
            >Login</Button>
        </Box>
    );
}

export default LoginForm;
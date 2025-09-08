import { useState } from 'react';
import { registerUser, loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Typography, Box} from "@mui/material";

function RegisterForm( {onLogin} ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState({username, password, email});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const validateFields = () => {
        let newErrors = {username:'', password:'', email:''};
        let hasError = false;

        if (!username.trim()){
            newErrors.username = "Username is required"
            hasError = true;
        }

        if (!email.trim()){
            newErrors.email = "Email is required"
            hasError = true;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!password.trim()){
            newErrors.password = "Password is required"
            hasError = true;
        } else if (!passwordPattern.test(password)){
            newErrors.password =
                "Password must be at least 6 characters, with 1 uppercase and 1 number";
            hasError = true;
        }
        setError(newErrors);
        return !hasError;
    };
    const handleRegister = async (e) => {
        e.preventDefault();
       if (!validateFields()) return;

        try {
            await registerUser({username, email, password});
            // Auto-login after registration
            const res = await loginUser({ username, password });
            localStorage.setItem('token', res.data.token);
            setSuccess(true);
            if (onLogin) onLogin();
            // Redirect to profile page
            navigate('/profile');
        } catch (err) {
            
            if (err.response?.data?.errors) {
                // Flatten and join validation messages
                const messages = Object.values(err.response.data.errors).flat().join(' ');
                setError(messages);
            } else {
                setError(err.response?.data?.title || 'Registration failed');
            }
        }
    };

    return (
        <Box 
            component="form"
            color="grey"
            sx={{ '& .MuiTextField-root': { m: 1.5, width: '30ch' } }}
            onSubmit={handleRegister}>
            <Typography variant="h5">
                Register
            </Typography>
            <br/>
            {success && <p style={{color: 'green'}}>Registration successful!</p>}
            <TextField
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                variant="standard"
                error={Boolean(error.username)}
                helperText={error.username}
            />
            <br/>
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                variant="standard"
                error={Boolean(error.email)}
                helperText={error.email}
            />
            <br/>
            <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="standard"
                error={Boolean(error.password)}
                helperText={error.password}
            />
            <br/>
            <Button type="submit">Register</Button>
        </Box>
    );
}

export default RegisterForm;

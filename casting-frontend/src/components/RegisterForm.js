import { useState } from 'react';
import { registerUser, loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function RegisterForm( {onLogin} ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
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
            console.error("Register error:", err.response?.data);
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
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>Registration successful!</p>}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <br/>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <br/>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <br/>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;

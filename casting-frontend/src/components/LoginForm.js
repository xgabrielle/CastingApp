import { useState } from 'react';
import { loginUser} from '../api/auth';

function LoginForm() 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try 
        {
            const res = await loginUser({ username, password});
            localStorage.setItem('token', res.data.token);
            alert('Login Successful');
        } catch (err)
        {
            setError(err.response?.data || 'Login Failed');   
        }
    };
    
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
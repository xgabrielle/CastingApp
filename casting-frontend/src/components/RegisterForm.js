import { useState } from 'react';
import { registerUser } from '../api/auth';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser({email, password, name});
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>Registration successful!</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
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

import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin, onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            onLogin(response.data); // This should now include { token, name, email }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="auth-page">
            <h2>Login to Kanban Board</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={onRegisterClick} className="btn-link">
                    Register here
                </button>
            </p>
        </div>
    );
};

export default LoginPage;

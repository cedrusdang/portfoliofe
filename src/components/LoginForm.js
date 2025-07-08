import React, { useState } from 'react';
import './LoginForm.css';

// REMEMBER TO REMOVE THIS LINE IN PRODUCTION
// Initialize the database with test data
import { CreateLoginDatabase, LoginValidate } from '../testing/ServerTest';
CreateLoginDatabase(); // Ensure the database is set up before rendering the app
// REMEMBER TO REMOVE THIS LINE IN PRODUCTION


function LoginForm({ setOnLogin, setLoginCredentials }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email) => {
        // Simple email regex for validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length <= 6) {
            setError('Password must be more than 6 characters.');
            return;
        }
        // Validate with server (localStorage)
        const result = await LoginValidate({ username: email, password });
        if (result.status !== 200) {
            setError(result.message);
            return;
        }
        if (setOnLogin) {
            setOnLogin(true);
            console.log("Login successful:", result);
            setLoginCredentials({ email: email, password: password, id: result.id });
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-form-title">Login</h2>
                {error && <div className="login-form-error">{error}</div>}
                <div className="login-field">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="login-form-input"
                        placeholder="Email"
                    />
                </div>
                <div className="login-field">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="login-form-input"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="login-form-button" >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;

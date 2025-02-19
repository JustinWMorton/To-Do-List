import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css';

export function RegisterUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((user: { username: string }) => user.username === username);

        if (userExists) {
            setErrorMessage('Username already exists');
            return;
        }

        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('username', username);
        navigate('/');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="register-input-container">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Username"
                    className="register-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Password"
                    className="register-input"
                />
                <div className="button-container">
                    <button onClick={handleRegister} className="register-button">Register</button>
                    <button onClick={() => navigate('/login')} className="login-button">Login</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}
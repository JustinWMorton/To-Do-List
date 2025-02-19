import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@contexts';
import './Login.css'; // Import the CSS file for styling

export function Login() {
    const { setName } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((user: { username: string, password: string }) => user.username === username && user.password === password);

        if (user) {
            setName(username);
            localStorage.setItem('username', username);
            setErrorMessage('');
            navigate('/');
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-input-container">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Password"
                    className="login-input"
                />
                <div className="button-container">
                    <button onClick={handleLogin} className="login-button">Login</button>
                    <button onClick={() => navigate('/register')} className="register-button">Register</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

export function Welcome() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (name.trim() === '') return;
        localStorage.setItem('username', name);
        navigate('/');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="welcome-container">
            <h1>Welcome</h1>
            <div className="welcome-input-container">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name"
                    className="welcome-input"
                />
                <button onClick={handleSubmit} className="welcome-button">Submit</button>
            </div>
        </div>
    );
}
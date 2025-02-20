import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@contexts';
import './Welcome.css';

export function Welcome() {
    const { setName } = useContext(UserContext);
    const [inputName, setInputName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (inputName.trim() === '') {
            setErrorMessage('Name cannot be blank');
            return;
        }
        localStorage.setItem('username', inputName);
        setName(inputName); // Update the UserContext
        navigate('/');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="welcome-container">
            <h1 className='header-text'>Welcome</h1>
            <div className="welcome-input-container">
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name"
                    className="welcome-input"
                />
                <button onClick={handleSubmit} className="welcome-button">Submit</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}
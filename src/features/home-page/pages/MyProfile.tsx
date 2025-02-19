import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@contexts';
import './MyProfile.css';

export function MyProfile() {
    const { name, setName } = useContext(UserContext);
    const [newName, setNewName] = useState(name);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (newName.trim() === '') return;
        setName(newName);
        localStorage.setItem('username', newName);
        navigate('/');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="profile-container">
            <h1>Enter a new name if you would like!</h1>
            <div className="profile-input-container">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your new name"
                    className="profile-input"
                />
                <button onClick={handleSubmit} className="profile-button">Submit</button>
            </div>
        </div>
    );
}
import React, { createContext, useState, useEffect } from 'react';

interface UserContextProps {
    name: string;
    setName: (name: string) => void;
}

export const UserContext = createContext<UserContextProps>({
    name: '',
    setName: () => {},
});

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('username');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
};
import React, { JSX, SetStateAction, useEffect } from "react";

interface IUserContext {
    name: string;
    setName: React.Dispatch<SetStateAction<string>>;
    isAuthenticated: boolean;
    logout: () => void;
}
const UserContext = React.createContext<IUserContext>({
    name: "default",
    setName: () => {},
    isAuthenticated: false,
    logout: () => {},
});

interface IUserContextProvider {
    children: JSX.Element;
}

const UserContextProvider = ({children}: IUserContextProvider) => {
    const [name, setName] = React.useState(localStorage.getItem('username') || "default");
    const [isAuthenticated, setIsAuthenticated] = React.useState(name !== "default");

    const logout = () => {
        setName("default");
        setIsAuthenticated(false);
        localStorage.removeItem('username');
    };

    useEffect(() => {
        if (name !== "default") {
            localStorage.setItem('username', name);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [name]);

    return <UserContext.Provider value={{name, setName, isAuthenticated, logout}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserContextProvider };
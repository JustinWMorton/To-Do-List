import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Header, Footer } from '@core';
import { TaskProvider, UserContextProvider, UserContext } from '@contexts';
import { Home, Welcome, MyProfile } from '@pages';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const { name } = useContext(UserContext);
  const [isNameSet, setIsNameSet] = useState(!!localStorage.getItem('username'));

  useEffect(() => {
    setIsNameSet(!!localStorage.getItem('username'));
  }, [name]);

  return (
    <TaskProvider>
      <UserContextProvider>
        <div className="app-container">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/" element={isNameSet ? <Home /> : <Navigate to="/To-Do-List/welcome" />} />
              <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UserContextProvider>
    </TaskProvider>
  );
}

export default App;

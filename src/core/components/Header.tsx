import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <header className="header">
            <div className="nav-container">
                <nav className={`nav ${isAuthPage ? 'disabled' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/my-profile">My Profile</Link>
                    {/* Add other navigation links here */}
                </nav>
            </div>
        </header>
    );
}
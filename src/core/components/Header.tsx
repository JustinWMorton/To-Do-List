import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
    return (
        <header className="header">
            <div className="nav-container">
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <span className="separator">|</span>
                    <Link to="/my-profile">My Profile</Link>
                    {/* Add other navigation links here */}
                </nav>
            </div>
        </header>
    );
}
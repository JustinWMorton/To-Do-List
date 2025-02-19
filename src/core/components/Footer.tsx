import React from 'react';
import './Footer.css';
//import { ReactComponent as GithubLogo } from '../../shared/ui/github-mark-c791e9551fe4/github-mark/github-mark-white.svg';

export function Footer() {
    return (
        <footer className="footer">
            <span>Justin Morton</span>
            <a href="https://github.com/JustinWMorton" target="_blank" rel="noopener noreferrer">
                <img src={require('../../shared/ui/images/github-mark-white.svg').default} className="github-logo" />
            </a>
        </footer>
    );
}
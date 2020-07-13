import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a>
                {props.currentUser ?
                    (
                        <span>
                            <Link className ="nav-link" to='/dashboard'>Profile</Link>
                            <Link className ="nav-link" to='/logout'>Log Out</Link>
                        </span>
                    ) :
                    (
                    <span>
                        <Link className ="nav-link" to="/login">Log In</Link>
                        <Link className ="nav-link" to="/signup">Sign Up</Link>
                    </span>
                    )
                }
            </div>

        </div>
    )
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/newhammer.svg" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
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

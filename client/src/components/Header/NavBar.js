import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import './NavBar.css';
import 'fontsource-roboto'

const NavBar = (props) => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/newhammer.svg" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items" font-family = "Roboto">
                {props.currentUser ?
                    (
                        <Typography>
                            <Link className ="nav-link" to='/dashboard'>Profile</Link>
                            < Link className ="nav-link" to='/inventory'>Inventory</Link>
                            <Link className ="nav-link" to='/logout'>Log Out</Link>
                        </Typography>
                    ) :
                    (
                    <Typography>
                        <Link className ="nav-link" to="/login">Log In</Link>
                        <Link className ="nav-link" to="/signup">Sign Up</Link>
                    </Typography>
                    )
                }
            </div>

        </div>
    )
};

export default NavBar;

import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import './NavBar.css';
import 'fontsource-roboto'

const NavBar = (props) => {
    const[drawerOpen, setDrawerOpen] = useState({open: false});
    const toggle = () => setDrawerOpen({open: !drawerOpen.open});

    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/newhammer.svg" } alt="Home Order logo" />
            </Link>

            <Drawer
                docked={false}
                anchor={"right"}
                minWidth={600}
                open={drawerOpen.open}
                onRequestChange={toggle}
                variant="persistent">
                <div>test</div>
            </Drawer>
            {/* Page Links */}
            <div className = "nav-items" fontFamily = "Roboto">
                {props.currentUser ?
                    (
                        <Typography>
                            <Link className ="nav-link" to='/dashboard'>Profile</Link>
                            < Link className ="nav-link" to='/inventory'>Inventory</Link>
                            <Link className ="nav-link" to='/logout'>Log Out</Link>
                            <Link className ="nav-link" onClick={toggle}>Cart</Link>
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

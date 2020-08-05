import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import './NavBar.css';
import 'fontsource-roboto'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const NavBar = (props) => {
    const[drawerOpen, setDrawerOpen] = useState({open: false});
    const toggle = () => setDrawerOpen({open: !drawerOpen.open});
    const [items, setItems] = useState([]);
    let list = [];
    useEffect (() => {
        function setData(response){
            response.forEach((currentItem) => {
                let item = {};
                axios.get('/api/items/search/'+currentItem.prodId)
                .then(response => {
                    item = response.data;
                    list.push(item)
                })
                .catch(function (error){
                    console.log(error);
                })
            })
        }
        async function fetchData() {
            axios.get('/api/carts/'+props.user.email)
            .then(response => {
                setData(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
        }
        if(props.user && props.user.atype==='Customer'){
            fetchData();
            setItems(list)
        }
    }, []);

    const reducer = (total, currentValue) => {
        if(total instanceof Object){
            total = parseFloat(total.price)
        }
        if(currentValue instanceof Object){
            currentValue = parseFloat(currentValue.price)
        }
        return total + currentValue;
    }
    const itemList = () => {
        return items.map(function(currentItem, i){
            return (
                <TableRow>
                    <TableCell>{currentItem.itemName}</TableCell>
                    <TableCell>{currentItem.price}</TableCell>
                    <TableCell>{currentItem.quantity}</TableCell>
                </TableRow>
            )
        })
    };

    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/newhammer.svg" } alt="Home Order logo" />
            </Link>
            {/* Page Links */}
            <div className = "nav-items" fontFamily = "Roboto">
                {props.user ?
                    (
                        <Typography>
                            {props.user.atype === "Customer" &&
                                <>
                                    <Drawer
                                    docked={false}
                                    anchor={"right"}
                                    width={50000}
                                    open={drawerOpen.open}
                                    onRequestChange={toggle}
                                    variant="persistent">
                                    {itemList()}
                                    {items.length !== 0 && 
                                    <>
                                        <div>Total: {items.reduce(reducer)}</div>
                                        <Button component={ Link } to={{pathname:"/checkout", state: {total:items.reduce(reducer)}}} variant="contained" color="primary" onClick={toggle}>Checkout</Button>
                                    </>
                                    }
                                    </Drawer>
                                    <Link className ="nav-link" onClick={toggle}>Cart</Link>
                                </>
                            }
                            <Link className ="nav-link" to='/dashboard'>Profile</Link>
                            <Link className ="nav-link" to='/inventory'>Inventory</Link>
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

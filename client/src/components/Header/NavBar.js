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
import httpUser from '../../httpUser'

const NavBar = (props) => {
    const[drawerOpen, setDrawerOpen] = useState({open: false});
    const toggle = () => setDrawerOpen({open: !drawerOpen.open});
    const [items, setItems] = useState([]);
    const [idCart, setIdCart] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [total, setTotal] = useState(0.00)
    const [loaded, setLoad] = useState(false)
    const [addCart, setAddCart] = useState({email: '', prodId: '', quantity: 1})
    const [removeCart, setRemoveCart] = useState({email: '', prodId: ''})
    let list = [];
    let cartIds = [];
    let quantList = [];
    useEffect (() => {
        function setData(response){
            response.forEach((currentItem) => {
                let item = {};
                axios.get('/api/items/search/'+currentItem.prodId)
                .then(response => {
                    item = response.data;
                    list.push(item)
                    cartIds.push(currentItem._id)
                    quantList.push(currentItem.quantity)
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
            setLoad(true)
            setIdCart(cartIds)
            setQuantities(quantList)
        }
    }, []);

    const totaler = () => {
        if(total===0 && items.length>0 && loaded){
            if(items.length>1){
                let tot = 0.00
                for(let i=0;i<items.length;i++){
                    tot+=items[i].price*quantities[i]
                }
                setTotal(tot.toFixed(2))
            }
            else if (items.length==1){
                setTotal((items[0].price*quantities[0]).toFixed(2))
            }
            else{
                setTotal(0.00)
            }
        }
    }

    const onAdd = (id) => {
        addCart.email = props.user.email;
        console.log(addCart)
        httpUser.addQuantity(id);
        setAddCart({email: props.user.email, prodId: '', quantity: 1});
    };

    const onRemove = (id, quantity) => {
        if(quantity <= 1){
            removeCart.email = props.user.email;
            httpUser.removeCart(removeCart);
            setRemoveCart({email: props.user.email, prodId: ''});
        }
        else{
            httpUser.removeQuantity(id);
        }
    };

    const itemList = () => {
        if(items.length===0 && loaded){
            return <div>Cart is empty!</div>
        }
        return items.map(function(currentItem, i){
            return (
                <TableRow>
                    <TableCell>{currentItem.itemName}</TableCell>
                    <TableCell>${parseFloat(currentItem.price).toFixed(2)}</TableCell>
                    <TableCell>{quantities[i]}</TableCell>
                    <TableCell><Button onClick={() => {addCart.prodId=currentItem._id;addCart.quantity=currentItem.quantity + 1;onAdd(idCart[i])}}>+</Button></TableCell>
                    <TableCell><Button onClick={() => {removeCart.prodId=currentItem._id;onRemove(idCart[i], quantities[i])}}>-</Button></TableCell>
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
                                        {totaler()}
                                        <div>Total: ${total}</div>
                                        <Button component={ Link } to={{pathname:"/checkout", state: {total:total}}} variant="contained" color="primary" onClick={toggle}>Checkout</Button>
                                    </>
                                    }
                                    </Drawer>
                                    <Link className ="nav-link" onClick={toggle}>Cart</Link>
                                    <Link className ="nav-link" to='/dashboard'>Orders</Link>
                                    <Link className ="nav-link" to='/store'>Store</Link>
                                    <Link className ="nav-link" to='/work'>Create Job</Link>
                                    <Link className ="nav-link" to='/forum'>Forum</Link>
                                    <Link className ="nav-link" to='/logout'>Log Out</Link>
                                </>
                            }
                            {props.user.atype === "Volunteer" &&
                                <>
                                    <Link className ="nav-link" to='/forum'>Forum</Link>
                                    <Link className ="nav-link" to='/dashboard'>Accept Orders</Link>
                                    <Link className ="nav-link" to='/inventory'>Current Orders</Link>
                                    <Link className ="nav-link" to='/logout'>Log Out</Link>
                                </>
                            }
                            {props.user.atype === "Store" &&
                                <>
                                    <Link className ="nav-link" to='/forum'>Forum</Link>
                                    <Link className ="nav-link" to='/dashboard'>Add Items</Link>
                                    <Link className ="nav-link" to='/inventory'>Store Inventory</Link>
                                    <Link className ="nav-link" to='/logout'>Log Out</Link>
                                </>
                            }
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

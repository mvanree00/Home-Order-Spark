import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import httpUser from '../httpUser'

const useStyles = makeStyles({
    table: {
      minWidth: 700,
      backgroundColor: "#DCDCDC",
      //width: "80%",
    },
    wrap: {
      minWidth: 700,
      width: "80%",
    },
    head: {
        backgroundColor: "#85D7C7",
    }
});

const Inventory = (props) => {
    const classes = useStyles();
    const [fields, setFields] = useState({email: props.user.email, prodId: ''});
    const [items, setItems] = useState({vals: []});

    useEffect (() => {
        async function fetchData() {
            if(props.user.atype === "Customer"){
                axios.get('/api/items')
                        .then(response => {
                            setItems({ vals: response.data });
                        })
                        .catch(function (error){
                            console.log(error);
                        })
            }
            else if(props.user.atype === "Store"){
                axios.get('/api/items/'+props.user.email)
                .then(response => {
                    setItems({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
            else{
                axios.get('/api/orders/email/'+props.user.email)
                .then(response => {
                    setItems({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
        }

        fetchData();
    }, []);

    const onUpdate = () => {
        console.log(fields)
        httpUser.addCart(fields);
        setFields({email: props.user.email, prodId: ''});
    };
    
    const itemList = () => {
        return items.vals.map(function(currentItem, i){
            return (
                <TableRow>
                    <TableCell>{currentItem.itemName}</TableCell>
                    <TableCell>{currentItem.price}</TableCell>
                    <TableCell>{currentItem.quantity}</TableCell>
                    {props.user.atype === "Customer" && 
                        <>
                            <TableCell><Button variant ="contained" color="primary" onClick={() => {fields.prodId=currentItem._id;onUpdate()}}>Add To Cart</Button></TableCell>
                        </>
                    }
                </TableRow>
            )
        })
    };

    const completeOrder = (orderid) => {
        axios.patch('/api/orders/completed/'+orderid)
        .catch(function (error){
            console.log(error);
        })
    };

    const orderList = () => {
        return items.vals.map(function(currentOrder, i){
            return (
                <TableRow>
                    <TableCell>{currentOrder.ids.length} items</TableCell>
                    <TableCell>${currentOrder.total}</TableCell>
                    <TableCell>Date Placed: {new Date(currentOrder.placed).toDateString()}</TableCell>
                    <TableCell>{currentOrder.status}</TableCell>
                    <TableCell>{currentOrder.store}</TableCell>
                    <TableCell><Button variant="contained" color="primary" onClick={() => {completeOrder(currentOrder._id)}}>Delivered</Button></TableCell>
                </TableRow>
            )
        })
    };

    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Typography variant="h1">Here are your current and past accepted orders, {props.user.name}!</Typography>
                <TableBody>
                    { orderList() }
                </TableBody>
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your store inventory, {props.user.name}!</Typography>
                {items ?
                (<TableContainer className={classes.wrap} component={Paper}>
                    <Typography variant="h2">Here are the items you are currently selling:</Typography>
                    <Table className={classes.table} >
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { itemList() }
                        </TableBody>
                    </Table>
                </TableContainer>)
                : (<Typography variant="h2">Nothing currently being sold.</Typography>)}
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <TableContainer className={classes.wrap} component={Paper}>
                    <Typography variant="h3">Items List</Typography>
                    <Table className={classes.table} >
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { itemList() }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
        )
    }
};

export default Inventory;

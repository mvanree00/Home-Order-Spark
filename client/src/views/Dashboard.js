import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import AddItems from './AddItems.js'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const Dashboard = (props) => {
    const [orders, setOrders] = useState({vals: []});
    useEffect (() => {
        async function fetchData() {
            if(props.user.atype === "Customer"){
                axios.get('/api/orders/customer/'+props.user.email)
                .then(response => {
                    setOrders({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
            else if(props.user.atype==="Volunteer"){
                axios.get('/api/orders/volunteer')
                .then(response => {
                    setOrders({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
        }
        fetchData();
    }, []);

    const acceptOrder = (orderid) => {
        axios.patch('/api/orders/volunteer/'+orderid,{email: props.user.email})
        .catch(function (error){
            console.log(error);
        })
    };

    const cancelOrder = (orderid) => {
        axios.patch('/api/orders/cancel/'+orderid)
        .catch(function (error){
            console.log(error);
        })
    };

    const itemList = () => {
        return orders.vals.map(function(currentOrder, i){
            return (
                <TableRow>
                    <TableCell>{currentOrder.ids.length} items</TableCell>
                    <TableCell>${currentOrder.total}</TableCell>
                    <TableCell>Date Placed: {new Date(currentOrder.placed).toDateString()}</TableCell>
                    <TableCell>{currentOrder.status}</TableCell>
                    <TableCell>{currentOrder.store}</TableCell>
                    {props.user.atype === "Volunteer" && 
                        <>
                            <TableCell><Button variant="contained" color="primary" onClick={() => {acceptOrder(currentOrder._id)}}>Accept Order</Button></TableCell>
                        </>
                    }
                    {props.user.atype === "Customer" && currentOrder.status === "placed" &&
                        <>
                            <Button variant="contained" color="primary" onClick={() => {cancelOrder(currentOrder._id)}}>Cancel Order</Button>
                        </>
                    }
                </TableRow>
            )
        })
    };

    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your volunteer dashboard, {props.user.name}!</Typography>
                {orders ? 
                (<div>
                    <Typography variant="h2">Current open orders:</Typography>
                    {itemList()}
                </div>)
                : (<Typography variant="h2">No orders to accept.</Typography>)}
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <AddItems {...props} user={props.user}/>
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your dashboard, {props.user.name}!</Typography>
                <Typography variant="h2">Recent orders:</Typography>
                {itemList()}
            </div>
            
        )
    }
};

export default Dashboard;
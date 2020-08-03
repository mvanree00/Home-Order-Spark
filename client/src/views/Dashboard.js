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
        }
        fetchData();
    }, []);

    const itemList = () => {
        return orders.vals.map(function(currentOrder, i){
            return (
                <TableRow>
                    <TableCell>{currentOrder.ids.length} items</TableCell>
                    <TableCell>${currentOrder.total}</TableCell>
                    <TableCell>Date Placed: {new Date(currentOrder.placed).toDateString()}</TableCell>
                    <TableCell>{currentOrder.status}</TableCell>
                </TableRow>
            )
        })
    };

    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your volunteer dashboard, {props.user.name}!</Typography>
                <Typography variant="h2">Current open orders:</Typography>
                <div align="center">
                    <Button variant ="contained" color="primary" type="submit">Accept Order</Button>
                </div>
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
                <Button variant ="contained" color="primary" type="submit">Cancel Order</Button>
            </div>
            
        )
    }
};

export default Dashboard;
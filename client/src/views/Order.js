import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import axios from 'axios'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Checkout = (props) => {
    const [items, setItems] = useState([]);
    useEffect (() => {
        async function fetchData() {
            if (!props.location.state.order){
                props.history.push('/dashboard')
            }
            else{
                axios.get('/api/orders/order/'+props.location.state.order._id)
                .then(response => {
                    setItems(response.data)
                })
                .catch(function (error){
                    console.log(error);
                })
            }
        }
        fetchData();
    }, []);

    const cancelOrder = (orderid) => {
        axios.patch('/api/orders/cancel/'+orderid)
        .catch(function (error){
            console.log(error);
        })
    };

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
        <div align="center">
            <TableContainer>
                <Typography variant="h1">Here is your order, {props.user.name}!</Typography>
                {props.location.state ?
                    (<div><div align='center'>{props.location.state.order.ids.length} items</div>
                    <div align='center'>Date Placed: {new Date(props.location.state.order.placed).toDateString()}</div>
                    <div align='center'>Status: {props.location.state.order.status}</div>
                    <div align='center'>Store: {props.location.state.order.store}</div>
                    <div align='center'>Address: {props.location.state.order.address}</div>
                    <div>Total: ${props.location.state.order.total}</div>
                    <Table>
                        <TableBody>
                            {itemList()}
                        </TableBody>
                    </Table>
                    {props.location.state.order.status === "placed" &&
                        <>
                            <Button variant="contained" color="primary" onClick={() => {cancelOrder(props.location.state.order._id)}}>Cancel Order</Button>
                        </>
                    }</div>)
                    : (props.history.push("/store"))
                }
            </TableContainer>
        </div>
    )
};

export default Checkout;
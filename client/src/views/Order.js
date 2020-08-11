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
import '../components/Header/NavBar.css'
import './Post.css'

const Order = (props) => {
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
        .then(() => {
            props.history.push("/dashboard")
        })
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

    const hyperLink = (inputString) => {
        var str = inputString;
        var map = "http://maps.google.com/?q=";
        var replaced = str.split(' ').join('+');
        replaced = map.concat(replaced)
        return (
            <a href={replaced}>{inputString}</a>
        )
    }

    return (
        <div align="center">
            <TableContainer>
                <Typography variant="h1">Here is your order, {props.user.name}!</Typography>
                {props.location.state ?
                    (
                    <div>
                        <TableContainer className="orderWrap">
                            <Table className="table">
                                <TableHead className="Head">
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <Typography align='center' variant="h3">Order Details</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Item Count</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography align='center'>{props.location.state.order.ids.length}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            <Typography>Date Placed</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography align='center'>{new Date(props.location.state.order.placed).toDateString()}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                    <TableCell>
                                        <Typography>Status</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography align='center'>{props.location.state.order.status}</Typography>
                                    </TableCell>
                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Store</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography align='center'>{hyperLink(props.location.state.order.store)}</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            <Typography>Address</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography align='center'>{hyperLink(props.location.state.order.address)}</Typography>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <br/>
                        <TableContainer>
                            <Table className="table">
                                <TableHead className="Head">
                                    <TableRow>
                                        <TableCell colspan={3}>
                                            <Typography align='center' variant="h3">Item List</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itemList()}
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Total: ${props.location.state.order.total}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {props.location.state.order.status === "placed" &&
                            <>
                                <Button variant="contained" color="primary" onClick={() => {cancelOrder(props.location.state.order._id)}}>Cancel Order</Button>
                            </>
                        }
                    </div>)
                    : (props.history.push("/store"))
                }
            </TableContainer>
        </div>
    )
};

export default Order;
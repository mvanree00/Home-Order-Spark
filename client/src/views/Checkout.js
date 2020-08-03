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
    const [fields, setFields] = useState({status: '', email: props.user.email, ids: [], placed: '', total: 0.0});
    const [items, setItems] = useState([]);
    const [totals, setTotal] = useState(0.0);
    let idss = [];
    let list = [];
    useEffect (() => {
        function setData(response){
            response.forEach((currentItem) => {
                let item = {};
                axios.get('/api/items/search/'+currentItem.prodId)
                .then(response => {
                    item = response.data;
                    idss.push(item._id)
                    list.push(item)
                    setTotal(totals+item.price)
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
        fetchData();
        setItems(list)
        setFields({status: '', email: props.user.email, ids: idss, placed: '', total: 0});
    }, []);

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

    const placeOrder = async(e) => {
        e.preventDefault();
        console.log(totals)
        fields.status='placed'
        fields.total=totals
        fields.placed = new Date
        //await httpUser.addOrder({status: "placed", email: props.user.email, ids: idss, placed: new Date});
        await httpUser.addOrder(fields);
    };

    return (
        <form onSubmit={placeOrder}>
            <div align="center">
                <TableContainer>
                    <Typography variant="h1">Welcome to checkout, {props.user.name}!</Typography>
                    <Table>
                        <TableBody>
                            {itemList()}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Button variant="contained" color="primary" type="submit">Place Order</Button>
            </div>
        </form>
    )
};

export default Checkout;
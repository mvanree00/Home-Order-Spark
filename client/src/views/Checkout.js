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
import Input from '@material-ui/core/Input'
import '../components/Header/NavBar.css'

const Checkout = (props) => {
    const [fields, setFields] = useState({status: '', email: props.user.email, ids: [], placed: '', total: 0.0, store: '', address: props.user.address});
    const [items, setItems] = useState([]);
    const [totals, setTotal] = useState(0);
    const [update, setUpdate] = useState('');
    const [idCart, setIdCart] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [addCart, setAddCart] = useState({email: '', prodId: '', quantity: 1})
    const [removeCart, setRemoveCart] = useState({email: '', prodId: ''})
    let idss = [];
    let list = [];
    let quantList = [];
    let cartIds = [];
    useEffect (() => {
        function setData(response){
            response.forEach((currentItem) => {
                let item = {};
                axios.get('/api/items/search/'+currentItem.prodId)
                .then(response => {
                    item = response.data;
                    idss.push(item._id)
                    list.push(item)
                    quantList.push(currentItem.quantity)
                    cartIds.push(currentItem._id);
                    setTotal(props.location.state.total)
                    setUpdate(currentItem._id) // forces update to show all items
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
        setQuantities(quantList)
        setIdCart(cartIds);
        setFields({status: '', email: props.user.email, ids: idss, placed: '', total: 0, store: '', address: props.user.address});
    }, []);

    const onAdd = (id) => {
        addCart.email = props.user.email;
        console.log(id)
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
        return items.map(function(currentItem, i){
            return (
                <TableRow>
                    <TableCell>{currentItem.itemName}</TableCell>
                    <TableCell>{currentItem.price}</TableCell>
                    {/*<TableCell>{quantities[i]}</TableCell>
                    <TableCell><Button onClick={() => {addCart.prodId=currentItem._id;addCart.quantity=currentItem.quantity + 1;onAdd(idCart[i])}}>+</Button></TableCell>
                    <TableCell><Button onClick={() => {removeCart.prodId=currentItem._id;onRemove(idCart[i], quantities[i])}}>-</Button></TableCell>*/}
                    <TableCell>
                        <Button onClick={() => {removeCart.prodId=currentItem._id;onRemove(idCart[i], quantities[i])}}>-</Button>
                        {quantities[i]}
                        <Button onClick={() => {addCart.prodId=currentItem._id;addCart.quantity=currentItem.quantity + 1;onAdd(idCart[i])}}>+</Button>
                    </TableCell>
                </TableRow>
            )
        })
    };

    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    const placeOrder = async(e) => {
        e.preventDefault();
        fields.status='placed'
        fields.placed = new Date
        fields.store=items[0].store
        fields.total=props.location.state.total
        if(fields.address.length==0){
            fields.address=props.user.address
        }
        //await httpUser.addOrder({status: "placed", email: props.user.email, ids: idss, placed: new Date});
        await httpUser.addOrder(fields);
        props.history.push('/dashboard')
    };

    return (
        <form onSubmit={placeOrder} onChange={onInputChange}>
            <div align="center">
                <TableContainer className="Wrap">
                    <Typography variant="h1">Welcome to checkout, {props.user.name}!</Typography>
                    <Table className="table">
                        <TableHead className="Head">
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableHead>
                        <TableBody>
                            {itemList()}
                        </TableBody>
                    </Table>
                </TableContainer>
                {props.location.state || totals ?
                            (<div>
                                <Typography className="Total" variant="h4">Total: ${totals}</Typography>
                                <br/>
                                <br/>
                                <br/>
                                <Typography variant="h4">Shipping Address</Typography>
                                <Typography variant="caption">Please input the address where you would like your order delivered</Typography>
                                <br/>
                                <br/>
                                <br/>
                                <div className="Input">
                                    <Input type="text" placeholder="Address" name="address" value={fields.address} />
                                </div>
                            </div>)
                            : (props.history.push("/store"))
                            }
                <Button variant="contained" color="primary" type="submit">Place Order</Button>
            </div>
        </form>
    )
};

export default Checkout;
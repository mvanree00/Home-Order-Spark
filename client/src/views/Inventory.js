import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto'
import { Link } from 'react-router-dom'
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
import Search from './Search.js';
import ItemList from './ItemList.js';
import ViewItem from './ViewItem.js';
import Grid from '@material-ui/core/Grid';
import '../components/Header/NavBar.css'

const Inventory = (props) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [filterText, setFilterText] = useState('');
    const [store, setStore] = useState('');
    const [items, setItems] = useState({vals: []});
    const [jobs, setJobs] = useState({vals: []});

    useEffect (() => {
        async function fetchData() {
            if(props.user.atype === "Customer"){
                if(props.location.state !== undefined || store.length !== 0){
                    if(props.location.state !== undefined){
                        axios.get('/api/items/'+props.location.state.email)
                        .then(response => {
                            setItems({ vals: response.data });
                            setStore(props.location.state.email);
                        })
                        .catch(function (error){
                            console.log(error);
                        })
                    }
                    else{
                        axios.get('/api/items/'+store)
                        .then(response => {
                            setItems({ vals: response.data });
                        })
                        .catch(function (error){
                            console.log(error);
                        })
                    }
                }
                else{
                    props.history.push('/store')
                }
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
                axios.get('/api/jobs/email/'+props.user.email)
                .then(response => {
                    setJobs({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
        }

        fetchData();
    }, []);

    const filterUpdate = (value) => {
        //Here you can set the filterText property of state to the value passed into this function
        setFilterText(value)
    };

    const selectedUpdate = (id) => {
        //Here you can update the selectedItem property of state to the id passed into this function
        setSelectedItem(id)
    };

    const completeOrder = (orderid) => {
        axios.patch('/api/orders/completed/'+orderid)
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    const completeJob = (orderid) => {
        axios.patch('/api/jobs/completed/'+orderid)
        .then(() => {
            window.location.reload();
        })
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
                    <TableCell>{currentOrder.address}</TableCell>
                    <TableCell><Button component={ Link } to={{pathname:"/order", state: {order: currentOrder}}} variant="contained" color="primary">View Order</Button></TableCell>
                    {currentOrder.status !== "delivered" &&
                        <>
                            <TableCell><Button variant="contained" color="primary" onClick={() => {completeOrder(currentOrder._id)}}>Delivered</Button></TableCell>
                        </>
                    }
                </TableRow>
            )
        })
    };

    const jobList = () => {
        return jobs.vals.map(function(currentOrder, i){
            return (
                <TableRow>
                    <TableCell>{currentOrder.title}</TableCell>
                    <TableCell>Date Placed: {new Date(currentOrder.placed).toDateString()}</TableCell>
                    <TableCell>{currentOrder.status}</TableCell>
                    <TableCell>{currentOrder.address}</TableCell>
                    <TableCell><Button component={ Link } to={{pathname:"/job", state: {order: currentOrder}}} variant="contained" color="primary">View Job</Button></TableCell>
                    {currentOrder.status !== "completed" &&
                        <>
                            <TableCell><Button variant="contained" color="primary" onClick={() => {completeJob(currentOrder._id)}}>Completed</Button></TableCell>
                        </>
                    }
                </TableRow>
            )
        })
    };

    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h1">Here are your current and past accepted orders, {props.user.name}!</Typography>
                        <Table className="table">
                            <TableHead className="Head">
                                <TableCell>Amount</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Store</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableHead>
                            <TableBody>
                                { orderList() }
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h1">Here are your current and past accepted jobs, {props.user.name}!</Typography>
                        <Table className="table">
                            <TableHead className="Head">
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                            </TableHead>
                            <TableBody>
                                { jobList() }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your store inventory, {props.user.name}!</Typography>
                {items ?
                (<div>
                    <Typography variant="h2">Here are the items you are currently selling:</Typography>
                    <Search filterText={filterText} filterUpdate={filterUpdate.bind(this)}/>
                    <ItemList
                        items={items}
                        filterText={filterText}
                        selectedUpdate={selectedUpdate.bind(this)}
                        acc = {props.user}
                    />
                    <ViewItem
                        data={items}
                        selectedItem={selectedItem}
                    />
                </div>)
                : (<Typography variant="h2">Nothing currently being sold.</Typography>)}
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <Typography variant="h3">Items List</Typography>
                {items ?
                (<div>
                    <Search filterText={filterText} filterUpdate={filterUpdate.bind(this)}/>
                    <ViewItem
                        data={items}
                        selectedItem={selectedItem}
                    />
                    <ItemList
                        items={items}
                        filterText={filterText}
                        selectedUpdate={selectedUpdate.bind(this)}
                        acc = {props.user}
                    />
                </div>)
                : (<Typography variant="h2">Nothing currently being sold.</Typography>)}
            </div>
            
        )
    }
};

export default Inventory;

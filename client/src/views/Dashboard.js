import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import AddItems from './AddItems.js'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import '../components/Header/NavBar.css'

const Dashboard = (props) => {
    const [orders, setOrders] = useState({vals: []});
    const [jobs, setJobs] = useState({vals: []});
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
                axios.get('/api/jobs/customer/'+props.user.email)
                .then(response => {
                    setJobs({ vals: response.data });
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
                axios.get('/api/jobs/volunteer')
                .then(response => {
                    setJobs({vals: response.data})
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        }
        fetchData();
    }, []);

    const acceptOrder = (orderid) => {
        axios.patch('/api/orders/volunteer/'+orderid,{email: props.user.email})
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    const cancelOrder = (orderid) => {
        axios.patch('/api/orders/cancel/'+orderid)
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    const acceptJob = (orderid) => {
        axios.patch('/api/jobs/volunteer/'+orderid,{email: props.user.email})
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    const cancelJob = (orderid) => {
        axios.patch('/api/jobs/cancel/'+orderid)
        .then(() => {
            window.location.reload();
        })
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
                            <TableCell>Customer Address: {currentOrder.address}</TableCell>
                            <TableCell><Button component={ Link } to={{pathname:"/order", state: {order: currentOrder}}} variant="contained" color="primary">View Order</Button></TableCell>
                            <TableCell><Button variant="contained" color="primary" onClick={() => {acceptOrder(currentOrder._id)}}>Accept Order</Button></TableCell>
                        </>
                    }
                    {props.user.atype === "Customer" &&
                        <>
                            <TableCell>
                                <Button component={ Link } to={{pathname:"/order", state: {order: currentOrder}}} variant="contained" color="primary" classNam="align-middle">View Order</Button>
                            </TableCell>
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

    const jobList = () => {
        return jobs.vals.map(function(currentOrder, i){
            return (
                <TableRow>
                    <TableCell>{currentOrder.title}</TableCell>
                    <TableCell>Date Placed: {new Date(currentOrder.placed).toDateString()}</TableCell>
                    <TableCell>{currentOrder.status}</TableCell>
                    {props.user.atype === "Volunteer" && 
                        <>
                            <TableCell>Customer Address: {currentOrder.address}</TableCell>
                            <TableCell><Button component={ Link } to={{pathname:"/job", state: {order: currentOrder}}} variant="contained" color="primary">View Job</Button></TableCell>
                            <TableCell><Button variant="contained" color="secondary" onClick={() => {acceptJob(currentOrder._id)}}>Accept Job</Button></TableCell>
                        </>
                    }
                    {props.user.atype === "Customer" &&
                        <>
                            <TableCell>
                                <Button component={ Link } to={{pathname:"/job", state: {order: currentOrder}}} variant="contained" color="primary">View Job</Button>
                            </TableCell>
                        </>
                    }
                    {props.user.atype === "Customer" && currentOrder.status === "placed" &&
                        <>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => {cancelJob(currentOrder._id)}}>Cancel Job</Button>
                            </TableCell>
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
                <div className='row'>
                    <div className='column1'>
                        {orders.vals.length!==0 ? 
                        (<div>
                            <Typography variant="h2">Current open deliveries:</Typography>
                            {itemList()}
                        </div>)
                        : (<Typography variant="h2">No deliveries to accept.</Typography>)}
                    </div>
                    <div className='column2'>
                        {jobs.vals.length!==0 ? 
                        (<div>
                            <Typography variant="h2">Current open jobs:</Typography>
                            {jobList()}
                        </div>)
                        : (<Typography variant="h2">No jobs to accept.</Typography>)}
                    </div>
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
    else{           // user is a Customer
        return (
            <div>
                <div align="center">
                    <Typography variant="h1">Welcome to your dashboard, {props.user.name}!</Typography>
                    <br/><br/><br/>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {orders.vals.length!==0 ? 
                            (<div>
                                <TableContainer className="Wrap">
                                    <Table className="table">
                                        <TableHead className="Head">
                                            <TableCell colspan={6}>
                                                <Typography variant="h2" align='center'>Recent orders:</Typography>
                                            </TableCell>
                                        </TableHead>
                                        
                                        <TableBody>
                                            {itemList()}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>)
                            : (<Typography variant="h2">No orders</Typography>)}
                        </Grid>

                        <Grid item xs={6}>
                            {jobs.vals.length!==0 ? 
                            (<div>
                                <TableContainer>
                                    <Table className="table">
                                        <TableHead className="Head">
                                            <TableRow>
                                                <TableCell colspan={6}>
                                                    <Typography variant="h2" align='center'>Recent jobs:</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {jobList()}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>)
                            : (<Typography variant="h2">No jobs</Typography>)}
                        </Grid>
                    </Grid>
                </div>
            </div>
            
        )
    }
};

export default Dashboard;
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

const Work = (props) => {

    const cancelOrder = (orderid) => {
        axios.patch('/api/jobs/cancel/'+orderid)
        .then(() => {
            props.history.push("/dashboard")
        })
        .catch(function (error){
            console.log(error);
        })
    };

    return (
        <div align="center">
            <TableContainer>
                <Typography variant="h1">Here is the job, {props.user.name}!</Typography>
                {props.location.state ?
                    (<div>
                    <div align='center'>Date Placed: {new Date(props.location.state.order.placed).toDateString()}</div>
                    <div align='center'>Status: {props.location.state.order.status}</div>
                    <div align='center'>Address: {props.location.state.order.address}</div>
                    <div align='center'>Type: {props.location.state.order.title}</div>
                    <div align='center'>Description: {props.location.state.order.info}</div>
                    {props.location.state.order.status === "placed" && props.user.atype === "Customer" &&
                        <>
                            <Button variant="contained" color="primary" onClick={() => {cancelOrder(props.location.state.order._id)}}>Cancel Job</Button>
                        </>
                    }</div>)
                    : (props.history.push("/store"))
                }
            </TableContainer>
        </div>
    )
};

export default Work;
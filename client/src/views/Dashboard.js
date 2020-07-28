import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import AddItems from './AddItems.js'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

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


const Dashboard = (props) => {
    const classes = useStyles();
    const [items, setItems] = useState({vals: []});

    useEffect (() => {
        async function fetchData() {
            axios.get('http://localhost:3000/api/items')
                    .then(response => {
                        setItems({ vals: response.data });
                    })
                    .catch(function (error){
                        console.log(error);
                    })
        }

        fetchData();
    });

    const itemList = () => {
        return items.vals.map(function(currentItem, i){
            return (
                <TableRow>
                    <TableCell>{currentItem.itemName}</TableCell>
                    <TableCell>{currentItem.price}</TableCell>
                    <TableCell>{currentItem.quantity}</TableCell>
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

                <TableContainer className={classes.wrap} component={Paper}>
                    <Typography variant="h3">Items List</Typography>
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
                </TableContainer>
                <Button variant ="contained" color="primary" type="submit">Cancel Order</Button>
            </div>
            
        )
    }
};

export default Dashboard;
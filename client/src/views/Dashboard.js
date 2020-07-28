import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import AddItems from './AddItems.js'

const Dashboard = (props) => {
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
                <Button variant ="contained" color="primary" type="submit">Cancel Order</Button>
            </div>
            
        )
    }
};

export default Dashboard;
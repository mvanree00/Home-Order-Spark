import React from 'react'
import Button from '@material-ui/core/Button'

const Dashboard = (props) => {
    if(props.user.atype == "Volunteer"){
        return (
            <div align="center">
                <h1>Welcome to your volunteer dashboard, {props.user.name}!</h1>
                <h1>Current open orders:</h1>
                <div align="center">
                    <Button variant ="contained" color="primary" type="submit">Accept Order</Button>
                </div>
            </div>
        )
    }
    else if(props.user.atype == "Store"){
        return (
            <div align="center">
                <h1>Welcome to your store dashboard, {props.user.name}!</h1>
                <h1>Add Inventory</h1>
                <h1>View Inventory</h1>
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <h1>Welcome to your dashboard, {props.user.name}!</h1>
                <h1>Recent Orders:</h1>
                <Button variant ="contained" color="primary" type="submit">Cancel Order</Button>
            </div>
            
        )
    }
};

export default Dashboard;
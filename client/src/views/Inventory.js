import React from 'react'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'

const Inventory = (props) => {
    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Typography variant="h1">Here are the items you are currently delivering, {props.user.name}!</Typography>
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your store inventory, {props.user.name}!</Typography>
                <Typography variant="h2">Here are the items you are currently selling</Typography>
                
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your Cart, {props.user.name}!</Typography>
                <Typography variant="h2">Items in cart</Typography>
                <Button variant ="contained" color="primary" type="submit">Go to checkout</Button>
            </div>
            
        )
    }
};

export default Inventory;

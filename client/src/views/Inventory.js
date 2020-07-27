import React from 'react'
import Button from '@material-ui/core/Button'

const Inventory = (props) => {
    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <h1>Here are the items you are currently delivering, {props.user.name}!</h1>
                
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <h1>Welcome to your store inventory, {props.user.name}!</h1>
                <h1>Here are the items you are currently selling</h1>
                
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <h1>Welcome to your Cart, {props.user.name}!</h1>
                <h1>Items in cart</h1>
                <Button variant ="contained" color="primary" type="submit">Go to checkout</Button>
            </div>
            
        )
    }
};

export default Inventory;
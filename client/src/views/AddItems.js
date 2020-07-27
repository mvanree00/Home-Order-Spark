import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import './Inventory.js'
import './AddItems.css'



const AddItems = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});


    return (

        <div align="center">
            <form>
                <h1>Welcome to your store dashboard, {props.user.name}!</h1>
                <div class="AddItem">
                    <div className="ItemName">
                        <Input type="text" placeholder="Item Name"/>
                    </div>
                    <div className="ItemPrice">
                        <Input type="text" placeholder="Price"/>
                    </div>
                    <div className="ItemInventory">
                        <Input type="text" placeholder="Number In Stock"/>
                    </div>
                    <br/>
                    <Button variant ="contained" color="primary" type="submit">Add Inventory Item</Button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;
import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import './Inventory.js'
import './AddItems.css'
import 'fontsource-roboto'
import { Link } from 'react-router-dom';


const AddItems = (props) => {
    const [fields, setFields] = useState({name: "", description: "", price: "", quantity: ""});
    
    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onUpdate = async (e) => {
        e.preventDefault();

        var item = {
            itemName: fields.name,
            description: fields.description,
            price: fields.price,
            quantity: fields.quantity
        }

        setFields({name: "", description: "", price: "", quantity: ""} );
    };
    return (

        <div align="center">
            <form onChange={onInputChange}>
                <h1>Welcome to your store dashboard, {props.user.name}!</h1>
                <div class="AddItem">
                    <div className="ItemName">
                        <Input type="text" placeholder="Item Name" name="name" value={fields.name}/>
                    </div>
                    <div className="ItemPrice">
                        <Input type="text" placeholder="Price" name="price" value={fields.price}/>
                    </div>
                    <div className="ItemInventory">
                        <Input type="text" placeholder="Number In Stock" name="quantity" value={fields.quantity}/>
                    </div>
                    <div className="Description">
                        <Input type="text" placeholder="Item Description" name="description" value={fields.description}/>
                    </div>
                    <br/>
                    <Button variant ="contained" color="primary" type="submit">Add Inventory Item</Button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;
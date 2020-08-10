import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import './Inventory.js'
import './LogIn.css'
import 'fontsource-roboto'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import {DropzoneArea} from 'material-ui-dropzone'
import {ExcelRenderer} from 'react-excel-renderer'
import './LogIn.css'

const AddItems = (props) => {
    const [fields, setFields] = useState({email: props.user.email, itemName: "", description: "", price: "", quantity: "", store: "", category: ""});
    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onUpdate = async (e) => {
        fields.store=props.user.storeName;
        e.preventDefault();
        console.log(fields);
        await httpUser.addItem(fields);
        setFields({email: props.user.email, itemName: "", description: "", price: "", quantity: "", store: "", category: ""});
    };

    const parseFile = async (e) =>{
        let template = e.target.files[0];
        console.log("Entered");
        //pass in template as parameter
        ExcelRenderer(template, (err,resp) =>{
            if(err){
                console.log(err)
            }else{
                console.log("worked")
            }
        })
    }

    return (

        <div align="center">
            <Typography variant="h1" className="Header">Welcome to your store dashboard, {props.user.name}!</Typography>
            <form onChange={onInputChange} onSubmit={onUpdate}>
                <Typography variant="h2" className="Title">Add New Item from Your Store</Typography>
                <div class="AddItem">
                    <div className="Input">
                        <Input type="text" placeholder="Item Name" name="itemName" value={fields.itemName}/>
                    </div>
                    <div className="Input">
                        <Input type="text" placeholder="Price" name="price" value={fields.price}/>
                    </div>
                    <div className="Input">
                        <Input type="text" placeholder="Number In Stock" name="quantity" value={fields.quantity}/>
                    </div>
                    <div className="Input">
                        <Input type="text" placeholder="Item Description" name="description" value={fields.description}/>
                    </div>
                    <div>
                        <NativeSelect
                            className="select"
                            value={fields.category}
                            name="category"
                        >
                            <option value="">None</option>
                            <option value="Appliance">Appliance</option>
                            <option value="Materials">Materials</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Flooring">Flooring</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Lawn">Lawn</option>
                            <option value="Paint">Paint</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Storage">Storage</option>
                            <option value="Tools">Tools</option>
                        </NativeSelect>
                    </div>
                    <br/>
                    <Button variant ="contained" color="primary" type="submit">Add Inventory Item</Button>
                    <br/>
                    
                    <div>
                        <Input type="file" onChange={parseFile}/>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddItems;
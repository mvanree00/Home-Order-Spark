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
//import {DropzoneArea} from 'material-ui-dropzone'
import readXlsxFile from 'read-excel-file'
//import {OutTable, ExcelRenderer} from 'react-excel-renderer'
import './LogIn.css'

var items = new Array();

const AddItems = (props) => {
    const [fields, setFields] = useState({email: props.user.email, itemName: "", description: "", price: "", quantity: "", store: "", category: "", img: ""});
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
        setFields({email: props.user.email, itemName: "", description: "", price: "", quantity: "", store: "", category: "", img: ""});
    };

    let parseFile = async (e) =>{
        let template = e.target.files[0];
        console.log("Entered");
        //pass in template as parameter
        if(template){
            await readXlsxFile(template).then((data) => {
                // `data` is an array of rows
                // each row being an array of cells.
                let i = 1;
                while(data[i][0] != null){
                    let item = {
                        email: props.user.email,
                        itemName: data[i][0],
                        description: data[i][1],
                        price: data[i][2],
                        quantity: data[i][3],
                        store: props.user.storeName,
                        category: data[i][4],
                        img: data[i++][5]
                    }
                    items.push(item)
                    console.log(item)
                }
            })
        }
    }

    let uploadFile = async (e) =>{
            for(var x = 0;x < items.length; x++){
                await httpUser.addItem(items[x])
            }
    }

    return (

        <div align="center">
            <Typography variant="h1" className="Header">Welcome to your store dashboard, {props.user.name}!</Typography>
            <form onChange={onInputChange} onSubmit={onUpdate}>
                <Typography variant="h2" className="Title">Add New Item from Your Store</Typography>
                <div className="AddItem">
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
                    <div className="Input">
                        <Input type="text" placeholder="Image" name="img" value={fields.img}/>
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
                    <br/>
                    <a href='ItemTemplate.xlsx' download>Sample SpreadSheet</a>
                    <br/>
                    <div>
                        <Input type="file" onChange={parseFile}/>
                    </div>
                    <br/>
                    <Button variant ="contained" color="primary" type="submit" onClick={uploadFile}>Upload Spreadsheet</Button>
                    <br/>
                </div>
            </form>
        </div>
    );
};

export default AddItems;
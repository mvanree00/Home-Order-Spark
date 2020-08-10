import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import './LogIn.css'
import 'fontsource-roboto'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const activationCode = process.env.activation || require('../code.js').activation;
 
const SignUp = (props) => {
    const [fields, setFields] = useState({name: '', email: "", password: "", atype: "Customer", storeName: "", address: "", activation:""});
    const [colors, setColors] = useState([false,false,true])
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };
 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if(fields.atype == "Customer"){
            fields.storeName=fields.storeName+" "+fields.address;
            const user = await httpUser.signUp(fields);
     
            setFields({name: '', email: "", password: "", atype: "Customer", storeName: "", address: "", activation:""});
            if(user) {
                props.onSignUpSuccess(user);
                props.history.push('/');
            }
            else{
                setMessage('Email already in use!')
                handleClickOpen();
            }
        }
        else if(fields.activation == activationCode){
            fields.storeName=fields.storeName+" "+fields.address;
            const user = await httpUser.signUp(fields);
     
            setFields({name: '', email: "", password: "", atype: "Customer", storeName: "", address: "", activation:""});
            if(user) {
                props.onSignUpSuccess(user);
                props.history.push('/');
            }
            else{
                setMessage('Email or store name already in use!');
                handleClickOpen();
            }
        }else{
            handleClickOpen();
            setMessage('Invalid Activation Code!')
            setFields({activation:""});
        }
    };
 
    const getColor = (index) => {
        return colors[index] ? "primary" : "disabled"
    }

    const setVals = (index) => {
        colors.fill(false);
        colors[index]=true;
    }

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Invalid Credentials!</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Retry
                </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h1" className="Header">Sign Up</Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <div className="Input">
                    <Input type="text" placeholder="Name" name="name" value={fields.name} />
                </div>
                <div className="Input">
                    <Input type="text" placeholder="Email" name="email" value={fields.email} />
                </div>
                <div className="Input">
                    <Input type="text" placeholder="Address" name="address" value={fields.address} />
                </div>
                <div className="Input">
                    <Input type="password" placeholder="Password" name="password" value={fields.password} />
                </div>
 
                <div align="center">
                    <ButtonGroup variant="contained" onClick={onInputChange}>
                        <Button color={getColor(0)} onClick={() => {fields.atype="Volunteer";setVals(0)}}>Volunteer</Button>
                        <Button color={getColor(1)} onClick={() => {fields.atype="Store";setVals(1)}}>Store Owner</Button>
                        <Button color={getColor(2)} onClick={() => {fields.atype="Customer";setVals(2)}}>Customer</Button>
                    </ButtonGroup>
                </div>
                
                {
                    (fields.atype === "Store" || fields.atype === "Volunteer") &&
                        <>
                            <div className="Input">
                                <Input type="text" placeholder="Activation Code" name="activation" value={fields.activation}/>
                            </div>
                        </>
                }
 
                {
                    fields.atype === "Store" &&
                        <>
                            <div className="Input">
                                <Input type="text" placeholder="Store Name" name="storeName" value={fields.storeName} />
                            </div>
                        </>
                }
 
                <div className = "button" >
                    <Button variant ="contained" color="primary" type="submit">Sign Up</Button>
                </div>
            </form>
        </div>
    )
};
 
export default SignUp;
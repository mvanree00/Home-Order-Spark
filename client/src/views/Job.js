import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ReactPasswordStrength from 'react-password-strength'
import './LogIn.css'
import 'fontsource-roboto'

 
const Job = (props) => {
    const [fields, setFields] = useState({status: '', email: props.user.email, placed: '', address: props.user.address, title: '', info: ''});
    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };
 
    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        fields.status='placed'
        fields.placed = new Date
        if(fields.address.length==0){
            fields.address=props.user.address
        }
        await httpUser.addJob(fields);
        setFields({status: '', email: props.user.email, placed: '', address: props.user.address, title: '', info: ''});
        props.history.push('/dashboard');
    };
 
    return(
        <div>
            <Typography variant="h1" className="Header">Submit Work Order</Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <div className="Input">
                    <Input type="text" placeholder="Work Category" name="title" value={fields.title} />
                </div>
                <div className="Input">
                    <textarea name="info" placeholder="Full Work Description" rows="4" cols="50" value={fields.info} />
                </div>
                <div className = "button" >
                    <Button variant ="contained" color="primary" type="submit">Submit Job</Button>
                </div>
            </form>
        </div>
    )
};
 
export default Job;
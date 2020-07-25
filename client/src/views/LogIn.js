import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import './LogIn.css'
import 'fontsource-roboto'

const inputStyle = {
    align: "center",
    marginBottom: "10px"
};

const LogIn = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.logIn(fields);

        setFields({email: '', password: ''} );
        if(user) {
            console.log('hello');
            props.onLoginSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <div>
            <Typography variant="h1" className="Header">Home Order</Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <div className="Input">
                    <Input type="text" placeholder="Email" name="email" value={fields.email} />
                </div>
                <br/>
                <div className="Input">
                    <Input type="password" placeholder="Password" name="password" value={fields.password} />
                </div>
                <div align="center">
                    <Button variant ="contained" color="primary">Log In</Button>
                </div>
                <div>
                    <Typography className="Text">
                        <Typography to="/signup">Don't have an account?</Typography>
                        <Link to="/signup"> Sign up</Link>
                    </Typography>
                </div>
            </form>
        </div>
    )
};

export default LogIn;
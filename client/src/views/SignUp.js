import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ReactPasswordStrength from 'react-password-strength'
import './LogIn.css'
import 'fontsource-roboto'

const SignUp = (props) => {
    const [fields, setFields] = useState({name: '', email: "", password: "", atype: "Customer"});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.signUp(fields);

        setFields({name: '', email: '', password: '', atype: "Customer"} );
        if(user) {
            props.onSignUpSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <div>
            <Typography variant="h1" className="Header">Sign Up</Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <div className="Input">
                    <Input type="text" placeholder="Name" name="name" value={fields.name} />
                </div>
                <div className="Input">
                    <Input type="text" placeholder="Email" name="email" value={fields.email} />
                </div>
                <div className="Input">
                    <Input type="password" placeholder="Password" name="password" value={fields.password} />
                </div>

                {/*<ReactPasswordStrength 
                    minLength={5}
                    minScore={2}
                    scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                />*/}
                
                <div align="center">
                    <ButtonGroup color="primary">
                        <Button onClick={() => {fields.atype="Volunteer"}}>Volunteer</Button>
                        <Button onClick={() => {fields.atype="Store"}}>Store Owner</Button>
                    </ButtonGroup>
                </div>
                <a></a>
                <div align="center">
                    <Button variant ="contained" color="primary" type="submit">Sign Up</Button>
                </div>
            </form>
        </div>
    )
};

export default SignUp;
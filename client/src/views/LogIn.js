import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import './LogIn.css'
import 'fontsource-roboto'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const inputStyle = {
    align: "center",
    marginBottom: "10px"
};

const LogIn = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});
    const [open, setOpen] = useState(false);

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
        const user = await httpUser.logIn(fields);

        setFields({email: '', password: ''} );
        if(user) {
            await props.onLoginSuccess(user);
            props.history.push('/');
            window.location.reload();
        }
        else{
            handleClickOpen();
        }
    };

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
                        Incorrect username or password.
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Retry
                </Button>
                </DialogActions>
            </Dialog>
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
                    <Button variant ="contained" color="primary" type="submit">Log In</Button>
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
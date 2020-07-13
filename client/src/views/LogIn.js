import React, {useState} from 'react'
import httpUser from '../httpUser'

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
            props.onLoginSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <div>
            <h1>Log In Page</h1>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <input type="text" placeholder="Email" name="email" value={fields.email} />
                <input type="password" placeholder="Password" name="password" value={fields.password} />
                <button>Log In</button>
            </form>
        </div>
    )
};

export default LogIn;
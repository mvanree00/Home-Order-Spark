import React, {useState} from 'react'
import httpUser from '../httpUser'

const SignUp = (props) => {
    const [fields, setFields] = useState({name: '', email: "", password: ""});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.signUp(fields);

        setFields({name: '', email: '', password: ''} );
        if(user) {
            props.onSignUpSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <div>
            <h1>Sign Up Page</h1>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <input type="text" placeholder="Name" name="name" value={fields.name} />
                <input type="text" placeholder="Email" name="email" value={fields.email} />
                <input type="password" placeholder="Password" name="password" value={fields.password} />
                <button>Sign Up</button>
            </form>
        </div>
    )
};

export default SignUp;
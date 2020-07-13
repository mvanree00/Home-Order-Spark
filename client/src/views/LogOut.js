import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const LogOut = (props) => {
    useEffect(() => {
        props.onLogOut();
    }, []);

    return <Redirect to="/login" />
};

export default LogOut;
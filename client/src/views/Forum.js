import React, {useState,useEffect} from 'react'
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
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

 
const Forum = (props) => {
    const [fields, setFields] = useState({status: '', email: props.user.email, placed: '', title: '', info: ''});
    const [posts, setPosts] = useState({vals: []})
    // used to update user input for either password or email
    useEffect (() => {
        async function fetchData() {
            if(props.user.atype!=="Customer"){
                axios.get('/api/forum/all')
                .then(response => {
                    setPosts({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
            else{
                axios.get('/api/forum/customer/'+props.user.email)
                .then(response => {
                    setPosts({ vals: response.data });
                })
                .catch(function (error){
                    console.log(error);
                })
            }
            }
        fetchData();
    }, []);

    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };
 
    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        fields.status='unanswered'
        fields.placed = new Date
        await httpUser.addPost(fields);
        setFields({status: '', email: props.user.email, placed: '', title: '', info: ''});
        props.history.push('/dashboard');
    };

    const completePost = (orderid) => {
        axios.patch('/api/forum/completed/'+orderid)
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    return(
        <div>
            <Typography variant="h1" className="Header">Create Post</Typography>
            <form onChange={onInputChange} onSubmit={onFormSubmit}>
                <div className="Input">
                    <Input type="text" placeholder="Title" name="title" value={fields.title} />
                </div>
                <div className="Input">
                    <textarea name="info" placeholder="Description" rows="4" cols="50" value={fields.info} />
                </div>
                <div className = "button" >
                    <Button variant ="contained" color="primary" type="submit">Create Post</Button>
                </div>
            </form>
            <Typography variant="h1" className="Header">Posts</Typography>
            {posts.vals.map(currentPost => {
                return (
                    <div align="center">
                        <TableBody>
                            <TableRow>
                                <TableCell>{new Date(currentPost.placed).toDateString()}</TableCell>
                                <TableCell>{currentPost.status}</TableCell>
                                <TableCell>{currentPost.title}</TableCell>
                                <TableCell><Button component={ Link } to={{pathname:"/post", state: {post: currentPost}}} variant="contained" color="primary">View Posting</Button></TableCell>
                                {currentPost.status !== "Answered" && props.user.atype !== "Customer" &&
                                    <>
                                        <TableCell><Button variant="contained" color="primary" onClick={() => {completePost(currentPost._id)}}>Answered</Button></TableCell>
                                    </>
                                }
                            </TableRow>
                        </TableBody>
                    </div>
                )
            })}
        </div>
    )
};
 
export default Forum;
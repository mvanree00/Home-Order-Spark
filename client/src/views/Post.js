import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto'
import axios from 'axios'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Post = (props) => {
    const [fields, setFields] = useState({comment: ''})
    const [comments, setComments] = useState([])
    useEffect (() => {
        async function fetchData() {
            if(props.location.state){
                axios.get('/api/forum/comments/'+props.location.state.post._id)
                .then(response => {
                    setComments(response.data[0].comments);
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
    const commentSubmit = async (e) => {
        axios.patch('/api/forum/comment/'+props.location.state.post._id+':'+fields.comment)
        .then(() => {
            window.location.reload();
        })
        .catch(function (error){
            console.log(error);
        })
    };

    return (
        <div align="center">
            <TableContainer>
                {props.location.state ?
                    (<div>
                    <div align='center'>{props.location.state.post.title}</div>
                    <div align='center'>{props.location.state.post.info}</div>
                    <div align='center'>{new Date(props.location.state.post.placed).toDateString()}</div>
                    <div align='center'>{props.location.state.post.status}</div>
                    </div>)
                    : (props.history.push('/forum'))
                }
            </TableContainer>

            <form onChange={onInputChange}>
                <div className="Input">
                    <textarea name="comment" placeholder="Reply" rows="4" cols="50" value={fields.comment} />
                </div>
            </form>

            <Button variant="contained" color="primary" type="submit" onClick={() => {commentSubmit()}}>Comment</Button>

            {comments.map(current => {
                return(<div>{current}</div>)
             })}

        </div>
    )
};

export default Post;
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
import './Post.css'

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
                        <Typography align='center' variant="h2">{props.location.state.post.title}</Typography>
                        <div className="message">
                            <Typography align='center' className="content">{props.location.state.post.info}</Typography>
                            <br/>
                            <br/>
                            <br/>
                            <Typography align='center' variant="subtitle1">{new Date(props.location.state.post.placed).toDateString()}</Typography>
                            <Typography align='center' vairant="subtitle1">{props.location.state.post.status}</Typography>
                        </div>
                    </div>)
                    : (props.history.push('/forum'))
                }
            </TableContainer>

            

            {comments.map(current => {
                return(<Typography className="comment">{current}</Typography>)
             })}

            <br/>
            <br/>
            <br/>
            <form onChange={onInputChange}>
                <div className="Input">
                    <textarea name="comment" placeholder="Reply" rows="4" cols="50" value={fields.comment} />
                </div>
            </form>
            <Button variant="contained" color="primary" type="submit" onClick={() => {commentSubmit()}}>Comment</Button>
        </div>
    )
};

export default Post;
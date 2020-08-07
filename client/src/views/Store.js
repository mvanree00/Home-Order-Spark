import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import httpUser from '../httpUser'
import Search from './Search.js';
import ItemList from './ItemList.js';
import StoreList from './StoreList.js';
import ViewItem from './ViewItem.js';

const Store = (props) => {
    const [filterText, setFilterText] = useState('');
    const [stores, setStores] = useState({vals: []});

    useEffect (() => {
        async function fetchData() {
            axios.get('/api/users/stores')
                    .then(response => {
                        setStores({ vals: response.data });
                    })
                    .catch(function (error){
                        console.log(error);
                    })
            }
        fetchData();
    }, []);

    const filterUpdate = (value) => {
        //Here you can set the filterText property of state to the value passed into this function
        setFilterText(value)
    };

    const selectedUpdate = (id) => {
        //Here you can update the selectedItem property of state to the id passed into this function
        props.history.push({pathname: '/inventory', state: {email: id}})
    };

    return (
        <div align="center">
            <Typography variant="h3">Pick a store location.</Typography>
            {stores ?
            (<div>
                <Search filterText={filterText} filterUpdate={filterUpdate.bind(this)}/>
                <StoreList
                    items={stores}
                    filterText={filterText}
                    selectedUpdate={selectedUpdate.bind(this)}
                    acc = {props.user}
                />
            </div>)
            : (<Typography variant="h2">Currently no stores.</Typography>)}
        </div>
        
    )
};

export default Store;

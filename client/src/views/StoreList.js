import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import httpUser from '../httpUser';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const useStyles = makeStyles({
    table: {
      minWidth: 700,
      backgroundColor: "#DCDCDC",
      //width: "80%",
    },
    wrap: {
      minWidth: 700,
      width: "80%",
    },
    head: {
        backgroundColor: "#85D7C7",
    }
});

const StoreList = (props) => {
    //console.log('This is my currentItem file', this.props.data);
    const classes = useStyles();
    const [item,setItem] = useState(0)
    useEffect (() => {
        async function fetchData() {
            axios.get('/api/carts/'+props.acc.email)
            .then(response => {
                if(response.data.length>=1){
                    axios.get('/api/items/search/'+response.data[0].prodId)
                    .then(response => {
                        setItem(response.data)
                    })
                }
            })
            .catch(function (error){
                console.log(error);
            })
        }
        fetchData();
    }, []);

    function compareStore(a,b){
        let comparison = 0;
        if(a.storeName !== undefined && b.storeName != undefined)
        {
    const storeA = a.storeName.toUpperCase();
        const storeB = b.storeName.toUpperCase();
        if(storeA>storeB){
            comparison = 1;
        }else if (storeA<storeB)
        {
            comparison = -1;
        }
        return comparison;
        }
        }
        
        
        

    const handleStoreSort=()=>{
        const itemSort = props.items.vals;
        itemSort.sort(compareStore);
    }

    {console.log(item)}
    if(!item){
        const itemList = props.items.vals
        .filter(currentItem => {
            return currentItem.storeName.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
        })
        return (
            <TableContainer className={classes.wrap} component={Paper}>
                <Table className={classes.table} >
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell onClick={()=> handleStoreSort()} onUpdate={()=>props.selectedUpdate()}> Store</TableCell>
                        </TableRow>
                    </TableHead>
                    {itemList.map(currentItem => {
                        return (
                            <TableBody>
                                <TableRow onClick={() => props.selectedUpdate(currentItem.email)}>
                                    <TableCell>{currentItem.storeName}</TableCell>
                                </TableRow>
                            </TableBody> 
                        )
                    })}
                </Table>
            </TableContainer>
        );
        return <div>{itemList}</div>;
    }
    else if(item){
        return(
            <TableContainer className={classes.wrap} component={Paper}>
                <Table className={classes.table} >
                    <TableHead className={classes.head}>
                        <TableRow>
                        <TableCell onClick={()=> handleStoreSort()} onUpdate={()=>props.selectedUpdate()}> Store</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onClick={() => props.selectedUpdate(item.email)}>
                            <TableCell>{item.store}</TableCell>
                        </TableRow>
                    </TableBody> 
                </Table>
            </TableContainer>
        )
    }
    else{
        return <div></div>;
    }
};
export default StoreList;
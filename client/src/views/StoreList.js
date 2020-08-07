import React,{useState} from 'react';
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

    if(props.items.vals.length>0){
        const itemList = props.items.vals
        .filter(currentItem => {
            return currentItem.storeName.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
        })
        return (
            <TableContainer className={classes.wrap} component={Paper}>
                <Table className={classes.table} >
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell>Store</TableCell>
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
    else{
        return <div></div>;
    }
};
export default StoreList;
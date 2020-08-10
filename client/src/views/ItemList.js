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
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const ItemList = (props) => {
    //console.log('This is my currentItem file', this.props.data);
    const [fields, setFields] = useState({email: props.acc.email, prodId: '', quantity: 1});
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const onUpdate = async(e) => {
        await axios.post('/api/carts', fields)
        .then((response) =>{
            if(response.data.success){
                window.location.reload();
            }
            else{
                handleClickOpen();
            }
        })
        setFields({email: props.acc.email, prodId: '', quantity: 1});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if(props.items.vals.length>0){
        const itemList = props.items.vals
        .filter(currentItem => {
            return currentItem.itemName.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
        })
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Item is already in cart!</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can change quantity in cart.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
                <TableContainer className={classes.wrap} component={Paper}>
                    <Table className={classes.table} >
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                {props.acc.atype === "Store" &&
                                    <>
                                        <TableCell>Quantity</TableCell>
                                    </>
                                }
                                {props.acc.atype === "Customer" &&
                                    <>
                                        <TableCell>Store</TableCell>
                                        <TableCell> </TableCell>
                                    </>
                                }
                            </TableRow>
                        </TableHead>
                        {itemList.map(currentItem => {
                            return (
                                <TableBody>
                                    <TableRow onClick={() => props.selectedUpdate(currentItem._id)}>
                                        <TableCell>{currentItem.itemName}</TableCell>
                                        <TableCell>${currentItem.price}</TableCell>
                                        {props.acc.atype === "Store" &&
                                            <>
                                                <TableCell>{currentItem.quantity}</TableCell>
                                            </>
                                        }
                                        {props.acc.atype === "Customer" &&
                                            <>
                                                <TableCell>{currentItem.store}</TableCell>
                                                <TableCell><Button variant ="contained" color="primary" onClick={() => {fields.prodId=currentItem._id;onUpdate()}}>Add To Cart</Button></TableCell>
                                            </>
                                        }
                                    </TableRow>
                                </TableBody>
                                
                            )
                        })}
                    </Table>
                </TableContainer>
            </div>
        );
        return <div>{itemList}</div>;
    }
    else{
        return <div></div>;
    }
};
export default ItemList;

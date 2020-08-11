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


function compareName(a,b){
const nameA = a.itemName.toUpperCase();
const nameB = b.itemName.toUpperCase();

let comparison = 0;
if(nameA>nameB){
    comparison = 1;
}else if (nameA<nameB)
{
    comparison = -1;
}
return comparison;
}

function comparePrice(a,b){
const priceA = a.price;
const priceB = b.price;

let comparison = 0;
if(priceA>priceB){
    comparison = 1;
}else if (priceA<priceB)
{
    comparison = -1;
}
return comparison;
}

function compareQuantity(a,b){
    const quantA = a.quantity;
const quantB = b.quantity;

let comparison = 0;
if(quantA>quantB){
    comparison = 1;
}else if (quantA<quantB)
{
    comparison = -1;
}
return comparison;

}

function compareCategory(a,b){
    const catA = a.category.toUpperCase();
const catB = b.category.toUpperCase();

let comparison = 0;
if(catA>catB){
    comparison = 1;
}else if (catA<catB)
{
    comparison = -1;
}
return comparison;

}

function compareStore(a,b){
    const storeA = a.storeName.toUpperCase();
const storeB = b.storeName.toUpperCase();

let comparison = 0;
if(storeA>storeB){
    comparison = 1;
}else if (storeA<storeB)
{
    comparison = -1;
}
return comparison;
}



    const handleNameSort = () => {
        const itemSort = props.items.vals;
    itemSort.sort(compareName);
   // console.log(itemSort);

    }

    const handlePriceSort = () =>{
const itemSort = props.items.vals;
    itemSort.sort(comparePrice);
   // console.log(itemSort);
    }

    const handleQuantitySort=()=>
    {
const itemSort = props.items.vals;
    itemSort.sort(compareQuantity);
    //console.log(itemSort);
    }

    const handleCategorySort=()=>{
        const itemSort = props.items.vals;
        itemSort.sort(compareCategory);
    }

    const handleStoreSort=()=>{
        const itemSort = props.items.vals;
        itemSort.sort(compareStore);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

const handleRemove=(itemId)=>{
    props.items.vals.splice(props.items.vals.indexOf(itemId));

}

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
                            <TableCell  onClick={()=> handleNameSort()} onUpdate={()=> props.selectedUpdate()}></TableCell>
                                <TableCell  onClick={()=> handleNameSort()} onUpdate={()=> props.selectedUpdate()}>Name</TableCell>
                                <TableCell onClick={()=> handlePriceSort()} onUpdate={()=> props.selectedUpdate()}>Price</TableCell>
                                {props.acc.atype === "Store" &&
                                    <>
                                        <TableCell onClick={()=> handleQuantitySort()} onUpdate={()=>props.selectedUpdate()}>Quantity</TableCell>
                                    </>
                                }
                                {props.acc.atype === "Customer" &&
                                    <>
                                        <TableCell onClick={()=> handleStoreSort()} onUpdate={()=>props.selectedUpdate()}>Store</TableCell>
                                        
                                    </>
                                }
                            </TableRow>
                        </TableHead>
                        {itemList.map(currentItem => {
                            return (
                                <TableBody>
                                    <TableRow onClick={() => props.selectedUpdate(currentItem._id)}>
                                        {currentItem.img!==undefined ?
                                        (<TableCell><img className="img" src={currentItem.img}/></TableCell>)
                                        : (<TableCell></TableCell>)}
                                        <TableCell>${currentItem.price}</TableCell>
                                        {props.acc.atype === "Store" &&
                                            <>
                                                <TableCell>{currentItem.quantity}</TableCell>
                                                <TableCell><Button variant = "contained" color="primary" onClick={()=>{handleRemove(currentItem._id)}} onUpdate={()=>props.selectedUpdate()}>Delete</Button></TableCell>
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

import React from 'react'
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

const TAX_RATE = 0.07;

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

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Screws', 100, 1.15),
  createRow('2x4 Planks', 10, 3.99),
  createRow('Drill', 2, 24.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const Inventory = (props) => {
    const classes = useStyles();

    if(props.user.atype === "Volunteer"){
        return (
            <div align="center">
                <Typography variant="h1">Here are the items you are currently delivering, {props.user.name}!</Typography>
            </div>
        )
    }
    else if(props.user.atype === "Store"){
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your store inventory, {props.user.name}!</Typography>
                <Typography variant="h2">Here are the items you are currently selling</Typography>
                
            </div>
        )
    }
    else{
        return (
            <div align="center">
                <Typography variant="h1">Welcome to your Cart, {props.user.name}!</Typography>
                <Typography variant="h2">Items in cart</Typography>
                <TableContainer className={classes.wrap} component={Paper}>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant ="contained" color="primary" type="submit">Go to checkout</Button>
            </div>
            
        )
    }
};

export default Inventory;

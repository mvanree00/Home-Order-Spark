import React, {useState} from 'react'
import httpUser from '../httpUser'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import './LogIn.css'
import 'fontsource-roboto'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const inputStyle = {
    align: "center",
    marginBottom: "10px"
};

const FAQ = (props) => {
return(
     <div>
          <Typography variant="h1" className="Header">FAQ</Typography>
          <Typography variant="h3" className="Header"> What is HomeOrder?</Typography>
          <Typography  className="Text"> Home Order is a web application that allows for customers to order Home improvement and DIY supplies without leaving the comfort of their homes. </Typography>
          <Typography variant="h3" className="Header"> Help! What's the difference between volunteer, customer and store owner?</Typography>
          <Typography  className="Text"> Volunteer, Customer, and Store OWner are key words to describe the account type. If you're looking to purchase items, then select the customer option. If you're someone who wants to volunteer their time to helping others, then select the volunteer option. If you are a store owner looking to upload your product to this website, then select store owner.</Typography>
          <Typography variant="h3" className="Header"> What is an activation code?</Typography>
          <Typography  className="Text"> When connecting to this service as a volunteer or a store owner, you should have recieved an activation code. This is to identify you as a unique account.</Typography>
          <Typography variant="h2" className="Header"> Questions pertaining to the Customer Account</Typography>
          <Typography variant="h3" className="Header"> I'm a customer. How do I order supplies?</Typography>
          <Typography  className="Text"> After creating a customer account, navigate to the store tab using the navigation bar at the top right. Once there, select a store to shop in and add items to your cart. You can use the browser back key to return to the list of all stores. </Typography>
          <Typography variant="h3" className="Header"> What is the dashboard?</Typography>
          <Typography  className="Text"> The customer dashboard will show you any recent orders and jobs that you have created. From this screen, you will be able to click on either to view them for more details. </Typography>       
          <Typography variant="h3" className="Header"> How can I view my cart?</Typography>
          <Typography  className="Text"> Naviagate to the Cart tab to view your cart. You can delete items not needed anymore from there.</Typography>
          <Typography variant="h3" className="Header"> How can I review my order?</Typography>
          <Typography  className="Text"> On your dashboard, found using the Orders tab, your recent order will be viewable at the top of the page. </Typography>
          <Typography variant="h3" className="Header"> What is the Create Job Tab?</Typography>
          <Typography  className="Text"> If you have any work or home improvements that need to be done, creating a work order/job will allow volunteers to come and assist you. To create a job, navigate to the Create Job tab. Once on the new screen, provide the work categroy and full description of the job. Once the job is submitted, a volunteer will be in contact shortly.</Typography>
          <Typography variant="h3" className="Header"> Where can I find jobs I've created?</Typography>
          <Typography  className="Text"> On your dashboard, under current order, you will find your current open jobs.  </Typography>
          <Typography variant="h2" className="Header"> Questions pertaining to the Volunteer Account</Typography>
          <Typography variant="h3" className="Header"> I'm a volunteer. What is my dashboard?</Typography>
          <Typography  className="Text"> As a volunteer, your dashboard will show you any open deliveries or open jobs. You will be able to accept and view orders from this screen.  </Typography>
          <Typography variant="h3" className="Header"> Where can I find open jobs?</Typography>
          <Typography  className="Text"> Open jobs will be viewable from the dashboard as well as the Accept Orders tab. </Typography>
          <Typography variant="h3" className="Header"> How do i accept them?</Typography>
          <Typography  className="Text"> In the Accept Orders tab, there is a button to accept the order.  </Typography>
          <Typography variant="h3" className="Header"> Where do I find the customer's information?</Typography>
          <Typography  className="Text"> In the view orders screen, the customer's information is located at the top.   </Typography>
          <Typography variant="h3" className="Header"> Where can I mark them complete?</Typography>
          <Typography  className="Text"> In the current orders tab, click on the delivered button.  </Typography>
          <Typography variant="h3" className="Header"> I can't complete an order. How do I cancel it?</Typography>
          <Typography  className="Text"> In the view orders screen, under the items list, click on the cancel order button.  </Typography>
          <Typography variant="h2" className="Header"> Questions pertaining to the Store Owner Account</Typography>
          <Typography variant="h3" className="Header"> I'm a store owner? How do I add to my inventory?</Typography>
          <Typography  className="Text"> On your dashboard is multiple input field if you want to add just one item. Alternatively, uploading a .xlsx (an excel) file will upload multiple items at once.   </Typography>
          <Typography variant="h3" className="Header"> How do I add multiple items to my inventory?</Typography>
          <Typography  className="Text"> Under the input fields is an option to upload a .xlsx (an excel) document.  </Typography>
          <Typography variant="h3" className="Header"> How can I view my inventory?</Typography>
          <Typography  className="Text"> Your store's inventory can be viewed from the Store Inventory tab.  </Typography>
          <Typography variant="h3" className="Header"> How can i delete from my inventory?</Typography>
          <Typography  className="Text"> In the Store Inventory tab, in the right most column of the table is the delete button. Simply click the button in the row you wish to delete.    </Typography>
          <Typography variant="h2" className="Header"> Questions pertaining to the Forum</Typography>
          <Typography variant="h3" className="Header">What is the forum?</Typography>
          <Typography  className="Text"> The forum is a message board system where people can post their questions and anyone is able to answer them.    </Typography>
          <Typography variant="h3" className="Header"> How do I create a post?</Typography>
          <Typography  className="Text"> Navigate to the Forum tab using the button at the top right of the screen. From there, write your question and click post. If someone has answered your post to your satisfaction, click on answered from the View Post screen to close out the question. </Typography>
          <Typography variant="h3" className="Header"> How do I respond to a post?</Typography>
          <Typography  className="Text"> Recent posts will automatically show up on the front page of the forum. Click on View Posting to be taken to another screen where you can enter your comment and post it.  </Typography>
     </div>
)};

export default FAQ;
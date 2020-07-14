/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
const accountSchema = new mongoose.Schema({
  /* Your code for a schema here */
  //Check out - https://mongoosejs.com/docs/guide.html
  username: {type:String, required: true},
  password: {type:String, required: true},
  name: {type:String}, 
  address: {type:String}
  
});

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('accounts', accountSchema);
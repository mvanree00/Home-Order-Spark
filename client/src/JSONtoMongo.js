'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
import * as fs from 'fs';
import mongoose from 'mongoose';
import Accounts from './accountSchema.js';
import config from './config.js';

let listingData, doc1;

/* Connect to your database using mongoose */
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
fs.readFile('accounts.json', 'homeorder', (err, data) => {
    
    // Check for errors
	if(err){
		console.log("error");
		throw err;
	}
	//console.log(typeof(data)); = string

	//JSON object
	listingData = JSON.parse(data);

	//Schema
	var listModel1 = Accounts.accountSchema;

	//compiled to model
	var AccountList = mongoose.model('accounts', listModel1);

//populates the database with the entry from accountSchema
	for(let j = 0; j<listingData['entries'].length;j++){
		doc1 = new AccountList(listingData['entries'][j]);
		doc1.save(function(err,doc) {
		if(err) return console.error(err);
		});
	}
	
});

//mongoose.connect(config.db.uri, {useNewUrlParser: true});

var db1 = mongoose.connection;

db1.on('error', console.error.bind(console, 'connection error:'));
db1.once('open',function(){
	console.log("connection success");
});




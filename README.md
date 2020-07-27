On first installation:
## npm install
## npm run-script install-all
To start development version:
## npm run dev
Runs frontend and backend, make sure to add config folder with config.js as follows into the server folder.
## module.exports = {
##     db: {
##         uri: 'put uri with db and password filled out', //place the URI of your mongo database here.
##     },
##     secret: 'can mash your keyboard with random characters'
## };

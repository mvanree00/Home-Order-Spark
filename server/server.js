const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRouter = require('./routes/users.js'),
    itemRouter = require('./routes/items.js'),
    cartRouter = require('./routes/carts.js'),
    jobRouter = require('./routes/jobs.js'),
    orderRouter = require('./routes/orders.js'),
    postRouter = require('./routes/posts.js');
// Use env port or default
const port = process.env.PORT || 5000;

// Connect to database
mongoose.connect(process.env.DB_URI || require('./config/config.js').db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// initialize app
const app = express();
// enable request logging for development debugging
app.use(morgan('dev'));
// body parsing middleware
app.use(bodyParser.json());
// add a router
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/forum', postRouter);
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server now running on port ${port}!`));

const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
const mongo = require('mongodb');
const router = express.Router();
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

var app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors({ origin: 'http://localhost:4200' }));
app.listen(3000, () => console.log("Server starts at port: 3000"));

var accountController = require('./controllers/accountController');
var shoesController = require('./controllers/shoesController');
var categoryController = require('./controllers/categoryController');
var makerController = require('./controllers/makerController');
var originController = require('./controllers/originController');
var supplierController = require('./controllers/supplierController');
var userController = require('./controllers/userController');
var cartController = require('./controllers/cartController');
var orderController = require('./controllers/orderController');
var colorController = require('./controllers/colorController');
var sizeController = require('./controllers/sizeController');
var uploadController = require('./controllers/uploadController');

app.use('/accounts', accountController);
app.use('/shoes', shoesController);
app.use('/categories', categoryController);
app.use('/makers', makerController);
app.use('/origins', originController);
app.use('/suppliers', supplierController);
app.use('/users', userController);
app.use('/carts', cartController);
app.use('/orders', orderController);
app.use('/colors', colorController);
app.use('/sizes', sizeController);
app.use('/upload', uploadController);

app.use(express.static('public'));
app.use('/images/shoes', express.static(__dirname + '/public/images/shoes'));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
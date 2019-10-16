const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
const mongo = require('mongodb');
const router = express.Router();
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.listen(3000, () => console.log("Server starts at port: 3000"));

var accountController = require('./controllers/accountController');

app.use('/accounts', accountController);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
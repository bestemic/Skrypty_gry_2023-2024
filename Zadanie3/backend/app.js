const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const cors = require('cors');

const categoriesRouter = require('./api/v1/routes/categories');
const {productsRouter} = require('./api/v1/routes/products');
const paymentRouter = require('./api/v1/routes/payments');


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API v1 path
const api_path_v1 = '/api/v1';

app.use(api_path_v1 + '/categories', categoriesRouter);
app.use(api_path_v1 + '/products', productsRouter);
app.use(api_path_v1 + '/payments', paymentRouter);

module.exports = app;
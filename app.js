require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const handleErrors = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const limiter = require('./middlewares/reteLimiter');

const app = express();
const MONGODB_ADDRESS_DEVELOP = require('./utils/mongodbAdress');

const {
  PORT = 3000,
  MONGODB_ADDRESS = MONGODB_ADDRESS_DEVELOP,
} = process.env;

const allowedCors = [
  'https://movies.kamelianov.nomoredomains.sbs',
  'http://movies.kamelianov.nomoredomains.sbs',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

mongoose.connect(MONGODB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

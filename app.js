const express = require('express');

const morgan = require('morgan');

const app = express();

//Middleware

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //request logger
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('hello from server side');
});

//Routes

module.exports = app;

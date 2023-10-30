const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

dotenv.config({ path: './config.env' });
// DEFINE THE SERVER
const app = express();
// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //MIDDLEWARE THAT PARSES JSON REQUESTS

// IF I WANT TO DELIVER STATIC FILES USE THIS MIDDLEWARE
// app.use(express.static(`${__dirname}/public`));

// CUSTOM MIDDLEWARE APPLIED TO ALL ROUTES
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
// MIDDLEWARE TO GET REQUEST TIME
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ******* ROUTES *******
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;

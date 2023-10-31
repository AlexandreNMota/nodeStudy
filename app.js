const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// DEFINE THE SERVER
const app = express();
// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //MIDDLEWARE THAT PARSES JSON REQUESTS

// IF I WANT TO DELIVER STATIC FILES USE THIS MIDDLEWARE
// app.use(express.static(`${__dirname}/public`));

// MIDDLEWARE TO GET REQUEST TIME
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ******* ROUTES *******
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;

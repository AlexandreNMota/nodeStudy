const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// ***********************DATABASE CONNECTIONS ************************************
const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connection successfull');
  });

// *************** LISTEN TO SERVER ********************
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Aplicação iniciada na porta ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION .............. SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER EXCEPTION .............. SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
});
const Tour = mongoose.model('Tour', tourSchema);

// *************** LISTEN TO SERVER ********************
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplicação iniciada na porta ${port}`);
});

const fs = require('fs');

// *********Pre-read JSON FILE **********
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
  next();
};
// ********* GET ALL TOURS **********
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
// ********** CREATE A TOUR ***********
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1; // NEW TOUR ID
  const newTour = { id: newId, ...req.body }; // Adiciona a key id para o objeto enviado na req

  tours.push(newTour); // Adiciona o novo objeto no array contendo todas as tours
  //   Atualiza o json de tours com a nova tour (ASYNC)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
// ******** GET A TOUR **************
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
// ************* UPDATE A TOUR ************
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};
// DELETE A TOUR ********************
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

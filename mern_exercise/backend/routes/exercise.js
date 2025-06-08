const router = require('express').Router();
let Exercise = require('../modals/excercise.modal');

router.route('/').get((req, res) => {
    // Mongoose Method
    Exercise.find() 
        .then(exercises => res.json(exercises),)
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    // Created the Object
    const NewExercise = new Exercise ({ username, description, duration, date});
    NewExercise.save()
            .then(() => res.json('Exercise Logged In'))
            .catch(err => res.status(400).json('Error: '+ err));

});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Complete Update
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Select Update Patch for PostgreSQL 



module.exports = router;
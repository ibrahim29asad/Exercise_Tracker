const router = require('express').Router();
let Exercise = require('../modals/excercise.modal');

const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const exerciseValidationRules = [
  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .escape(),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .escape(),
    
  body('duration')
    .isFloat({ min: 0 }).withMessage('Duration must be a positive number')
    .toFloat(),
    
  body('date')
    .isISO8601().withMessage('Invalid date format. Use ISO8601 format (YYYY-MM-DD)')
    .toDate()
];

const idValidationRule = [
  param('id')
    .isMongoId().withMessage('Invalid exercise ID format')
];



router.route('/').get((req, res) => {
    // Mongoose Method
    Exercise.find() 
        .then(exercises => res.json(exercises),)
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post(
    exerciseValidationRules, // validation rules
  validate, // validation middleware
  (req, res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    // Created the Object
    const NewExercise = new Exercise ({ username, description, duration, date});
    NewExercise.save().then(() => res.json('Exercise Logged In'));
    return res.status(400).json({ errors: errors.array() });
            

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
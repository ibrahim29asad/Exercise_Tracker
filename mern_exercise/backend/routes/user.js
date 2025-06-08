const router = require('express').Router();
let User = require('../modals/user.modal');

router.route('/').get((req, res) => {
    // Mongoose Method
    User.find() 
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    // Mongoose Method,
    newUser.save()
            .then(() => res.json('User Created'))
            .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;
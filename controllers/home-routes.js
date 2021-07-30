const router = require('express').Router();
const sequelize = require('../config/connection');
//const {} = require('../models');

// Defines Login 

router.get('/', (req, res) => {
  res.render('homepage', {
    id: 1,
    user: {
      username: 'test_user'
    }
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

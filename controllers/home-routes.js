const router = require('express').Router();
const sequelize = require('../config/connection');
const {
  User,
  Post,
} = require('../models');


router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 'name:', 'email', 'phone_number', 'make', 'model', 'year', 'city', 'description'
    ],

  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
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
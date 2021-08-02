const router = require('express').Router();
const sequelize = require('../config/connection');
const {

  Post,
} = require('../models');


router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 'name', 'email', 'phone_number', 'make', 'model', 'year', 'city', 'description'
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

router.get('/post/:id', (req, res) => {
  Post.findOne({
    attributes: [
      'id', 'name', 'email', 'phone_number', 'make', 'model', 'year', 'city', 'description'
    ],
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }

      const post = dbPostData.get({
        plain: true
      });

      res.render('single-post', {
        post,
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
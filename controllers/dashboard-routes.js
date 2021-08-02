const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// get all request(POSTS) for dashboard
router.get('/', withAuth, (req, res) => {

  Post.findAll({
    attributes: [
      'id', 'name', 'email', 'phone_number', 'make', 'model', 'year', 'city', 'description'
    ],

  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));

      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
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

    res.render('edit-post', {
        post,
        loggedIn: true
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
}); 

module.exports = router;

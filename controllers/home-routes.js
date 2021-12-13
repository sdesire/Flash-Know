const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Category, Flashcard } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Flashcard.findAll({
    attributes: ['id', 'question', 'answer'],
    include: [
      {
        model: Category,
        attributes: ['id', 'user_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbCategoryData => {
      console.log(dbCategoryData[0]);
      const category = dbCategoryData.map(category =>
        category.get({ plain: true })
      );
      // pass a single post object into the homepage template
      res.render('homepage', {
        category,
        loggedIn: req.session.loggedIn,
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

router.get('/category/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const category = dbCategoryData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        category,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

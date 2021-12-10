const router = require('express').Router();
const sequelize = require('../config/connection');
const { Category, User, Flashcard } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Flashcard.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
    .then(dbFlashcardData => {
      const flashcards = dbFlashcardData.map(flashcard =>
        flashcard.get({ plain: true })
      );
      console.log(flashcards);
      res.render('dashboard', { flashcards, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Flashcard.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'flashcard_text'],
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
    .then(dbFlashcardData => {
      if (!dbFlashcardData) {
        res.status(404).json({ message: 'No flashcards found with this id' });
        return;
      }

      const flashcards = dbFlashcardData.get({ plain: true });
      const flashcardsLength = flashcards.length;
      res.render('edit-post', { flashcards, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edituser', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },

    where: {
      id: req.session.user_id,
    },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      const user = dbUserData.get({ plain: true });

      res.render('edit-user', { user, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require('express').Router();
const { Flashcard, Category, User } = require('../../models');
const withAuth = require('../../utils/auth');

// find all flashcards
router.get('/', (req, res) => {
  Flashcard.findAll({
    attributes: ['id', 'question', 'answer', 'user_id', 'category_id'],
    include: [
      {
        model: Category,
        attributes: ['id', 'title', 'user_id'],
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
    .then(dbFlashcardData => res.json(dbFlashcardData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Flashcard.create({
    question: req.body.question,
    answer: req.body.answer,
    category_id: req.body.category_id,
    user_id: req.session.user_id,
  })
    .then(dbFlashcardData => res.json(dbFlashcardData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Flashcard.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbFlashcardData => {
      if (!dbFlashcardData) {
        res.status(404).json({ message: 'No flashcard found with this id!' });
        return;
      }
      res.json(dbFlashcardData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

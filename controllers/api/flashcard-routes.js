const router = require('express').Router();
const { Flashcard } = require('../../models');
const withAuth = require('../../utils/auth');

// find all flashcards
router.get('/', (req, res) => {
  Flashcard.findAll()
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
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  })
    .then(dbFlashcardData => res.json(dbFlashcardData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
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

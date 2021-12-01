const router = require('express').Router();
const { Flashcard, Category } = require('../../models');
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
  Category.create({
    flashcard_text: req.body.flashcard_text,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  })
    .then(dbFlashcardData => res.json(dbFlashcardData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;

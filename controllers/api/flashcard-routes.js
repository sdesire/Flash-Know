const Flashcard = require('../../models/Flashcard');

// find all flashcards
router.get('/', (req, res) => {
  Flashcard.findAll()
    .then(dbFlashcardData => res.json(dbFlashcardData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

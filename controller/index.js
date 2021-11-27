const router = require('express').Router();

const categoryRoutes = require('./category-routes');

const flashcardRoutes = require('./flashcard-routes');

const userRoutes = require('./user-routes');

router.use('/categorys', categoryRoutes);
router.use('/flashcards', flashcardRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

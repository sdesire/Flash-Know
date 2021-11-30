const router = require('express').Router();
const categoryRoutes = require('./category-routes.js');
const userRoutes = require('./user-routes.js');
// const flashcardRoutes = require('./flashcard-routes.js');

router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);
// router.use('/flashcards', flashcardRoutes);

module.exports = router;

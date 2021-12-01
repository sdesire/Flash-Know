const Category = require('./Category');
const Flashcards = require('./Flashcard');
const User = require('./User');

Category.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Category };

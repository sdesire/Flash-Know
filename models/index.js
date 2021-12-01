const Category = require('./Category');
const Flashcard = require('./Flashcard');
const User = require('./User');

Category.belongsTo(User, {
  foreignKey: 'user_id',
});

Flashcard.belongsTo(User, {
  foreignKey: 'user_id',
});

Flashcard.belongsTo(Category, {
  foreignKey: 'category_id',
});

module.exports = { User, Category, Flashcard };

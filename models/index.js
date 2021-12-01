const Category = require('./Category');
// const Flashcards = require('./Flashcard');
const User = require('./User');

User.hasMany(Category, {
  foreignKey: 'user_id',
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Category };

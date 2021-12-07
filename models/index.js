const Category = require('./Category');
const Flashcard = require('./Flashcard');
const User = require('./User');

User.hasMany(Category, {
  foreignKey: 'user_id',
});

Category.belongsTo(User, {
  foreignKey: 'user_id',
});

Flashcard.belongsTo(User, {
  foreignKey: 'user_id',
});

Flashcard.belongsTo(Category, {
  foreignKey: 'user_id',
});

User.hasMany(Flashcard, {
  foreignKey: 'user_id',
});

Category.hasMany(Flashcard, {
  foreignKey: 'category_id',
});

module.exports = { User, Category, Flashcard };

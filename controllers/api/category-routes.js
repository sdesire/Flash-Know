const router = require('express').Router();
const { Category, Flashcard, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'title'],
    include: [
      {
        model: Flashcard,
        attributes: ['id', 'question', 'answer', 'user_id', 'category_id'],
        include: {
          model: User,
          attributes: ['id'],
        },
      },
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title'],
    include: [
      {
        model: Flashcard,
        attributes: ['id', 'question', 'answer', 'category_id', 'user_id'],
        include: {
          model: User,
          attributes: ['id'],
        },
      },
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new category
router.post('/', withAuth, (req, res) => {
  Category.create({
    title: req.body.title,
    user_id: req.session.user_id,
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Category.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete category
router.delete('/:id', withAuth, (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

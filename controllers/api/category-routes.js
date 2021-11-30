const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

// find all categories
router.get('/', (req, res) => {
  Category.findAll()
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new category
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Category.create({
      title: req.body.title,
      user_id: req.body.user_id,
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
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

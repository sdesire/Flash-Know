const router = require("express").Router();

// const apiRoutes = require("./api");

const catergoryRoutes = require("./category-routes.js");

const flashcardRoutes = require("./flashcard-routes.js");

const userRoutes = require("./user-routes.js");

// router.use("/api", apiRoutes);

router.use("/category", categoryRoutes);

router.use("/dashboard", flashcardRoutes);

router.use("/user", userRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

const seedUsers = require("./user-seeds");
const seedPosts = require("./flashcard-seeds");
const seedComments = require("./category-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedPosts();
  console.log("\n----- FLASHCARD SEEDED -----\n");

  await seedComments();
  console.log("\n----- CATEGORY SEEDED -----\n");

  process.exit(0);
};

seedAll();

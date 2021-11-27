require('dotenv').config();

const Sequelize = require('sequelize');



const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME = 'ecommerce_db', process.env.DB_USER= 'root', process.env.DB_PW = 'a1234567', {
      host: 'localhost',
      username:'root',
      password:'a1234567',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
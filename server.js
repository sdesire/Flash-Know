<<<<<<< HEAD
const exphbs = require("express-handlebars");
const { appendFile } = require("fs");
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

console.log(template({ name: "Flashcards" }));

var source = document.getElementById("entry-template").innerHTML;
var template = template(context);
var context = {
  title: "My New Flashcard App",
  body: "This is our flashcard app!",
};
var html = template(context);

//const path = require("path");
=======
const path = require('path');
const express = require('express');
 const exphbs = require('express-handlebars');
>>>>>>> 391d9577134980e7e696e1a51aad343edba0abb2

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
  secret: 'Super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


 app.use(express.static(path.join(__dirname, 'public')));
 app.engine("handlebars", hbs.engine);
 app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
 app.set('view engine', 'handlebars');

 app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers'));

<<<<<<< HEAD
//const hbs = exphbs.create({ helpers });

//const sess = {
//secret: process.env.DB_SESSION_SECRET,
// cookie: { maxAge: 7200000 },
//resave: false,
//saveUninitialized: true,
//store: new SequelizeStore({
//db: sequelize,
// }),
//};

//const app = express();

//const PORT = process.env.PORT || 3001;

//app.use(express.static(path.join(__dirname, "public")));

//app.engine("handlebars", hbs.engine);
//app.set("view engine", "handlebars");

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//app.use(session(sess));

//app.use(routes);

//sequelize.sync({ force: false }).then(() => {
//app.listen(PORT, () => console.log("Now listening"));
//});
=======
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
>>>>>>> 391d9577134980e7e696e1a51aad343edba0abb2

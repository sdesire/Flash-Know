const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const nStatic = require('node-static');
const fileServer = new nStatic.Server('./public');

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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
  fileServer.serve;
  app.listen(PORT, () => console.log('Now listening'));
});

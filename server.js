const express = require('express')
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require("express-session")
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets the static 'middleware' directory
app.use(express.static('public'));

app.use(routes);


const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
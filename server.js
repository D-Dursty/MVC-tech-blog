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

// Set Express to use sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
      maxAge:2*60*60*1000 // calculates session time (2hrs*60min*60sec*60ms)
  },
  store: new SequelizeStore({
      db:sequelize
  })
}))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
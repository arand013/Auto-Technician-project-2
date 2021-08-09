//MAIN Server FILE 
// Contains Back-End Variables
// turn on routes to
// Front-End Variables
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const passport = require('passport')

const initalizePassport = require('./passport')
const session = require('express-session');
const { addHook } = require('./models/Post');
const { User } = require('./models');
const { use } = require('./controllers');
const { userInfo } = require('os');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
	secret: 'Key that will sign cookie',
	cookie: {},
	resave: true,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

const PORT = process.env.PORT || 3003;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);





sequelize.sync();

app.listen(PORT, () => {
	console.log(`App listening on port ` + PORT);
});
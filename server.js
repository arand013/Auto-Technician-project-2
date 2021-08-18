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


const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
	secret: 'Key that will sign cookie',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

const app = express();
const PORT = process.env.PORT || 3003;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.bcrypt = bcrypt;



sequelize.sync();

app.listen(PORT, () => {
	console.log(`App listening on port ` + PORT);
});
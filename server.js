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

const PORT = process.env.PORT || 3002;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(passport.initialize())
app.use(passport.session())
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('signupform.html')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
	try {
		var hashedPassword = await bcrypt.hash(req.body.password, 10)
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})
		res.redirect('login')
	} catch {
		res.redirect('/register')
	}
})

app.get('/', checkAuthenticated, (req, res) => {
	res.render('index.html', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('loginfrom.html')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

app.delete('/logout', (req, res) => {
	req.logOut()
	req.redirect('/login')
})

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}

app.get("/", (req, res) => {
	req.session.isAuth = true;
	console.log(req.session);
	console.log(req.session.id);
	res.send("session");
});

app.get("/", (req, res) => {
	console.group(req.session);
	res.send("session");
});

sequelize.sync();

app.listen(PORT, () => {
	console.log(`App listening on port ` + PORT);
});
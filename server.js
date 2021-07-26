const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookierParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 3004;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(cookierParser('abcdef-12345'))


const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

function auth(req, res, next) {
  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authenticated");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }

    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var username = auth[0];
    var password = auth[1];

    if (username == "admin" && password == "p@ssword") {
        res.cookie('user','admin',{
            signed:true,

        });
      next();
    } else {
      var err = new Error("You are not authenticated");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
  }else{
      if(req.signedCookies.user == 'admin'){
          next();
      }else{
        var err = new Error("You are not authenticated");
        err.status = 401;
        next(err);
      }
  }
}

module.exports = auth;

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const sequelize = require('../config/connection');

app.use(session({
  name:'session-id',
  secret:'123456xxx',
  saveUninitialized:false,
  resave:false,
  store:new FileStore()
}))

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();

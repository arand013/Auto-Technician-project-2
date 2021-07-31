const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'NewGenM',
    email: 'NewGenM@ymail.com',
    password: 'Mechanic#1'
  },
  {
    username: 'qwe123',
    email: 'qwe@gmail.com',
    password: 'qwe123'
  },

];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;

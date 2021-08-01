const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
  
    email: 'NewGenM@ymail.com',
    password: 'Mechanic#1'
  },
  {
    email: 'qwe@gmail.com',
    password: 'qwe123'
  },

];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;

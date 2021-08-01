const { Post } = require('../models');

const postdata = [
  {
    id: 1,
    name: 'Donec ipsum.',
    email: 'larnout5@imdb.com',
    phone_number: '909-111-2222',
    make: 'Toyota',
    model: 'Corolla',
    year: '2009',
    city: 'Rialto',
    description: 'Battery',

  },
  {
    id: 2,
    name: 'Isaac Abrams.',
    email: 'larnout5@imdb.com',
    phone_number: '909-111-2222',
    make: 'Toyota',
    model: 'Camry',
    year: '2021',
    city: 'Upland',
    description: 'Car overheats',

  },
  {
    id: 3,
    name: 'Faith Kate',
    email: 'fkate@cyper.com',
    phone_number: '909-111-2222',
    make: 'Mercedes',
    model: 'E300',
    year: '2002',
    city: 'Fontana',
    description: 'Car overheats',

  },
  {
    id: 4,
    name: 'Davion Money',
    email: 'dmoney@secure.org',
    phone_number: '909-111-2222',
    make: 'Hyundai',
    model: 'Tuscon',
    year: '2007',
    city: 'LA',
    description: 'Car overheats',

  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;

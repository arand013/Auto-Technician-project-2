// import all models
const Post = require('./Post');
const User = require('./User');


// create associations
User.hasMany(Post, {
  foreignKey: 'id'
});
User.belongsToMany(Post, {
  foreignKey: 'id',
  onDelete: 'SET NULL'
});

Post.belongsTo(User, {
  foreignKey: 'id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  foreignKey: 'id',
  onDelete: 'SET NULL'
});


module.exports = { User, Post };

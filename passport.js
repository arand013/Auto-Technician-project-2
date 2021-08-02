LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const passport = require('passport')

function initialize(passport, getUserByEmail, getUserById) {
    var authenticateUser = (email, password, done) => {
        var user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
        }

    }
  
    passport.use(new LocalStrategy({ usernameField: 'email'}), 
    authenticateUser)
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
    })
}
 
module.exports = initialize
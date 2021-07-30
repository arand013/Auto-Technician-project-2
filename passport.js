var LocalStrategy = require(passport-local).Strategy
var bycrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
    var authenticateUser = (email, password, done) => {
        var user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
        }
        
        try {
            if (await bycrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch  (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}), 
    authenticateUser)
    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((id, done) => { })
}

module.exports = initialize
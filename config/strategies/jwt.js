const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');
const config = require('../config');
const _ = require('lodash');

module.exports = function () {
    passport.use(new JWTStrategy({
        // secret we used to sign out JWT
        secretOrKey: config.jwt_secret,

        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
        try {
            const user = await User.findById(token.id);

            return done(null, _.pick(user, ['_id', 'name', 'email']));
        } catch (error) {
            done(error);
        }
    }));
};
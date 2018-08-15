const users = require('../controllers/users.controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (app) {
    app.route('/api/login').post(passport.authenticate('local', { session: false }), function (req, res) {
        const token = jwt.sign({ id: req.user._id }, config.jwt_secret);

        return res.json({ token });
    });

    app.route('/api/me').get(passport.authenticate('jwt', { session: false }), function (req, res) {
        res.send(req.user);
    });
};
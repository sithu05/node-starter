const passport = require('passport');

module.exports = function () {
    require('./strategies/local')();
    require('./strategies/jwt')();
};
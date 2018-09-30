const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const compress = require('compression');
const passport = require('passport');
const cors = require('cors');

module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.use(cors());
    } else if (process.env.NODE_ENV === 'production') {
        app.use(cors({ origin: true }));
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(passport.initialize());

    require('../routes/auth.routes')(app);

    app.use(express.static('./public'));

    return app;
};
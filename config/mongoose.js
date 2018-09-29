const config = require('./config');
const mongoose = require('mongoose');

module.exports = function () {
    // Use for future version
    mongoose.set('useCreateIndex', true);
    const db = mongoose.connect(config.db, { useNewUrlParser: true });

    // Models
    require('../models/user.model');

    // Seeders
    require('../seeders/users.seeder');

    return db;
};
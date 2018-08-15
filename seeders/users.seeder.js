const User = require('mongoose').model('User');

User.findOne({ username: 'admin' }, async function (err, user) {
    if (err) { throw Error(err); }

    if (!user) {
        const admin = new User({
            name: 'Administrator',
            email: 'admin@admin.com',
            username: 'admin',
            password: 'secret',
            provider: 'local'
        });

        try {
            await admin.save();
        } catch (e) {
            console.log(e.message);
        }
    }
});
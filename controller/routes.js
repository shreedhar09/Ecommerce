
const userRegistration = require('../routes/userregistration.routes');
const auth = require('../auth/auth');
const mailer = require('../routes/nodemailer');
const resetPassword = require('../routes/resetpassword');
const middleware = require('../middleware/user');
module.exports = (app) => {
    //app.use('/api/user',user);
    //app.use('/api/movie', Genre);
    //app.use('/api/movie', movies);
    app.use('/api/users', userRegistration);
    app.use('/api/auth', auth);
    //app.use('/api/', fileupload);
    app.use('/api/', mailer);
    app.use('/api/', resetPassword);
    app.use(middleware);
}
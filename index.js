const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const port = process.env.PORT || 5000;

const middleware = require('./middleware/user');
//const Genre = require('./routes/genre.routes');
const contact = require('./routes/contact.routes');
const userRegistration = require('./routes/userregistration.routes');
const auth = require('./auth/auth');
//const fileupload = require('./routes/file.routes');
const mailer = require('./routes/nodemailer');
const resetPassword = require('./routes/resetpassword');
app.use(express.json());
if(!config.get('EcommercePRIVATEKEY')){
    console.log('Server get crashed');
    process.exit(1);
}
if(config.get('host.mail') === 'Development mode'){
    app.use(morgan('tiny'));
};
if(process.env.NODE_ENV === 'production'){
    console.log(`password: ${config.get('password')}`);
}
// app.use(express.urlencoded({extended:true}))
app.use(middleware);
mongoose
.connect('mongodb://localhost/ECommerce', { useNewUrlParser: true })
.then(() => console.log('connected to the database'))
.catch(err => console.log('something went wrong', err.message));


app.use('/uploads', express.static('uploads'));
// console.log(process);
// console.log(`Production mode: ${process.env.NODE_ENV}`);
// console.log(`development mode : ${app.set('env')}`);
// console.log('mode:', config.get('host.mail'));
//app.use('/api/user',user);
//app.use('/api/movie', Genre);
//app.use('/api/movie', movies);
app.use('/api/users', userRegistration);
app.use('/api/contact', contact);
app.use('/api/auth', auth);
//app.use('/api/', fileupload);
app.use('/api/', mailer);
app.use('/api/', resetPassword);
app.listen(port,() => {console.log(`server working on port number ${port}`)});


const express = require('express');
const userRegistration = require('../routes/userregistration.routes');
const contact = require('../routes/contact.routes');

const product = require('../routes/productRoute');
const category = require('../routes/categoryRoute');
const subcategory = require('../routes/subCategoryRoute');
const userCard = require('../routes/userCardRoute')
const auth = require('../auth/auth'); 
const mailer = require('../routes/nodemailer');
const resetPassword = require('../routes/resetpassword');
const middleware = require('../middleware/user');
module.exports = (app) => {
app.use(express.json());
app.use('/api/users', userRegistration);
app.use('/api/contact', contact);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/api/subCategory', subcategory);
app.use('/api/', mailer);
app.use('/api/resetpassword', resetPassword);
app.use('/api/card', userCard);
app.use(middleware);
}
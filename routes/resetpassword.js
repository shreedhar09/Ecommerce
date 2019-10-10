let express = require('express');
let router = express.Router();
let u = require('../model/userRegistration');
let bcrypt = require('bcrypt');
let Joi = require('@hapi/joi');


// Reset password by token
router.post('/:token', async(req,res) => {
    try {
    let user = await u.User.findOne({resetPasswordToken:req.params.token, resetPasswordExpires:{$gt:Date.now()}});
    if(!user) {res.status(402).send('invalid token')}
    let {error} = ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
    let comparePsd = await bcrypt.compare(user.UserLogin.userPassword, req.body.UserLogin.userPassword);
    if(comparePsd) {return res.status(402).send('please make a new password! dnt try to use old password')}
    user.UserLogin.userPassword = req.body.UserLogin.userPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    let salt = await bcrypt.genSalt(10);
    user.UserLogin.userPassword =await bcrypt.hash(req.body.UserLogin.userPassword,salt);
    let data = await user.save();
    res.send({message:'congrats! password updated', item:data});
    }
    catch(ex) {
        res.send(ex.message);
    }
});

function ValidationError(message) {
    let Schema = Joi.object().keys({
        UserLogin:{
            userPassword:Joi.string().min(5).max(250).required()
        }
    });
    return Joi.validate(message, Schema);
};
module.exports = router;
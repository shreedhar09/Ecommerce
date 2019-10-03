let mongoose = require('mongoose');
let Joi = require('@hapi/joi');




let ContactSchema = new mongoose.Schema({
    name:{type:String,required:true,min:5,max:250},
    email:{type:String,required:true,min:5,max:250},
    personalmessage:{type:String,required:true,min:5,max:250},

});
 

let Contact = mongoose.model('contact', ContactSchema);


function ValidationError(message){
    let Schema = Joi.object().keys({
        name: Joi.string().required().min(5).max(250),
        email:Joi.string().min(5).max(250).required(),
        personalmessage:Joi.string().min(5).max(250).required(),
             
    });
    return Joi.validate(message,Schema);
}

module.exports = {Contact,ValidationError};
let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let config = require('config');




let UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true,min:5,max:250},
    lastname:{type:String,required:true,min:5,max:250},
    newsLetterCheck:{type: Boolean},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{ type : Boolean},
    resetPasswordToken : {type:String},
    resetPasswordExpires: {type:Date},
    isAdmin:{type:Boolean},
    recordDate: {type:Date, default: Date.now},
    updateDate: {type:Date, default: Date.now}
});
 UserSchema.methods.UserIdentity =  function(){
   let token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, config.get('EcommercePRIVATEKEY'));
   return token;
 }

let User = mongoose.model('users', UserSchema);


function ValidationError(message){
    let Schema = Joi.object().keys({
        firstname: Joi.string().required().min(5).max(250),
        lastname:Joi.string().min(5).max(250).required(),
        
          UserLogin: {
            userEmail:Joi.string().required(),
            userPassword: Joi.string().required()
          }        
    });
    return Joi.validate(message,Schema);
}

module.exports = {User,ValidationError,File};
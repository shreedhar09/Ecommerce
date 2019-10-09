let mongoose = require('mongoose');
let Joi = require('@hapi/joi');




let CardItemSchema = new mongoose.Schema({
    prodId:{type:String,required:true,min:5,max:250},
    name:{type:String,required:true,min:5,max:250},
    image:{type:String,required:true,min:5,max:250},
    price:{type:Number,required:true,minlength:1},
    quantity:{type:Number,required:true,minlength:1},
    totalPrice:{type:Number,required:true,minlength:1},
    offerPrice:{type:Number,required:true,minlength:1},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}

});
 

let CardItemRecords = mongoose.model('cardItemRecords', CardItemSchema);

let usercardSchema = new mongoose.Schema({
    userEmail : {type:String,required:true,min:5,max:250},
    cardItems :{type: CardItemSchema, required:true} 
})

let UserCardItem = mongoose.model('userCardItem', usercardSchema);

function ValidationError(message){
    let Schema = Joi.object().keys({
        prodId: Joi.string().required().min(5).max(250),
        name:Joi.string().min(5).max(250).required(),
        image:Joi.string().min(5).max(250).required(),
        price: Joi.number().required().min(5).max(250),
        quantity: Joi.number().required().min(5).max(250),
        totalPrice: Joi.number().required().min(5).max(250),
        offerPrice: Joi.number().required().min(5).max(250)     
    });
    return Joi.validate(message,Schema);
}

module.exports = {CardItemRecords,UserCardItem,ValidationError};
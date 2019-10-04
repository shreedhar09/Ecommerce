let mongoose = require('mongoose');
let Joi = require('@hapi/joi');


let subCategorySchema = new mongoose.Schema({
    name : {type:String,required:true,min:5,max:250}
});

let SubCategory = mongoose.model('subCategory', subCategorySchema);

let CategorySchema = new mongoose.Schema({
    categoryName : {type:String,required:true,min:5,max:250},
    subCategory : [subCategorySchema]
});
let Category = mongoose.model('category', CategorySchema);

let ProductSchema = new mongoose.Schema({
    name:{type:String,required:true,min:5,max:250},
    image:{type:String,required:true,min:5,max:250},
    description:{type:String,required:true,min:5,max:250},
    price:{type:Number,required:true,minlength:1},
    offerPrice:{type:Number,required:true,minlength:1},
    isAvailable:{type:Boolean,required:true},
    isTodayOffer:{type:Boolean,required:true},
    category:[Category],
    subCategory:[SubCategory],
    isAdmin:{type:Boolean},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}

});

let Product = mongoose.model('product', ProductSchema);

function ValidationError(message){
    let Schema = Joi.object().keys({
        name: Joi.string().required().min(5).max(250),
        image:Joi.string().min(5).max(250).required(),
        description: Joi.string().required().min(5).max(250),
        price: Joi.number().required().min(5).max(250),
        offerPrice: Joi.number().required().min(5).max(250),
        isAvailable: Joi.string().required().min(5).max(250),
        isTodayOffer: Joi.string().required().min(5).max(250),
        category:Joi.string().min(5).max(250).required(),
        subCategory:Joi.string().min(5).max(250).required()
             
    });
    return Joi.validate(message,Schema);
}

module.exports = {Product,ValidationError};
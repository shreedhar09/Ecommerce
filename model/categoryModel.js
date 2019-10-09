let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let subcat = require('./subCategoryModel')


let CategorySchema = new mongoose.Schema({
    categoryName : {type:String,required:true,min:1,max:250},
     subCategory : [subcat.subCategorySchema]
});
let Category = mongoose.model('category', CategorySchema);


function ValidationError(message){
    let Schema = Joi.object().keys({
        categoryName: Joi.string().required().min(5).max(250),
        subCategoryId: Joi.string().required().min(3).max(150)
             
    });
    return Joi.validate(message,Schema);
}

module.exports = {Category,CategorySchema,ValidationError};
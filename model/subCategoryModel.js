let mongoose = require('mongoose');
let Joi = require('@hapi/joi');



let subCategorySchema = new mongoose.Schema({
    name : {type:String,required:true,min:1,max:250},
    catName: {type:String}
});

let SubCategory = mongoose.model('subCategory', subCategorySchema);


function ValidationError(message){
    let Schema = Joi.object().keys({
        name: Joi.string().required().min(5).max(250)
             
    });
    return Joi.validate(message,Schema);
}

module.exports = {SubCategory,subCategorySchema,ValidationError};
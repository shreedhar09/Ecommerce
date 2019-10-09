let express = require('express');
let router = express.Router();
let sc = require('../model/subCategoryModel');


router.post('/addSubCategory', async(req,res) => {
    let subcat= new sc.SubCategory(req.body);
    subcat= await subcat.save();
        res.send({message:'Success', data:subcat})

});


router.get('/allSubCategory', async(req,res) => {
    let subCat = await sc.SubCategory.find();
   
    res.send(subCat);
} );

//pagination
router.post('/pageIndex/:page' , async(req,res) => {
    let perPage = 10;
    let page = req.params.page || 1;
    let data  = await sc.SubCategory.find({})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await sc.SubCategory.find({}).count();
    let totalPages = Math.ceil(totalUser/perPage);
    res.send({
        perPage: perPage,
        page:page,
        userData:data,
        totaluserCount: totalUser,
        totalPages: totalPages
    })
})      

module.exports = router;
let express = require('express');
let router = express.Router();
let category = require('../model/categoryModel');
let subcategory = require('../model/subCategoryModel');

router.post('/addCategory', async(req,res) => {
    // let cat= new category.Category(req.body);
    // cat= await cat.save();
    //     res.send({message:'Success', data:cat})

    try {
      
        let subcatM = await subcategory.SubCategory.find({catName: req.body.categoryName}).select("name");
        // if(!subcatM) {return res.status(404).send('invalid subcategory id')}
        let newCategory = await category.Category({
            categoryName: req.body.categoryName,
            subCategory:subcatM
        });
        await newCategory.save();
        res.send({msg: 'New category added successfully', data: newCategory});
    }
    catch(ex) {
        res.send(ex.message);
    }

});



router.get('/allCategory', async(req,res) => {
    let cat = await category.Category.find()
   
    ;
    res.send(cat);
} );


router.get('/findCategoryById/:id', async(req,res) => {
    let subCat = await category.Category.findById(req.params.id);
    if(!subCat) {
        return res.status(403).send('this product not available');
    };
    res.send(subCat);
} );

router.delete('/deleteCategoryById/:id',async (req,res) => {
    let data = await category.Category.findByIdAndRemove(req.params.id);
    if(!data) {return res.status(402).send('invalid category')}
    res.send({message: 'remve the data'});
    });

//pagination cayegory
router.post('/pageIndex/:page' , async(req,res) => {
    let perPage = 10;
    let page = req.params.page || 1;
    let data  = await category.Category.find({})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await category.Category.find({}).count();
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
let express = require('express');
let router = express.Router();
let p = require('../model/product');
let c = require('../model/categoryModel');
let s = require('../model/subCategoryModel');

// product add URL
router.post('/addProduct', async(req,res) => {

        let catgr = await c.Category.findById(req.body.categoryId);
        let subcatgr = await s.SubCategory.findById(req.body.subCategoryId);
        if(!subcatgr){return res.status(400).send('invalid subCategory id')}
        let data = new p.Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            isAvailable: req.body.isAvailable,
            isTodayOffer: req.body.isTodayOffer,
            category: {
                _id:catgr._id,
                categoryName: catgr.categoryName
            },
            subCategory: {
                _id:subcatgr._id,
                name: subcatgr.name
            },
            isAdmin : req.body.isAdmin
        });
        // let cat= new p.Category(req.body);
           let  cat= await data.save();
             res.send({message:'Success', data:cat})
    
    });

//update product by Id
router.put('/updateProduct/:id', async(req,res) => {
    let Ucatgr = await c.Category.findById(req.body.categoryId);
    let Usubcatgr = await s.SubCategory.findById(req.body.subCategoryId);
    let data = await p.Product.findOneAndUpdate(req.params.id , {$set:{
        name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            isAvailable: req.body.isAvailable,
            isTodayOffer: req.body.isTodayOffer,
            category: {
                _id:Ucatgr._id,
                categoryName: Ucatgr.categoryName
            },
            subCategory: {
                _id:Usubcatgr._id,
                name: Usubcatgr.name
            },
            isAdmin : req.body.isAdmin
    }}, {new:true});
    if(!data) {return res.status(402).send('invalid id')}
  //   data.firstname = req.body.firstname;
  //   data.lastname = req.body.lastname;
  //   let items = await data.save();
    res.send({message:'data updated', i:data})
});

router.get('/allProduct', async(req,res) => {
    let prod = await p.Product.find()
   
    ;
    res.send(prod);
} );

//delete Product record by id
router.delete('/removeProduct/:id',async (req,res) => {
    let data = await p.Product.findByIdAndRemove(req.params.id);
    if(!data) {return res.status(402).send('invalid token')}
    res.send({message: 'remve the data'});
    });

    // find product by id
    router.get('/findProductById/:id', async(req,res) => {
        let prod = await p.Product.findById(req.params.id);
        if(!prod) {
            return res.status(403).send('this product not available');
        };
        res.send(prod);
    } );

    // find product today Offer
    router.get('/findTodayOffer', async(req,res) => {
        let prod = await p.Product.find({"isTodayOffer": "true"});
        if(!prod) {
            return res.status(403).send('this product not available');
        };
        res.send(prod);
    } );

    // find product today Offer
    router.get('/findLatestProduct', async(req,res) => {
        let productNo = 5;
        let prod = await p.Product.find()
                                  .sort('-recordDate')
                                  .select(['name','isAdmin'])
                                  .limit(productNo);
        if(!prod) {
            return res.status(403).send('this product not available');
        };
        res.send(prod);
    } );

// peoduct pagination 
router.post('/pageIndex/:page' , async(req,res) => {
    let perPage = 10;
    let page = req.params.page || 1;
    let data  = await p.Product.find({})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await p.Product.find({}).count();
    let totalPages = Math.ceil(totalUser/perPage);
    res.send({
        perPage: perPage,
        page:page,
        userData:data,
        totaluserCount: totalUser,
        totalPages: totalPages
    })
})  
//pagination by subcategory
router.post('/category/:catId/subcategory/:subcatId/page/:pageIndex' , async(req,res) => {
    let perPage = 3;
    let page = req.params.pageIndex || 1;
    let cat = await c.Category.findById(req.params.catId);
    let subcat = await s.SubCategory.findById(req.params.subcatId);

    let data  = await p.Product.find({"category.categoryName": cat.categoryName , "subCategory.name": subcat.name})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await p.Product.find({"category.categoryName": cat.categoryName , "subCategory.name": subcat.name}).count();
    let totalPages = Math.ceil(totalUser/perPage);
    res.send({
        perPage: perPage,
        page:page,
        userData:data,
        totaluserCount: totalUser,
        totalPages: totalPages
    })
})  

//pagination by category
router.post('/category/:catId/page/:pageIndex' , async(req,res) => {
    let perPage = 3;
    let page = req.params.pageIndex || 1;
    let cat = await c.Category.findById(req.params.catId);
    //let subcat = await s.SubCategory.findById(req.params.subcatId);

    let data  = await p.Product.find({"category.categoryName": cat.categoryName })
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await p.Product.find({"category.categoryName": cat.categoryName }).count();
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
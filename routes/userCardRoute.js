
let express = require('express');
let router = express.Router();
let userCard = require('../model/userCardModel');
let product = require('../model/product');
let auth = require('../middleware/auth');
let u = require('../model/userRegistration');

// Add To Card  
router.post('/addToCard',auth, async(req,res) => {

    try {
        let usrmail = await u.User
        .findById(req.userRegistration._id)
         .select("UserLogin.userEmail")
    
        let prd = await product.Product.findById(req.body.cardItems.prodId);

        let cardItem = await userCard.CardItemRecords({
            prodId : req.body.cardItems.prodId,
            
            name : prd.name,
            price : prd.price,
            quantity : req.body.cardItems.quantity,
            totalPrice : (prd.price * req.body.cardItems.quantity),


        });
        let cardItm = await userCard.UserCardItem({
            userEmail : usrmail.UserLogin.userEmail,
            cardItems : cardItem

        });
        //let card = await cardItem.save();
        let card = await cardItm.save();

        res.send({msg: 'New cardItem added successfully', data: card});
    }
    catch(ex) {
        res.send(ex.message);
    }

});

//update usercard record by Id
router.put('/updateUserCard/:id',auth, async(req,res) => {
    let carddetail = await userCard.UserCardItem.findById(req.params.id);
    
    if(!carddetail) {return res.status(402).send('invalid id')}


    let data = await userCard.UserCardItem.findOneAndUpdate(req.params.id , {$set:{
        cardItems : {
            price : carddetail.cardItems.price,
            quantity : req.body.cardItems.quantity,
            totalPrice : (carddetail.cardItems.price * req.body.cardItems.quantity),
        }
    }}, {new:true});
    res.send({message:'data updated', i:data})
});

// Get All User Card  
router.get('/allUserCard', async(req,res) => {
    let uc = await userCard.UserCardItem.find();
    res.send(uc);
} );

router.post('/cardByUser',auth, async(req,res) => {
    let user = await u.User
    .findById(req.userRegistration._id)
     .select("UserLogin.userEmail")

    let cbu = await userCard.UserCardItem.find({'userEmail':user.UserLogin.userEmail})
    
         res.send({message:'Success', data:cbu})

});

//delete Product record by id
router.delete('/removecardItem/:id',async (req,res) => {
    let data = await userCard.UserCardItem.findByIdAndRemove(req.params.id);
    if(!data) {return res.status(402).send('invalid token')}
    res.send({message: 'remve the data'});
    });


module.exports = router;
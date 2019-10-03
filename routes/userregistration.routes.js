let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let u = require('../model/userRegistration');
let auth = require('../middleware/auth');
//let admin = require('../middleware/admin');

router.get('/me',auth, async(req,res) => {
    let user = await u.User
    .findById(req.userRegistration._id)
     .select("-UserLogin.password")
    ;
    res.send(user);
} );

router.get('/allUser', async(req,res) => {
    let user = await u.User.find()
   
    ;
    res.send(user);
} );

router.post('/newuser', async(req,res) => {
    let {error} = u.ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
    let user = await u.User.findOne({"UserLogin.email": req.body.UserLogin.userEmail})
   if(user) {return res.status(402).send('email id already exsists')}
   let data = new u.User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    newsLetterCheck: req.body.newsLetterCheck,
    UserLogin:req.body.UserLogin,
    termsAcceptCheck:req.body.termsAcceptCheck,
    resetPasswordToken:req.body.resetPasswordToken,
    resetPasswordExpires:req.body.resetPasswordExpires,
    isAdmin:req.body.isAdmin

});
let salt = await bcrypt.genSalt(10);
data.UserLogin.userPassword = await bcrypt.hash(data.UserLogin.userPassword, salt);

let items = await data.save();
//Information Expert Principle
let token = items.UserIdentity();
res.header('x-auth-token', token).send({message:'thanks for the registration', data:items})
});

//update user record by Id
  router.put('/updateuser/:id', async(req,res) => {
      let data = await u.User.findOneAndUpdate(req.params.id , {$set:{
         firstname: req.body.firstname,
         lastname: req.body.lastname
      }}, {new:true});
      if(!data) {return res.status(402).send('invalid id')}
    //   data.firstname = req.body.firstname;
    //   data.lastname = req.body.lastname;
    //   let items = await data.save();
      res.send({message:'data updated', i:data})
  });

//delete user record by id
// router.delete('/removeuser/:id', [auth,admin],async (req,res) => {
// let data = await u.User.findByIdAndRemove(req.params.id);
// if(!data) {return res.status(402).send('invalid token')}
// res.send({message: 'remve the data'});
// });

//pagination
router.post('/:page' , async(req,res) => {
    let perPage = 10;
    let page = req.params.page || 1;
    let data  = await u.User.find({})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let totalUser = await u.User.find({}).count();
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
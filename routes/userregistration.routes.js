let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let u = require('../model/userRegistration');
let auth = require('../middleware/auth');
let admin = require('../middleware/admin');



router.get('/allUser', async(req,res) => {
    let user = await u.User.find();
    res.send({
        message : user
    });
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

if (!data.termsAcceptCheck) {
    return res
      .status(402)
      .send("Please Accept Our Policy... Otherwise you cannot proceed further");
  }

let salt = await bcrypt.genSalt(10);
data.UserLogin.userPassword = await bcrypt.hash(data.UserLogin.userPassword, salt);

let items = await data.save();
//Information Expert Principle
let token = items.UserIdentity();
res.header('x-auth-token', token).send({message:'thanks for the registration', data:items})
});

//API to delete user with authentication and isAdmin middlewares
router.delete('/deleteUser/:id', [auth,admin],async (req,res) => {
    let checkUser = await u.User.findByIdAndRemove(req.params.id);
    if(!checkUser){
        return res.send('ID does not exist');
    }
    res.send({
        msg: `User ${checkUser.firstname} deleted from database`
    });
    
})



module.exports = router;
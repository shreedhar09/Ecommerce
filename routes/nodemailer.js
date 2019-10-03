
let nodemailer = require('nodemailer');
let express = require('express');
let router = express.Router();
let model = require('../model/userRegistration');
const crypto = require('crypto');
router.post('/mail', async(req,res) => {
 let token = crypto.randomBytes(32).toString('hex');
 let user = await model.User.findOne({"UserLogin.userEmail": req.body.UserLogin.userEmail});
 if(!user) {return res.status(402).send('invalid email id')};
 user.resetPasswordToken = token;
 user.resetPasswordExpires = Date.now() + 3600000 // 1hours
user = await user.save();


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'desaishreedhar09@gmail.com', // generated ethereal user
        pass: 'Spdpass@93' // generated ethereal password
    },
    tls: {rejectUnauthorized: false},
    debug:true
});

if (!transporter) res.status(401).send({
    message: 'something went wrong'
});
// setup email data with unicode symbols
let mailOptions = {
    from: '"Vs Apps:sweat_smile:" <wynebatman@gmail.com>', // sender address
    to: user.UserLogin.userEmail, // list of receivers
    subject: 'Reset Your Password', // Subject line:smile:
    text: 'open this link to change your password http://localhost:4200/forgotpassword/' + token // plain text body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

res.send({message:"please check your mail box"})
});

module.exports = router;
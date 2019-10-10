let express = require('express');
let router = express.Router();
let c = require('../model/contact');
const Admin = require('../middleware/admin')

// Show all contact
router.get('/allContact', async(req,res) => {
    let user = await c.Contact.find()
   
    ;
    res.send(user);
} );


// Add New contact
router.post('/newContact', async(req,res) => {
    let {error} = c.ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
    
   let data = new c.Contact({
    name:req.body.name,
    email:req.body.email,
    personalmessage: req.body.personalmessage,
   
});

let items = await data.save();
res.send(items);

});

module.exports = router;
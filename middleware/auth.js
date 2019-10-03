let jwt = require('jsonwebtoken');
let config = require('config');
function Authmiddleware(req,res,next) {
    let token = req.header('x-auth-token');
    if(!token) {return res.status(401).send('Access Denied! invalid token')}
    try {
let decoded = jwt.verify(token,config.get('EcommercePRIVATEKEY'));
req.userRegistration = decoded;
next();
    }
    catch(ex) {
        res.status(401).send('Invalid token')
    }
}
module.exports = Authmiddleware;
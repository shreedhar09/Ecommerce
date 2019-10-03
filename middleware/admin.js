function Admin(req,res,next) {
    if(!req.userRegistration.isAdmin) {
        return res.status(403).send('Access Denied!');
    };
    next();
}

module.exports = Admin;
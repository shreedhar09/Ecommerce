function User(req,res,next){
    console.log('hello user');
    next();
}

module.exports = User;
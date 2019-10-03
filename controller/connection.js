module.exports = (mongoose) => {
    mongoose
.connect('mongodb://localhost/ECommerce', { useNewUrlParser: true })
.then(() => console.log('connected to the database'))
.catch(err => console.log('something went wrong', err.message));

}
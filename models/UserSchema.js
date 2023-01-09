const mongoose = require('mongoose'); 
const {Schema} = require('mongoose'); 

const User = new Schema({

}, {collection:'users'})


module.exports = mongoose.model('users', User, 'users');



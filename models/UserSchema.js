const mongoose = require('mongoose'); 
const {Schema} = require('mongoose'); 

const User = new Schema({
    login: {type:String, required: true, unique:true},
    mail: {type:String, required: true, unique:true},
    firstname: String,
    lastname: String,
    password: String,
}, {collection:'users'})


module.exports = mongoose.model('users', User, 'users');



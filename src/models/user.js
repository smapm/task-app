const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('users',{
    name: {
        type: String,
        trim: true,
        required: true,
        validate(name){
            if(name.length === 0){
                throw new Error('Invalid username')
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type: String,
        minlength: 7,
        required: true,
        validate(password){
            if(validator.contains(password,'password')){
                throw new Error('Invalid password') 
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(age){
            if(age < 0){
                throw new Error('Invalid age')
            }
        }
    }
});

module.exports = User;
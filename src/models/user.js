const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task =require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        validate(name) {
            if (name.length === 0) {
                throw new Error('Invalid username')
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        validate(password) {
            if (validator.contains(password, 'password')) {
                throw new Error('Invalid password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(age) {
            if (age < 0) {
                throw new Error('Invalid age')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
});

userSchema.virtual('tasks',{
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};

userSchema.methods.authenticate = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.validateAndLogin = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('unable to login');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
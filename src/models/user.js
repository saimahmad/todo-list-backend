const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value<0) {
                throw new Error('Age must be positive')
            }
        },
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    //console.log(user)
    const token = jwt.sign({_id: user._id.toString()},"testingjwt");

    user.tokens = user.tokens.concat({ token });
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('unable to login')
    }

    return user;
}

userSchema.pre('save',async function(next) {
    const user = this;
//    console.log(user.password)
    user.password = await bcrypt.hash(user.password, 8);
    // console.log(user.password)
    // console.log("middleware called");
    next();
})

const User = mongoose.model('User',userSchema)

module.exports = User
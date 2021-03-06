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

userSchema.virtual('tasks',{
    ref: 'Task',
    localField:'_id',
    foreignField: 'owner'
})

userSchema.methods.getPublicData = function() {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject._id;
    return userObject;
}

//to generate authtoken when user signs up or logs in
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    //console.log(user)
    const token = jwt.sign({_id: user._id.toString()},"testingjwt");

    user.tokens = user.tokens.concat({ token });
    //console.log(user)
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

const User = mongoose.model('User',userSchema)

module.exports = User
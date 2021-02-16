const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required.'],
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, 'Please provide your email.'],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ]
    },
    password: {
        type: String,
        required: [true, 'Please password is required.'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id, }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


const User = mongoose.model('User', userSchema);
module.exports = User;
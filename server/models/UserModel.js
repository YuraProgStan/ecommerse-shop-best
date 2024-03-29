const {Schema} = require('mongoose');
const mongoose = require("mongoose");


const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, unique: true},
        isAdmin: {type: Boolean, default: false},
        img: {type: String}
    },
    {timestamps: true}
)

module.exports = mongoose.model('User', UserSchema)
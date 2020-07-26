const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const secret = "Yourlittlesecret";

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password'] });

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
        minLength: 3
    }, },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;
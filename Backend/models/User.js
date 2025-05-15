const { default: mongoose, Schema } = require("mongoose");
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: String
}, { timestamps: true })
const User = mongoose.model('user', UserSchema);
module.exports = User

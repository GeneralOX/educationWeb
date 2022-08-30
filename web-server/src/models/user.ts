import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    username: {
        type: String,
        required: '{PATH} is required!'
    },
    password: {
        type: String,
        required: '{PATH} is required!'
    },
    role: {
        type: Number,
        required: true,
        default: 3
    },
    status: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})
const userModel = mongoose.model('User', UserSchema);

export default userModel
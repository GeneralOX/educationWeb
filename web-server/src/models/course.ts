import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: '{PATH} is required!'
    },
    subtitle: {
        type: String
    },
    imgUrl: {
        type: String
    },
    places: {
        type: Number, required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
})

const CourseModel = mongoose.model('Course', CourseSchema);
export default CourseModel
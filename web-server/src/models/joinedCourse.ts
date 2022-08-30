import mongoose from 'mongoose';

const JoinedCourseSchema = new mongoose.Schema({
    status: {
        type: Boolean, default: false
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const JoinedCourseModel = mongoose.model('JoinedCourse', JoinedCourseSchema);
export default JoinedCourseModel
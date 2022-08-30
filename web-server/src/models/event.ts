import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const EventModel = mongoose.model('Event', EventSchema);
export default EventModel
import mongoose from "mongoose";

const Schema = mongoose.Schema

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    information: {
        type: String
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
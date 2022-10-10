import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    empid: { type: String, required: true, unique: false },
    type: { type: String, required: true, enum: ['break', 'meeting', 'work']},
    starttime: { type: Date, required: true },
    timetaken: { type: Number, required: true },
    description: { type: String, required: true },
})

export default mongoose.model("Task", taskSchema)
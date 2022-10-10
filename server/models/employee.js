import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactnumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    joiningdate: { type: Date, required: true },
    active: { type: Boolean, default: true}
})

export default mongoose.model("Employee", employeeSchema)
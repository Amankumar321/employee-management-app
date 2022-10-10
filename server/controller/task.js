import TaskModal from '../models/task.js'
import EmployeeModal from '../models/employee.js'
import jwt from 'jsonwebtoken'

export const add = async (req, res) => {
    try {
        const type = req.body.type
        const starttime = req.body.starttime
        const timetaken = Math.abs(Math.floor(req.body.timetaken))
        const description = req.body.description

        const d = new Date()
        const s = new Date(starttime)
        s.setMinutes(s.getMinutes() + timetaken)

        if (d.toISOString() < s.toISOString()) return res.status(403).json({ message: "Future dates not allowed" })

        var id = jwt.decode(req.headers.authorization.split(' ')[1])['id']

        const emp = await EmployeeModal.findOne({_id: id})
        if (!emp) return res.status(500).json({ message: "Could not add task" })
        if (!emp.active) return res.status(403).json({ message: "Employee deactivated" })

        id = emp._id.toString()
        await TaskModal.create({ empid: id, type: type, starttime: starttime, timetaken: timetaken, description: description });
        return res.status(200).json({ message: "Successfully created" })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}

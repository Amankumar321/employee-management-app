import EmployeeModal from "../models/employee.js"
import TaskModal from '../models/task.js'
import jwt from 'jsonwebtoken'

export const add = async (req, res) => {
    try {
            const name = req.body.name
            const password = req.body.password
            const email = req.body.email
            const contactnumber = req.body.contactnumber
            const joiningdate = req.body.joiningdate
            const department = req.body.department

            var oldUser = await EmployeeModal.findOne({ username: name });
            if (oldUser) return res.status(403).json({ message: "Name already exists" });
            oldUser = await EmployeeModal.findOne({ email: email });
            if (oldUser) return res.status(403).json({ message: "Email already exists" });
            oldUser = await EmployeeModal.findOne({ contactnumber: contactnumber });
            if (oldUser) return res.status(403).json({ message: "Contact number already exists" });
            
            var newUser = await EmployeeModal.create({ username: name, password: password, email: email, contactnumber, contactnumber, joiningdate: joiningdate, department: department, active: true });
            if (!newUser) return res.status(500).json({ message: "Could not create user" })

            return res.status(200).json({ message: "Successfully created" })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}



export const getall = async (req, res) => {
    try {
            const allEmp = await EmployeeModal.find({})
            return res.status(200).json({ employees: allEmp })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}


export const gettasks = async (req, res) => {
    try {
        const username = req.body.username
        var oldUser = await EmployeeModal.findOne({ username: username });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });

        const tasks = await TaskModal.find({empid: oldUser._id})
        var todayTasks = []
        var yesterdayTasks = []
        var weeklyTasks = []
    
        var currd = new Date().toISOString().slice(0,10)
        var prevd = new Date()
        prevd.setDate(prevd.getDate() - 1);
        prevd = prevd.toISOString().slice(0,10)

        const weekDates = []
        var tempd = new Date()
        for (let i = 0; i < 7; i++) {
            weekDates.unshift(tempd.toISOString().slice(0,10))
            tempd.setDate(tempd.getDate() - 1);
        }

        for (let i = 0; i < weekDates.length; i++) {
            weeklyTasks.push({date: weekDates[i], tasks: []})
        }

        var taskdate;
    
        tasks.forEach(t => {
            taskdate = t.starttime.toISOString().slice(0,10)
            var inWeek = false, i = 0;
            for (; i < weekDates.length; i++) {
                if (weekDates[i] === taskdate) {
                    inWeek = true
                    break
                }
            }
            if (inWeek) {
                weeklyTasks[i].tasks.push(t)
            }
            if (taskdate === currd) {
                todayTasks.push(t)
            }
            else if (taskdate === prevd) {
                yesterdayTasks.push(t)
            }
        });

        return res.status(200).json({ yesterdayTasks, todayTasks, weeklyTasks })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}


export const getmytasks = async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1])['id']
        var oldUser = await EmployeeModal.findOne({ _id: id });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });

        const tasks = await TaskModal.find({empid: oldUser._id})
        var todayTasks = []
        var yesterdayTasks = []
        var weeklyTasks = []
    
        var currd = new Date().toISOString().slice(0,10)
        var prevd = new Date()
        prevd.setDate(prevd.getDate() - 1);
        prevd = prevd.toISOString().slice(0,10)

        const weekDates = []
        var tempd = new Date()
        for (let i = 0; i < 7; i++) {
            weekDates.unshift(tempd.toISOString().slice(0,10))
            tempd.setDate(tempd.getDate() - 1);
        }

        for (let i = 0; i < weekDates.length; i++) {
            weeklyTasks.push({date: weekDates[i], tasks: []})
        }

        var taskdate;
    
        tasks.forEach(t => {
            taskdate = t.starttime.toISOString().slice(0,10)
            var inWeek = false, i = 0;
            for (; i < weekDates.length; i++) {
                if (weekDates[i] === taskdate) {
                    inWeek = true
                    break
                }
            }
            if (inWeek) {
                weeklyTasks[i].tasks.push(t)
            }
            if (taskdate === currd) {
                todayTasks.push(t)
            }
            else if (taskdate === prevd) {
                yesterdayTasks.push(t)
            }
        });

        return res.status(200).json({ yesterdayTasks, todayTasks, weeklyTasks })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}



export const gettasksbydate = async (req, res) => {
    try {
        const username = req.body.username
        const date = req.body.date

        var oldUser = await EmployeeModal.findOne({ username: username });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });

        const tasks = await TaskModal.find({empid: oldUser._id})
        var tasksByDate = []

        var taskdate;
    
        tasks.forEach(t => {
            taskdate = t.starttime.toISOString().slice(0,10)
            if (taskdate === date) {
                tasksByDate.push(t)
            }
        });

        return res.status(200).json({ tasks: tasksByDate })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}


export const getmytasksbydate = async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1])['id']
        const date = req.body.date

        var oldUser = await EmployeeModal.findOne({ _id: id });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });

        const tasks = await TaskModal.find({empid: oldUser._id})
        var tasksByDate = []

        var taskdate;
    
        tasks.forEach(t => {
            taskdate = t.starttime.toISOString().slice(0,10)
            if (taskdate === date) {
                tasksByDate.push(t)
            }
        });

        return res.status(200).json({ tasks: tasksByDate })
    }
    catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}



export const deactivate = async (req, res) => {
    try {
        const username = req.body.username
        
        var oldUser = await EmployeeModal.findOne({ username: username });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });
        if (!oldUser.active) return res.status(200).json({ message: "Employee already deactivated" });
        
        await EmployeeModal.findOneAndUpdate({username: username}, {active: false})
        return res.status(200).json({ message: "Successfully deactivated" });
    } catch (error) {
        return res.status(500).json({ message: "Error occured" });
    }
}



export const edit = async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1])['id']
        const username = req.body.name
        const password = req.body.password
        const contactnumber = req.body.contactnumber
        const department = req.body.department

        const oldUser = await EmployeeModal.findOne({ _id: id });
        if (!oldUser) return res.status(403).json({ message: "Employee does not exist" });
        
        var user;
        if (oldUser.username !== username) {
            user = await EmployeeModal.findOne({ username: username });
            if (user) return res.status(403).json({ message: "Username already exists" });
        }

        if (oldUser.contactnumber !== contactnumber) {
            user = await EmployeeModal.findOne({ contactnumber: contactnumber });
            if (user) return res.status(403).json({ message: "Contact number already exists" });
        }

        await EmployeeModal.findOneAndUpdate({_id: id}, {username: username, password: password, contactnumber: contactnumber, department: department})
        return res.status(200).json({ message: "Successfully updated" });
        
    } catch (error) {
        return res.status(500).json({ message: "Unknown error" });
    }
}


export const getprofile = async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization.split(' ')[1])['id']

        var oldUser = await EmployeeModal.findOne({ _id: id });
        if (!oldUser) return res.status(404).json({ message: "Employee does not exist" });
        return res.status(200).json({profile: {username: oldUser.username, contactnumber: oldUser.contactnumber, department: oldUser.department}})
    }
    catch (error) {
        return res.status(500).json({ message: "Unknown error" });
    }
}
import AdminModal from "../models/admin.js"
import EmployeeModal from "../models/employee.js"
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const isadmin = req.body.isadmin
        
        if (isadmin === true) {
            const oldUser = await AdminModal.findOne({ username: username })
            if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })
        
            const isPasswordCorrect = (password === oldUser.password)
            if (!isPasswordCorrect) return res.status(401).json({ message: "Incorrect password" })
    
            const token = jwt.sign({ id: oldUser._id }, 'admin', { expiresIn: '12h' })
            return res.status(200).json({ token: token, type: 'admin' })
        }

        else {
            const oldUser = await EmployeeModal.findOne({ username: username })
            if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })
        
            const isPasswordCorrect = (password === oldUser.password)
            if (!isPasswordCorrect) return res.status(401).json({ message: "Incorrect password" })

            if (!oldUser.active) return res.status(403).json({ message: "Employee deactivated" })
    
            const token = jwt.sign({ id: oldUser._id }, 'employee', { expiresIn: '12h' })
            return res.status(200).json({ token: token, type: 'employee' })
        }
        
    } catch (error) {
        return res.status(500).json({message: 'Unknown error'})
    }
}

export const signup = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const isadmin = req.body.isadmin

        if (isadmin === true) {
            const oldUser = await AdminModal.findOne({ username: username });
    
            if (oldUser) return res.status(403).json({ message: "User already exists" });

            var newUser = await AdminModal.create({ username: username, password: password });
            if (!newUser) return res.status(500).json({ message: "Could not create user" })

            const token = jwt.sign({ id: newUser._id.toString() }, 'admin', { expiresIn: '12h' })

            res.status(200).json({ token: token, type: 'admin' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Unknown error'})
    }
}

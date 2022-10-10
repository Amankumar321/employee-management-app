import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './router/user.js'
import taskRoutes from './router/task.js'
import employeeRoutes from './router/employee.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL

app.use(cors())
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/employee', employeeRoutes)

app.get('/', (req, res) => {
    res.send('running')
})

mongoose.connect(CONNECTION_URL)
.then(() =>{
    app.listen(PORT, () => {
        
    })
})
.catch((error) => {
    console.log(error);
})
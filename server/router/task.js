import express from 'express'
import { add } from '../controller/task.js'
import authEmployee from '../middleware/authEmployee.js'

const router = express.Router()

router.post("/add", authEmployee, add)

export default router
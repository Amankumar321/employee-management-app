import express from 'express'
import { add, deactivate, getall, gettasks, getmytasks, gettasksbydate, getmytasksbydate, edit, getprofile } from "../controller/employee.js"
import authAdmin from '../middleware/authAdmin.js'
import authEmployee from '../middleware/authEmployee.js'

const router = express.Router()

router.post("/add", authAdmin, add)
router.post("/deactivate", authAdmin, deactivate)
router.get("/getall", authAdmin, getall)
router.post("/tasks", authAdmin, gettasks)
router.get("/mytasks", authEmployee, getmytasks)
router.post("/tasksbydate", authAdmin, gettasksbydate)
router.post("/mytasksbydate", authEmployee, getmytasksbydate)
router.post("/deactivate", authAdmin, deactivate)
router.post("/edit", authEmployee, edit)
router.get("/", authEmployee, getprofile)

export default router
import { Hono } from 'hono'
import { UserDepartmentsController } from '../controllers/user_departments.controller.js'

const userDepartments = new Hono()

userDepartments.post('/', UserDepartmentsController.assign)
userDepartments.get('/user/:user_id', UserDepartmentsController.getByUser)

export default userDepartments
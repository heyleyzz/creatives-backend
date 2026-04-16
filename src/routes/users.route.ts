import { Hono } from 'hono'
import { UsersController } from '../controllers/users.controller.js'
const users = new Hono()

users.get('/',                    UsersController.getAll)
users.get('/:id',                 UsersController.getById)
users.post('/',                   UsersController.create)
users.delete('/:id',              UsersController.delete)

users.post('/login',    UsersController.login)
users.post('/register', UsersController.register)
export default users
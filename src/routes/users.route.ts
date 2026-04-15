import { Hono } from 'hono'
import { UsersController } from '../controllers/users.controller.js'
const user = new Hono()

user.get('/',                    UsersController.getAll)
user.get('/event/:event_id',     UsersController.getByEventId)
user.get('/:id',                 UsersController.getById)
user.post('/',                   UsersController.create)
user.put('/:id',                 UsersController.update)
user.delete('/:id',              UsersController.delete)

export default user
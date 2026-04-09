import { Hono } from 'hono'
import { TasksController } from '../controllers/tasks.controller.js'

const tasks = new Hono()

tasks.get('/',                             TasksController.getAll)
tasks.get('/:id',                          TasksController.getById)
tasks.get('/event/:event_id',              TasksController.getByEventId)
tasks.get('/assigned/:creatives_id',       TasksController.getByCreativeId)
tasks.post('/',                            TasksController.create)
tasks.put('/:id',                          TasksController.update)
tasks.patch('/:id/status',                 TasksController.updateStatus)
tasks.delete('/:id',                       TasksController.delete)

export default tasks
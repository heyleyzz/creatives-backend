import { Hono } from 'hono'
import { EventsController } from '../controllers/events.controller.js'

const events = new Hono()

events.get('/',     EventsController.getAll)
events.get('/:id', EventsController.getById)
events.post('/',   EventsController.create)
events.put('/:id', EventsController.update)
events.delete('/:id', EventsController.delete)

export default events
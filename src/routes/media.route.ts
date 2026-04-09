import { Hono } from 'hono'
import { MediaController } from '../controllers/media.controller.js'

const media = new Hono()

media.get('/',                    MediaController.getAll)
media.get('/:id',                 MediaController.getById)
media.get('/event/:event_id',     MediaController.getByEventId)
media.post('/',                   MediaController.create)
media.put('/:id',                 MediaController.update)
media.delete('/:id',              MediaController.delete)

export default media
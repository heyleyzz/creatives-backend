import { Hono } from 'hono'
import { CreativesController } from '../controllers/creatives.controller.js'

const creatives = new Hono()

creatives.get('/',     CreativesController.getAll)
creatives.get('/:id', CreativesController.getById)
creatives.post('/',   CreativesController.create)
creatives.put('/:id', CreativesController.update)
creatives.delete('/:id', CreativesController.delete)

export default creatives
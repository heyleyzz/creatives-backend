import { Hono } from 'hono'
import { CategoriesController } from '../controllers/categories.controller.js'

const categories = new Hono()

categories.get('/',     CategoriesController.getAll)
categories.get('/:id', CategoriesController.getById)
categories.post('/',   CategoriesController.create)
categories.put('/:id', CategoriesController.update)
categories.delete('/:id', CategoriesController.delete)

export default categories
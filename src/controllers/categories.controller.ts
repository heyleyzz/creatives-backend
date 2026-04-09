import type { Context } from 'hono'
import { CategoriesModel } from '../models/categories.model.js'

export const CategoriesController = {

  getAll: async (c: Context) => {
    try {
      const data = await CategoriesModel.getAll()
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch categories' }, 500)
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const data = await CategoriesModel.getById(id)
      if (!data) return c.json({ error: 'Category not found' }, 404)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch category' }, 500)
    }
  },

  create: async (c: Context) => {
    try {
      const body = await c.req.json()
      const { category_name } = body

      if (!category_name) {
        return c.json({ error: 'category_name is required' }, 400)
      }

      await CategoriesModel.create(body)
      return c.json({ message: 'Category created successfully' }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to create category' }, 500)
    }
  },

  update: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const body = await c.req.json()
      await CategoriesModel.update(id, body)
      return c.json({ message: 'Category updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update category' }, 500)
    }
  },

  delete: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const result: any = await CategoriesModel.delete(id)
      if (result.affectedRows === 0) return c.json({ error: 'Category not found' }, 404)
      return c.json({ message: 'Category deleted successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to delete category' }, 500)
    }
  },

}
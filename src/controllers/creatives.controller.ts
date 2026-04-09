import type { Context } from 'hono'
import { CreativesModel } from '../models/creatives.model.js'

export const CreativesController = {

  getAll: async (c: Context) => {
    try {
      const data = await CreativesModel.getAll()
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch creatives' }, 500)
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const data = await CreativesModel.getById(id)
      if (!data) return c.json({ error: 'Creative not found' }, 404)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch creative' }, 500)
    }
  },

  create: async (c: Context) => {
    try {
      const body = await c.req.json()
      const { first_name, last_name, role } = body

      if (!first_name || !last_name || !role) {
        return c.json({ error: 'first_name, last_name, and role are required' }, 400)
      }

      await CreativesModel.create(body)
      return c.json({ message: 'Creative created successfully' }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to create creative' }, 500)
    }
  },

  update: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const body = await c.req.json()
      await CreativesModel.update(id, body)
      return c.json({ message: 'Creative updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update creative' }, 500)
    }
  },

  delete: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const result: any = await CreativesModel.delete(id)
      if (result.affectedRows === 0) return c.json({ error: 'Creative not found' }, 404)
      return c.json({ message: 'Creative deleted successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to delete creative' }, 500)
    }
  },

}
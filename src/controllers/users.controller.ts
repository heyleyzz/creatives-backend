import type { Context } from 'hono'
import { UsersModel } from '../models/users.model.js'

export const UsersController = {

  getAll: async (c: Context) => {
    const data = await UsersModel.getAll()
    return c.json(data)
  },

  getById: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const data = await UsersModel.getById(id)

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json(data)
  },

  getByEventId: async (c: Context) => {
    const eventId = Number(c.req.param('event_id'))
    const data = await UsersModel.getByEventId(eventId)

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return c.json({ error: 'No users found for that event' }, 404)
    }

    return c.json(data)
  },

  create: async (c: Context) => {
    const body = await c.req.json()
    const { first_name, last_name, email, password, role_id } = body

    if (!first_name || !last_name || !email || !password || !role_id) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    await UsersModel.create(body)
    return c.json({ message: 'User created' }, 201)
  },

  update: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()
    const { first_name, last_name, email, password, role_id } = body

    if (!first_name || !last_name || !email || !password || !role_id) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // ✅ Model already returns ResultSetHeader directly — no destructuring needed
    const result = await UsersModel.update(id, body)

    if (result.affectedRows === 0) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({ message: 'User updated' })
  },

  delete: async (c: Context) => {
    const id = Number(c.req.param('id'))

    // ✅ Model already returns ResultSetHeader directly — no destructuring needed
    const result = await UsersModel.delete(id)

    if (result.affectedRows === 0) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({ message: 'User deleted' })
  }

}
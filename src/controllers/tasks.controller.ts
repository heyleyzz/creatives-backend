import type { Context } from 'hono'
import { TasksModel } from '../models/tasks.model.js'

const STATUS = ['pending', 'in_progress', 'completed']

export const TasksController = {

  getAll: async (c: Context) => {
    const data = await TasksModel.getAll()
    return c.json(data)
  },

  getByUser: async (c: Context) => {
    const user_id = Number(c.req.param('user_id'))
    const data = await TasksModel.getByUser(user_id)
    return c.json(data)
  },

  create: async (c: Context) => {
    const body = await c.req.json()
    const { title, assigned_to, assigned_by } = body

    if (!title || !assigned_to || !assigned_by) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    await TasksModel.create(body)
    return c.json({ message: 'Task created' }, 201)
  },

  updateStatus: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const { status } = await c.req.json()

    if (!STATUS.includes(status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }

    await TasksModel.updateStatus(id, status)
    return c.json({ message: 'Status updated' })
  },

  delete: async (c: Context) => {
    const id = Number(c.req.param('id'))
    await TasksModel.delete(id)
    return c.json({ message: 'Task deleted' })
  }

}
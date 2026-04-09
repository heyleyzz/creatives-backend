import type { Context } from 'hono'
import { TasksModel } from '../models/tasks.model.js'

const ALLOWED_STATUS = ['Active', 'Inactive']

export const TasksController = {

  getAll: async (c: Context) => {
    try {
      const data = await TasksModel.getAll()
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch tasks' }, 500)
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const data = await TasksModel.getById(id)
      if (!data) return c.json({ error: 'Task not found' }, 404)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch task' }, 500)
    }
  },

  getByEventId: async (c: Context) => {
    try {
      const event_id = Number(c.req.param('event_id'))
      const data = await TasksModel.getByEventId(event_id)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch tasks for event' }, 500)
    }
  },

  getByCreativeId: async (c: Context) => {
    try {
      const creatives_id = Number(c.req.param('creatives_id'))
      const data = await TasksModel.getByCreativeId(creatives_id)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch tasks for creative' }, 500)
    }
  },

  create: async (c: Context) => {
    try {
      const body = await c.req.json()
      const { task_title, due_date } = body

      if (!task_title || !due_date) {
        return c.json({ error: 'task_title and due_date are required' }, 400)
      }

      await TasksModel.create(body)
      return c.json({ message: 'Task created successfully' }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to create task' }, 500)
    }
  },

  update: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const body = await c.req.json()
      await TasksModel.update(id, body)
      return c.json({ message: 'Task updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update task' }, 500)
    }
  },

  updateStatus: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const { status } = await c.req.json()

      if (!ALLOWED_STATUS.includes(status)) {
        return c.json({ error: `status must be one of: ${ALLOWED_STATUS.join(', ')}` }, 400)
      }

      await TasksModel.updateStatus(id, status)
      return c.json({ message: 'Task status updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update task status' }, 500)
    }
  },

  delete: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const result: any = await TasksModel.delete(id)
      if (result.affectedRows === 0) return c.json({ error: 'Task not found' }, 404)
      return c.json({ message: 'Task deleted successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to delete task' }, 500)
    }
  },

}
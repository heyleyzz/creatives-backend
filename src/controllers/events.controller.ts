import type { Context } from 'hono'
import { EventsModel } from '../models/events.model.js'

export const EventsController = {

  getAll: async (c: Context) => {
    try {
      const data = await EventsModel.getAll()
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch events' }, 500)
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const data = await EventsModel.getById(id)
      if (!data) return c.json({ error: 'Event not found' }, 404)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch event' }, 500)
    }
  },

  create: async (c: Context) => {
    try {
      const body = await c.req.json()
      const { event_name } = body

      if (!event_name) {
        return c.json({ error: 'event_name is required' }, 400)
      }

      await EventsModel.create(body)
      return c.json({ message: 'Event created successfully' }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to create event' }, 500)
    }
  },

  update: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const body = await c.req.json()
      await EventsModel.update(id, body)
      return c.json({ message: 'Event updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update event' }, 500)
    }
  },

  delete: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const result: any = await EventsModel.delete(id)
      if (result.affectedRows === 0) return c.json({ error: 'Event not found' }, 404)
      return c.json({ message: 'Event deleted successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to delete event' }, 500)
    }
  },

}
import type { Context } from 'hono'
import { MediaModel } from '../models/media.model.js'

const ALLOWED_TYPES = ['JPEG', 'PNG', 'MP4']

export const MediaController = {

  getAll: async (c: Context) => {
    try {
      const data = await MediaModel.getAll()
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch media' }, 500)
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const data = await MediaModel.getById(id)
      if (!data) return c.json({ error: 'Media not found' }, 404)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch media' }, 500)
    }
  },

  getByEventId: async (c: Context) => {
    try {
      const event_id = Number(c.req.param('event_id'))
      const data = await MediaModel.getByEventId(event_id)
      return c.json(data)
    } catch (error) {
      return c.json({ error: 'Failed to fetch media for event' }, 500)
    }
  },

  create: async (c: Context) => {
    try {
      const body = await c.req.json()
      const { file_name, file_type } = body

      if (!file_name) {
        return c.json({ error: 'file_name is required' }, 400)
      }

      if (file_type && !ALLOWED_TYPES.includes(file_type)) {
        return c.json({ error: `file_type must be one of: ${ALLOWED_TYPES.join(', ')}` }, 400)
      }

      await MediaModel.create(body)
      return c.json({ message: 'Media uploaded successfully' }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to upload media' }, 500)
    }
  },

  update: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const body = await c.req.json()
      await MediaModel.update(id, body)
      return c.json({ message: 'Media updated successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to update media' }, 500)
    }
  },

  delete: async (c: Context) => {
    try {
      const id = Number(c.req.param('id'))
      const result: any = await MediaModel.delete(id)
      if (result.affectedRows === 0) return c.json({ error: 'Media not found' }, 404)
      return c.json({ message: 'Media deleted successfully' })
    } catch (error) {
      return c.json({ error: 'Failed to delete media' }, 500)
    }
  },

}
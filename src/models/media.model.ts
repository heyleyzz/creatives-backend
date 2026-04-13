// src/models/media.model.ts
import { db } from '../config/db.js'
import { media } from '../config/schema.js'
import { eq } from 'drizzle-orm'

export const MediaModel = {

  getAll: async () => {
    const result = await db.select().from(media)
    return result
  },

  getById: async (id: number) => {
    const result = await db.select()
      .from(media)
      .where(eq(media.media_id, id))
    return result[0] ?? null
  },

  getByEvent: async (event_id: number) => {
    const result = await db.select()
      .from(media)
      .where(eq(media.event_id, event_id))
    return result
  },

  getByUploadedBy: async (uploaded_by: number) => {
    const result = await db.select()
      .from(media)
      .where(eq(media.uploaded_by, uploaded_by))
    return result
  },

  create: async (data: {
    event_id?: number
    uploaded_by?: number
    file_name: string
    file_type?: 'JPEG' | 'PNG' | 'MP4'
    file_path?: string
    description?: string
  }) => {
    const result = await db.insert(media).values({
      event_id: data.event_id ?? null,
      uploaded_by: data.uploaded_by ?? null,
      file_name: data.file_name,
      file_type: data.file_type ?? null,
      file_path: data.file_path ?? null,
      description: data.description ?? null
    })
    return result
  },

  update: async (id: number, data: {
    event_id?: number
    uploaded_by?: number
    file_name?: string
    file_type?: 'JPEG' | 'PNG' | 'MP4'
    file_path?: string
    description?: string
  }) => {
    const result = await db.update(media)
      .set(data)
      .where(eq(media.media_id, id))
    return result
  },

  delete: async (id: number) => {
    const result = await db.delete(media)
      .where(eq(media.media_id, id))
    return result
  },

}
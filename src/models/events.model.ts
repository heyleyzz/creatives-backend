// src/models/events.model.ts
import { db } from '../config/db.js'
import { events } from '../config/schema.js'
import { eq } from 'drizzle-orm'

export const EventsModel = {

  getAll: async () => {
    const result = await db.select().from(events)
    return result
  },

  getById: async (id: number) => {
    const result = await db.select()
      .from(events)
      .where(eq(events.event_id, id))
    return result[0] ?? null
  },

  getByCategory: async (category_id: number) => {
    const result = await db.select()
      .from(events)
      .where(eq(events.category_id, category_id))
    return result
  },

  getByCreatedBy: async (created_by: number) => {
    const result = await db.select()
      .from(events)
      .where(eq(events.created_by, created_by))
    return result
  },

  create: async (data: {
    event_name: string
    event_date?: string
    description?: string
    category_id?: number
    created_by?: number
  }) => {
    const result = await db.insert(events).values({
      event_name: data.event_name,
      event_date: data.event_date ? new Date(data.event_date) : null,
      description: data.description ?? null,
      category_id: data.category_id ?? null,
      created_by: data.created_by ?? null
    })
    return result
  },

  update: async (id: number, data: {
    event_name?: string
    event_date?: string
    description?: string
    category_id?: number
    created_by?: number
  }) => {
    const result = await db.update(events)
      .set({
        ...data,
        event_date: data.event_date ? new Date(data.event_date) : undefined  // ← convert if present
      })
      .where(eq(events.event_id, id))
    return result
  },

  delete: async (id: number) => {
    const result = await db.delete(events)
      .where(eq(events.event_id, id))
    return result
  },

}
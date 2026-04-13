// src/models/creatives.model.ts
import { db } from '../config/db.js'
import { creatives } from '../config/schema.js'
import { eq } from 'drizzle-orm'

export const CreativesModel = {

  getAll: async () => {
    const result = await db.select().from(creatives)
    return result
  },

  getById: async (id: number) => {
    const result = await db.select()
      .from(creatives)
      .where(eq(creatives.creatives_id, id))
    return result[0] ?? null
  },

  getByEmail: async (email: string) => {
    const result = await db.select()
      .from(creatives)
      .where(eq(creatives.email, email))
    return result[0] ?? null
  },

  create: async (data: {
    first_name: string
    last_name: string
    email: string
    password: string
    role: string
    status?: 'Active' | 'Inactive'
  }) => {
    const result = await db.insert(creatives).values({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
      status: data.status ?? 'Active'
    })
    return result
  },

  update: async (id: number, data: {
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    role?: string
    status?: 'Active' | 'Inactive'
  }) => {
    const result = await db.update(creatives)
      .set(data)
      .where(eq(creatives.creatives_id, id))
    return result
  },

  delete: async (id: number) => {
    const result = await db.delete(creatives)
      .where(eq(creatives.creatives_id, id))
    return result
  },

}
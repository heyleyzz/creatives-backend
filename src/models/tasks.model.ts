// src/models/tasks.model.ts
import { db } from '../config/db.js'
import { tasks } from '../config/schema.js'
import { eq } from 'drizzle-orm'

export const TasksModel = {

  getAll: async () => {
    const result = await db.select().from(tasks)
    return result
  },

  getById: async (id: number) => {
    const result = await db.select()
      .from(tasks)
      .where(eq(tasks.task_id, id))
    return result[0] ?? null
  },

  getByEvent: async (event_id: number) => {
    const result = await db.select()
      .from(tasks)
      .where(eq(tasks.event_id, event_id))
    return result
  },

  getByAssignedTo: async (assigned_to: number) => {
    const result = await db.select()
      .from(tasks)
      .where(eq(tasks.assigned_to, assigned_to))
    return result
  },

  getByStatus: async (status: 'Active' | 'Inactive') => {
    const result = await db.select()
      .from(tasks)
      .where(eq(tasks.status, status))
    return result
  },

  create: async (data: {
    event_id?: number
    assigned_to?: number
    task_title: string
    task_description?: string
    status?: 'Active' | 'Inactive'
    due_date: string
  }) => {
    const result = await db.insert(tasks).values({
      event_id: data.event_id ?? null,
      assigned_to: data.assigned_to ?? null,
      task_title: data.task_title,
      task_description: data.task_description ?? null,
      status: data.status ?? 'Active',
      due_date: new Date(data.due_date)  // ← convert string to Date
    })
    return result
  },

  update: async (id: number, data: {
    event_id?: number
    assigned_to?: number
    task_title?: string
    task_description?: string
    status?: 'Active' | 'Inactive'
    due_date?: string
  }) => {
    const result = await db.update(tasks)
      .set({
        ...data,
        due_date: data.due_date ? new Date(data.due_date) : undefined  // ← convert if present
      })
      .where(eq(tasks.task_id, id))
    return result
  },

  delete: async (id: number) => {
    const result = await db.delete(tasks)
      .where(eq(tasks.task_id, id))
    return result
  },

}
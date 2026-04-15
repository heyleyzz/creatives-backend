import { db } from '../config/db.js'
import type { ResultSetHeader } from 'mysql2'

export const UsersModel = {

  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
  },

  getById: async (id: number) => {
    const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id])
    return rows[0]
  },

  getByEventId: async (eventId: number) => {
    const [rows] = await db.query('SELECT * FROM users WHERE event_id = ?', [eventId])
    return rows
  },

  create: async (user: any) => {
    const { first_name, last_name, email, password, role_id } = user

    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, password, role_id]
    )
    return result
  },

  update: async (id: number, body: any): Promise<ResultSetHeader> => {
    const { first_name, last_name, email, password, role_id } = body

    const [result] = await db.query<ResultSetHeader>(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
      [first_name, last_name, email, password, role_id, id]
    )
    return result
  },

  delete: async (id: number): Promise<ResultSetHeader> => {
    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    return result
  }

}
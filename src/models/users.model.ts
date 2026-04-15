import { db } from '../config/db.js'

export const UsersModel = {

  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
  },

  getById: async (id: number) => {
    const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id])
    return rows[0]
  },

  create: async (user: any) => {
    const { first_name, last_name, email, password, role_id } = user

    return db.query(
      'INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, password, role_id]
    )
  },

  delete: async (id: number) => {
    return db.query('DELETE FROM users WHERE id = ?', [id])
  }

}
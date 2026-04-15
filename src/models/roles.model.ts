import { db } from '../config/db.js'

export const RolesModel = {

  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM roles')
    return rows
  },

  create: async ({ name }: any) => {
    return db.query('INSERT INTO roles (name) VALUES (?)', [name])
  },

  delete: async (id: number) => {
    return db.query('DELETE FROM roles WHERE id = ?', [id])
  }

}

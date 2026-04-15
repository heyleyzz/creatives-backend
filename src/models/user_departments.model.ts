import { db } from '../config/db.js'

export const UserDepartmentsModel = {

  assign: async (user_id: number, department_id: number) => {
    return db.query(
      'INSERT INTO user_departments (user_id, department_id) VALUES (?, ?)',
      [user_id, department_id]
    )
  },

  getByUser: async (user_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM user_departments WHERE user_id = ?',
      [user_id]
    )
    return rows
  }

}
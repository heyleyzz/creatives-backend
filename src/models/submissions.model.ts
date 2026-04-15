import { db } from '../config/db.js'

export const SubmissionsModel = {

  getByTask: async (task_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM submissions WHERE task_id = ?',
      [task_id]
    )
    return rows
  },

  create: async (data: any) => {
    const { task_id, user_id } = data

    return db.query(
      'INSERT INTO submissions (task_id, user_id) VALUES (?, ?)',
      [task_id, user_id]
    )
  },

  updateStatus: async (id: number, status: string) => {
    return db.query(
      'UPDATE submissions SET status = ? WHERE id = ?',
      [status, id]
    )
  }

}
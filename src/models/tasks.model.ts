import { db } from '../config/db.js'

export const TasksModel = {

  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tasks')
    return rows
  },

  getByUser: async (user_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE assigned_to = ?',
      [user_id]
    )
    return rows
  },

  create: async (task: any) => {
    const { title, description, dueDate, department, status } = task

    return db.query(
      'INSERT INTO tasks (title, description, dueDate, department, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, dueDate, department, status]
    )
  },

  updateStatus: async (id: number, status: string) => {
    return db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    )
  },

  delete: async (id: number) => {
    return db.query('DELETE FROM tasks WHERE id = ?', [id])
  }

}
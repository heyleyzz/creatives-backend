import db from '../config/db.js'
 
export const TasksModel = {
 
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT t.*, e.event_name, cr.first_name, cr.last_name
      FROM Tasks t
      LEFT JOIN Events    e  ON t.event_id    = e.event_id
      LEFT JOIN Creatives cr ON t.assigned_to = cr.creatives_id
    `)
    return rows
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.query(`
      SELECT t.*, e.event_name, cr.first_name, cr.last_name
      FROM Tasks t
      LEFT JOIN Events    e  ON t.event_id    = e.event_id
      LEFT JOIN Creatives cr ON t.assigned_to = cr.creatives_id
      WHERE t.task_id = ?
    `, [id])
    return rows[0] ?? null
  },
 
  getByEventId: async (event_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM Tasks WHERE event_id = ?',
      [event_id]
    )
    return rows
  },
 
  getByCreativeId: async (creatives_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM Tasks WHERE assigned_to = ?',
      [creatives_id]
    )
    return rows
  },
 
  create: async (data: {
    event_id?: number
    assigned_to?: number
    task_title: string
    task_description?: string
    status?: string
    due_date: string
  }) => {
    const { event_id, assigned_to, task_title, task_description, status, due_date } = data
    const [result] = await db.query(
      'INSERT INTO Tasks (event_id, assigned_to, task_title, task_description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [event_id, assigned_to, task_title, task_description, status ?? 'Active', due_date]
    )
    return result
  },
 
  update: async (id: number, data: {
    event_id?: number
    assigned_to?: number
    task_title?: string
    task_description?: string
    status?: string
    due_date?: string
  }) => {
    const { event_id, assigned_to, task_title, task_description, status, due_date } = data
    const [result] = await db.query(
      'UPDATE Tasks SET event_id = ?, assigned_to = ?, task_title = ?, task_description = ?, status = ?, due_date = ? WHERE task_id = ?',
      [event_id, assigned_to, task_title, task_description, status, due_date, id]
    )
    return result
  },
 
  updateStatus: async (id: number, status: string) => {
    const [result] = await db.query(
      'UPDATE Tasks SET status = ? WHERE task_id = ?',
      [status, id]
    )
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.query(
      'DELETE FROM Tasks WHERE task_id = ?',
      [id]
    )
    return result
  },
 
}

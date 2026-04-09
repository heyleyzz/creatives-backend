import db from '../config/db.js'
 
export const EventsModel = {
 
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT e.*, c.category_name, cr.first_name, cr.last_name
      FROM Events e
      LEFT JOIN Categories c  ON e.category_id  = c.category_id
      LEFT JOIN Creatives cr  ON e.created_by    = cr.creatives_id
    `)
    return rows
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.query(`
      SELECT e.*, c.category_name, cr.first_name, cr.last_name
      FROM Events e
      LEFT JOIN Categories c  ON e.category_id  = c.category_id
      LEFT JOIN Creatives cr  ON e.created_by    = cr.creatives_id
      WHERE e.event_id = ?
    `, [id])
    return rows[0] ?? null
  },
 
  create: async (data: {
    event_name: string
    event_date?: string
    description?: string
    category_id?: number
    created_by?: number
  }) => {
    const { event_name, event_date, description, category_id, created_by } = data
    const [result] = await db.query(
      'INSERT INTO Events (event_name, event_date, description, category_id, created_by) VALUES (?, ?, ?, ?, ?)',
      [event_name, event_date, description, category_id, created_by]
    )
    return result
  },
 
  update: async (id: number, data: {
    event_name?: string
    event_date?: string
    description?: string
    category_id?: number
    created_by?: number
  }) => {
    const { event_name, event_date, description, category_id, created_by } = data
    const [result] = await db.query(
      'UPDATE Events SET event_name = ?, event_date = ?, description = ?, category_id = ?, created_by = ? WHERE event_id = ?',
      [event_name, event_date, description, category_id, created_by, id]
    )
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.query(
      'DELETE FROM Events WHERE event_id = ?',
      [id]
    )
    return result
  },
 
}

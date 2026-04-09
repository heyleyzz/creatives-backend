import db from '../config/db.js'
 
export const MediaModel = {
 
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT m.*, e.event_name, cr.first_name, cr.last_name
      FROM Media m
      LEFT JOIN Events    e  ON m.event_id    = e.event_id
      LEFT JOIN Creatives cr ON m.uploaded_by = cr.creatives_id
    `)
    return rows
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.query(`
      SELECT m.*, e.event_name, cr.first_name, cr.last_name
      FROM Media m
      LEFT JOIN Events    e  ON m.event_id    = e.event_id
      LEFT JOIN Creatives cr ON m.uploaded_by = cr.creatives_id
      WHERE m.media_id = ?
    `, [id])
    return rows[0] ?? null
  },
 
  getByEventId: async (event_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM Media WHERE event_id = ?',
      [event_id]
    )
    return rows
  },
 
  create: async (data: {
    event_id?: number
    uploaded_by?: number
    file_name: string
    file_type?: string
    file_path?: string
    description?: string
  }) => {
    const { event_id, uploaded_by, file_name, file_type, file_path, description } = data
    const [result] = await db.query(
      'INSERT INTO Media (event_id, uploaded_by, file_name, file_type, file_path, description) VALUES (?, ?, ?, ?, ?, ?)',
      [event_id, uploaded_by, file_name, file_type, file_path, description]
    )
    return result
  },
 
  update: async (id: number, data: {
    event_id?: number
    uploaded_by?: number
    file_name?: string
    file_type?: string
    file_path?: string
    description?: string
  }) => {
    const { event_id, uploaded_by, file_name, file_type, file_path, description } = data
    const [result] = await db.query(
      'UPDATE Media SET event_id = ?, uploaded_by = ?, file_name = ?, file_type = ?, file_path = ?, description = ? WHERE media_id = ?',
      [event_id, uploaded_by, file_name, file_type, file_path, description, id]
    )
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.query(
      'DELETE FROM Media WHERE media_id = ?',
      [id]
    )
    return result
  },
 
}

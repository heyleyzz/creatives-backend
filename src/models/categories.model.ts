import db from '../config/db.js'
 
export const CategoriesModel = {
 
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Categories')
    return rows
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.query(
      'SELECT * FROM Categories WHERE category_id = ?',
      [id]
    )
    return rows[0] ?? null
  },
 
  create: async (data: {
    category_name: string
  }) => {
    const { category_name } = data
    const [result] = await db.query(
      'INSERT INTO Categories (category_name) VALUES (?)',
      [category_name]
    )
    return result
  },
 
  update: async (id: number, data: { category_name: string }) => {
    const [result] = await db.query(
      'UPDATE Categories SET category_name = ? WHERE category_id = ?',
      [data.category_name, id]
    )
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.query(
      'DELETE FROM Categories WHERE category_id = ?',
      [id]
    )
    return result
  },
 
}

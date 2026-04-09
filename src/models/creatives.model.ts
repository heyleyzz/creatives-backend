import db from '../config/db.js'
 
export const CreativesModel = {
 
  getAll: async () => {
    const [rows] = await db.query(
      'SELECT creatives_id, first_name, last_name, email, role, created_at, status FROM Creatives'
    )
    return rows
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.query(
      'SELECT creatives_id, first_name, last_name, email, role, created_at, status FROM Creatives WHERE creatives_id = ?',
      [id]
    )
    return rows[0] ?? null
  },
 
create: async (data: {
  first_name: string
  last_name: string
  email?: string
  password?: string
  role: string
  status?: string
}) => {
  const { first_name, last_name, email, password, role, status } = data
  const [result] = await db.query(
    'INSERT INTO Creatives (first_name, last_name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
    //                                                                                    6 ✅
    [first_name, last_name, email, password, role, status ?? 'Active']
  )
  return result
},
 
  update: async (id: number, data: {
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    role?: string
    status?: string
  }) => {
    const { first_name, last_name, email, password, role, status } = data
    const [result] = await db.query(
      'UPDATE Creatives SET first_name = ?, last_name = ?, email = ?, password = ?, role = ?, status = ? WHERE creatives_id = ?',
      [first_name, last_name, email, password, role, status, id]
    )
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.query(
      'DELETE FROM Creatives WHERE creatives_id = ?',
      [id]
    )
    return result
  },
 
}

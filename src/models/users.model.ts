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
  },

  findByEmailAndPassword: async (email: string, password: string) => {
  const [rows]: any = await db.query(
    `SELECT u.*, r.name as role 
     FROM users u 
     JOIN roles r ON u.role_id = r.id 
     WHERE u.email = ? AND u.password = ? 
     LIMIT 1`,
    [email, password]
  )
  return rows[0] || null
},

getRoleId: async (roleName: string) => {
  const [rows]: any = await db.query(
    'SELECT id FROM roles WHERE name = ? LIMIT 1',
    [roleName]
  )
  return rows[0]?.id || null
}

}
import { db } from '../config/db.js'

export const SubmissionsModel = {

  getByUser: async (user_id: number) => {
  const [rows]: any = await db.query(
    'SELECT * FROM submissions WHERE user_id = ?',
    [user_id]
  )
  return rows
},

  getByTask: async (task_id: number) => {
    const [rows] = await db.query(
      'SELECT * FROM submissions WHERE task_id = ?',
      [task_id]
    )
    return rows
  },

 create: async (data: any) => {
  const { task_id, user_id, drive_link = null } = data;

  console.log('data received in model:', data); // ← add temporarily

  // 🔥 FORCE CLEAN STATUS
  const status = 'review';

  const [result]: any = await db.query(
    'INSERT INTO submissions (task_id, user_id, status, drive_link) VALUES (?, ?, ?, ?)',
    [task_id, user_id, status, drive_link]
  );

  // ✅ RETURN THE ACTUAL INSERTED ROW
  const [rows]: any = await db.query(
    'SELECT * FROM submissions WHERE id = ?',
    [result.insertId]
  );

  return rows[0];
},

  updateStatus: async (id: number, status: string) => {
    return db.query(
      'UPDATE submissions SET status = ? WHERE id = ?',
      [status, id]
    )
  },

  delete: async (id: number) => {
  return db.query('DELETE FROM submissions WHERE id = ?', [id])
},

}
import { db } from '../config/db.js';
export const TasksModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM tasks');
        return rows;
    },
    getByUser: async (user_id) => {
        const [rows] = await db.query('SELECT * FROM tasks WHERE assigned_to = ?', [user_id]);
        return rows;
    },
    create: async (task) => {
        const { title, assigned_to, assigned_by } = task;
        return db.query('INSERT INTO tasks (title, assigned_to, assigned_by) VALUES (?, ?, ?)', [title, assigned_to, assigned_by]);
    },
    updateStatus: async (id, status) => {
        return db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    },
    delete: async (id) => {
        return db.query('DELETE FROM tasks WHERE id = ?', [id]);
    }
};

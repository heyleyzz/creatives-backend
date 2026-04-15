import { db } from '../config/db.js';
export const RolesModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM roles');
        return rows;
    },
    create: async ({ name }) => {
        return db.query('INSERT INTO roles (name) VALUES (?)', [name]);
    },
    delete: async (id) => {
        return db.query('DELETE FROM roles WHERE id = ?', [id]);
    }
};

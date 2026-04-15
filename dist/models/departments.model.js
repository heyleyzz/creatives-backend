import { db } from '../config/db.js';
export const DepartmentsModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM departments');
        return rows;
    },
    create: async ({ name }) => {
        return db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    }
};

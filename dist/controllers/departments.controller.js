import { DepartmentsModel } from '../models/departments.model.js';
export const DepartmentsController = {
    getAll: async (c) => {
        const data = await DepartmentsModel.getAll();
        return c.json(data);
    },
    create: async (c) => {
        const body = await c.req.json();
        if (!body.name) {
            return c.json({ error: 'name is required' }, 400);
        }
        await DepartmentsModel.create(body);
        return c.json({ message: 'Department created' }, 201);
    }
};

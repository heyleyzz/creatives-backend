import { UsersModel } from '../models/users.model.js';
export const UsersController = {
    getAll: async (c) => {
        const data = await UsersModel.getAll();
        return c.json(data);
    },
    getById: async (c) => {
        const id = Number(c.req.param('id'));
        const data = await UsersModel.getById(id);
        if (!data)
            return c.json({ error: 'User not found' }, 404);
        return c.json(data);
    },
    create: async (c) => {
        const body = await c.req.json();
        const { first_name, last_name, email, password, role_id } = body;
        if (!first_name || !last_name || !email || !password || !role_id) {
            return c.json({ error: 'Missing required fields' }, 400);
        }
        await UsersModel.create(body);
        return c.json({ message: 'User created' }, 201);
    },
    delete: async (c) => {
        const id = Number(c.req.param('id'));
        await UsersModel.delete(id);
        return c.json({ message: 'User deleted' });
    }
};

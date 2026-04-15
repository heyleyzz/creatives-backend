import { RolesModel } from '../models/roles.model.js';
export const RolesController = {
    getAll: async (c) => {
        const data = await RolesModel.getAll();
        return c.json(data);
    },
    create: async (c) => {
        const body = await c.req.json();
        if (!body.name) {
            return c.json({ error: 'name is required' }, 400);
        }
        await RolesModel.create(body);
        return c.json({ message: 'Role created' }, 201);
    },
    delete: async (c) => {
        const id = Number(c.req.param('id'));
        await RolesModel.delete(id);
        return c.json({ message: 'Role deleted' });
    }
};

import { UserDepartmentsModel } from '../models/user_departments.model.js';
export const UserDepartmentsController = {
    assign: async (c) => {
        const { user_id, department_id } = await c.req.json();
        if (!user_id || !department_id) {
            return c.json({ error: 'Missing fields' }, 400);
        }
        await UserDepartmentsModel.assign(user_id, department_id);
        return c.json({ message: 'Assigned successfully' });
    },
    getByUser: async (c) => {
        const user_id = Number(c.req.param('user_id'));
        const data = await UserDepartmentsModel.getByUser(user_id);
        return c.json(data);
    }
};

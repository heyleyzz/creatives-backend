import { SubmissionsModel } from '../models/submissions.model.js';
const STATUS = ['review', 'approved', 'posted'];
export const SubmissionsController = {
    getByTask: async (c) => {
        const task_id = Number(c.req.param('task_id'));
        const data = await SubmissionsModel.getByTask(task_id);
        return c.json(data);
    },
    create: async (c) => {
        const body = await c.req.json();
        const { task_id, user_id } = body;
        if (!task_id || !user_id) {
            return c.json({ error: 'task_id and user_id required' }, 400);
        }
        await SubmissionsModel.create(body);
        return c.json({ message: 'Submission created' }, 201);
    },
    updateStatus: async (c) => {
        const id = Number(c.req.param('id'));
        const { status } = await c.req.json();
        if (!STATUS.includes(status)) {
            return c.json({ error: 'Invalid status' }, 400);
        }
        await SubmissionsModel.updateStatus(id, status);
        return c.json({ message: 'Status updated' });
    }
};

import { Hono } from 'hono';
import { TasksController } from '../controllers/tasks.controller.js';
const tasks = new Hono();
tasks.get('/', TasksController.getAll);
tasks.get('/user/:user_id', TasksController.getByUser);
tasks.post('/', TasksController.create);
tasks.patch('/:id/status', TasksController.updateStatus);
tasks.delete('/:id', TasksController.delete);
export default tasks;

import { Hono } from 'hono';
import { DepartmentsController } from '../controllers/departments.controller.js';
const departments = new Hono();
departments.get('/', DepartmentsController.getAll);
departments.post('/', DepartmentsController.create);
export default departments;

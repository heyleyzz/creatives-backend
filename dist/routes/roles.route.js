import { Hono } from 'hono';
import { RolesController } from '../controllers/roles.controller.js';
const roles = new Hono();
roles.get('/', RolesController.getAll);
roles.post('/', RolesController.create);
roles.delete('/:id', RolesController.delete);
export default roles;

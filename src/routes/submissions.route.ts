import { Hono } from 'hono'
import { SubmissionsController } from '../controllers/submissions.controller.js'

const submissions = new Hono()

submissions.get('/task/:task_id', SubmissionsController.getByTask)
submissions.post('/', SubmissionsController.create)
submissions.patch('/:id/status', SubmissionsController.updateStatus)
submissions.get('/user/:user_id', SubmissionsController.getByUser)
submissions.delete('/:id', SubmissionsController.delete)

export default submissions
import type { Context } from 'hono'
import { SubmissionsModel } from '../models/submissions.model.js'

const STATUS = ['review', 'approved', 'posted']

export const SubmissionsController = {

  getByUser: async (c: Context) => {
    const user_id = Number(c.req.param('user_id'))
    const data = await SubmissionsModel.getByUser(user_id)
    return c.json(data)
  },

  getByTask: async (c: Context) => {
    const task_id = Number(c.req.param('task_id'))
    const data = await SubmissionsModel.getByTask(task_id)
    return c.json(data)
  },

  // 🔥 FIXED CREATE (NO WARNING, NO ERROR)
  create: async (c: Context) => {
    const body = await c.req.json()

    const drive_link = body.drive_link
    const user_id = body.user_id

    // ✅ validation
    if (!user_id) {
      return c.json({ error: 'user_id required' }, 400)
    }

    if (!drive_link) {
      return c.json({ error: 'drive_link required' }, 400)
    }

    // ✅ USE DECLARED VALUES (NO MORE UNUSED WARNING)
    const created = await SubmissionsModel.create({
      drive_link,
      user_id,
      status: 'review' // ✅ FIXES SQL ERROR
    })

    return c.json(created, 201)
  },

  updateStatus: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const { status } = await c.req.json()

    if (!STATUS.includes(status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }

    await SubmissionsModel.updateStatus(id, status)
    return c.json({ message: 'Status updated' })
  },

  delete: async (c: Context) => {
  const id = Number(c.req.param('id'))
  await SubmissionsModel.delete(id)
  return c.json({ message: 'Submission deleted' })
},

}
import type { Context } from 'hono'
import { UsersModel } from '../models/users.model.js'

export const UsersController = {

  getAll: async (c: Context) => {
    const data = await UsersModel.getAll()
    return c.json(data)
  },

  getById: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const data = await UsersModel.getById(id)

    if (!data) return c.json({ error: 'User not found' }, 404)
    return c.json(data)
  },

  create: async (c: Context) => {
    const body = await c.req.json()
    const { first_name, last_name, email, password, role_id } = body

    if (!first_name || !last_name || !email || !password || !role_id) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    await UsersModel.create(body)
    return c.json({ message: 'User created' }, 201)
  },

  delete: async (c: Context) => {
    const id = Number(c.req.param('id'))
    await UsersModel.delete(id)
    return c.json({ message: 'User deleted' })
  },

  login: async (c: Context) => {
  const { email, password } = await c.req.json()

  if (!email || !password) {
    return c.json({ error: 'Missing email or password' }, 400)
  }

  const user = await UsersModel.findByEmailAndPassword(email, password)

  if (!user) {
    return c.json({ error: 'Invalid email or password' }, 401)
  }

  return c.json({
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
    user_id: user.id
  })
},

register: async (c: Context) => {
  const { name, email, password, role } = await c.req.json()

  if (!name || !email || !password || !role) {
    return c.json({ error: 'Missing required fields' }, 400)
  }

  const [first_name, ...rest] = name.trim().split(' ')
  const last_name = rest.join(' ') || '-'

  // get role_id from role string
  const role_id = await UsersModel.getRoleId(role)

  await UsersModel.create({ first_name, last_name, email, password, role_id })
  return c.json({ message: 'Registered successfully' }, 201)
}

}
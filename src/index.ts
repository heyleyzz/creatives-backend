import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt, sign, verify } from 'hono/jwt'
import { eq } from 'drizzle-orm'
import { db } from './config/db.js'
import { categories, creatives, events, media, tasks } from './config/schema.js'

import creativesRoute  from './routes/creatives.route.js'
import categoriesRoute from './routes/categories.route.js'
import eventsRoute     from './routes/events.route.js'
import mediaRoute      from './routes/media.route.js'
import tasksRoute      from './routes/tasks.route.js'

const app = new Hono()
const JWT_SECRET = process.env.JWT_SECRET || 'mysuperkey1026'

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: 'http://localhost:4200',   // your Angular dev URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Health check
app.get('/', (c) => c.json({ message: 'API is running' }))

app.post('/api/auth/login', async (c) => {
  const { username, password } = await c.req.json()

  //DB
  const result = await db.select().from(creatives).where(eq(creatives.email, username))
  const user = result[0]

  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }
  
  const token = await sign(
    {
      sub: user.creatives_id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    JWT_SECRET
  )

  return c.json({ token, role: user.role })
})

app.post('/api/auth/register', async (c) => {
  const { first_name, last_name, email, password, role } = await c.req.json()
  await db.insert(creatives).values({ first_name, last_name, email, password, role })
  return c.json({ message: 'Creative registered successfully' }, 201)
})

// Routes
app.route('/creatives',  creativesRoute)
app.route('/categories', categoriesRoute)
app.route('/events',     eventsRoute)
app.route('/media',      mediaRoute)
app.route('/tasks',      tasksRoute)

//Protected routes
const api = new Hono()

api.use('*', jwt({ secret: JWT_SECRET, alg: 'HS256' }))

api.get('/profile', (c) => {
  const payload = c.get('jwtPayload') as { sub: string; role: string }
  return c.json({ user: payload.sub, role: payload.role })
})

api.get('/items', (c) => {
  return c.json({ items: ['Item A', 'Item B', 'Item C'] })
})

api.post('/items', async (c) => {
  const { name } = await c.req.json()
  return c.json({ message: `Created item: ${name}` }, 201)
})

app.route('/api/protected', api)

// CREATIVES
api.get('/creatives', async (c) => {
  const result = await db.select().from(creatives)
  return c.json(result)
})

api.put('/creatives/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  await db.update(creatives).set(body).where(eq(creatives.creatives_id, id))
  return c.json({ message: 'Creative updated' })
})

api.delete('/creatives/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await db.delete(creatives).where(eq(creatives.creatives_id, id))
  return c.json({ message: 'Creative deleted' })
})

// CATEGORIES
api.get('/categories', async (c) => {
  const result = await db.select().from(categories)
  return c.json(result)
})

api.post('/categories', async (c) => {
  const { category_name, description } = await c.req.json()
  await db.insert(categories).values({ category_name, description })
  return c.json({ message: 'Category created' }, 201)
})

api.put('/categories/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  await db.update(categories).set(body).where(eq(categories.category_id, id))
  return c.json({ message: 'Category updated' })
})

api.delete('/categories/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await db.delete(categories).where(eq(categories.category_id, id))
  return c.json({ message: 'Category deleted' })
})

// EVENTS
api.get('/events', async (c) => {
  const result = await db.select().from(events)
  return c.json(result)
})

api.post('/events', async (c) => {
  const { event_name, event_date, description, category_id, created_by } = await c.req.json()
  await db.insert(events).values({ event_name, event_date, description, category_id, created_by })
  return c.json({ message: 'Event created' }, 201)
})

api.put('/events/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  await db.update(events).set(body).where(eq(events.event_id, id))
  return c.json({ message: 'Event updated' })
})

api.delete('/events/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await db.delete(events).where(eq(events.event_id, id))
  return c.json({ message: 'Event deleted' })
})

// MEDIA
api.get('/media', async (c) => {
  const result = await db.select().from(media)
  return c.json(result)
})

api.post('/media', async (c) => {
  const { event_id, uploaded_by, file_name, file_type, file_path, description } = await c.req.json()
  await db.insert(media).values({ event_id, uploaded_by, file_name, file_type, file_path, description })
  return c.json({ message: 'Media uploaded' }, 201)
})

api.delete('/media/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await db.delete(media).where(eq(media.media_id, id))
  return c.json({ message: 'Media deleted' })
})

// TASKS
api.get('/tasks', async (c) => {
  const result = await db.select().from(tasks)
  return c.json(result)
})

api.post('/tasks', async (c) => {
  const { event_id, assigned_to, task_title, task_description, status, due_date } = await c.req.json()
  await db.insert(tasks).values({ event_id, assigned_to, task_title, task_description, status, due_date })
  return c.json({ message: 'Task created' }, 201)
})

api.put('/tasks/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  await db.update(tasks).set(body).where(eq(tasks.task_id, id))
  return c.json({ message: 'Task updated' })
})

api.delete('/tasks/:id', async (c) => {
  const id = Number(c.req.param('id'))
  await db.delete(tasks).where(eq(tasks.task_id, id))
  return c.json({ message: 'Task deleted' })
})

// ── Mount protected routes ─────────────────────────────────────
app.route('/api', api)

// ── Error handler ──────────────────────────────────────────────
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

// 404 handler
app.notFound((c) => c.json({ error: 'Route not found' }, 404))

// Start server
const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running on http://localhost:${port}`)
})
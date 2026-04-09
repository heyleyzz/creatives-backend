import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import creativesRoute  from './routes/creatives.route.js'
import categoriesRoute from './routes/categories.route.js'
import eventsRoute     from './routes/events.route.js'
import mediaRoute      from './routes/media.route.js'
import tasksRoute      from './routes/tasks.route.js'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// Health check
app.get('/', (c) => c.json({ message: 'API is running' }))

// Routes
app.route('/creatives',  creativesRoute)
app.route('/categories', categoriesRoute)
app.route('/events',     eventsRoute)
app.route('/media',      mediaRoute)
app.route('/tasks',      tasksRoute)

// 404 handler
app.notFound((c) => c.json({ error: 'Route not found' }, 404))

// Start server
const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running on http://localhost:${port}`)
})
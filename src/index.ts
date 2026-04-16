import { Hono } from "hono"
import { serve } from "@hono/node-server"
import 'dotenv/config'

// ROUTES
import users from './routes/users.route.js'
import tasks from './routes/tasks.route.js'
import submissions from './routes/submissions.route.js'
import roles from './routes/roles.route.js'
import departments from './routes/departments.route.js'
import userDepartments from './routes/user_departments.route.js'
import { cors } from "hono/cors"

const app = new Hono()
const api = new Hono()

app.use('*', cors({
  origin: 'http://localhost:4200', // Adjust this to your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ← added PUT and OPTIONS
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// REGISTER ROUTES
api.route('/users', users)
api.route('/tasks', tasks)
api.route('/submissions', submissions)
api.route('/roles', roles)
api.route('/departments', departments)
api.route('/user-departments', userDepartments)

// PREFIX
app.route('/api', api)

// TEST ROUTE
app.get('/', (c) => c.text('API running 🚀'))

// START SERVER
serve({
  fetch: app.fetch,
  port: 3000
}, () => {
  console.log("🔥 Server running on http://localhost:3000")
}) 
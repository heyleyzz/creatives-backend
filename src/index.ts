import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { jwt } from "hono/jwt"

import tasks from "./routes/tasks.route.js"
import submissions from "./routes/submissions.route.js"
import userDepartments from "./routes/user_departments.route.js"
import users from "./routes/users.route.js"

const app = new Hono()
const api = new Hono()

const JWT_SECRET = process.env.JWT_SECRET || "mysuperkey1026"

api.use('*', jwt({ secret: JWT_SECRET, alg: 'HS256' }))

api.route('/users', users)
api.route('/tasks', tasks)
api.route('/submissions', submissions)
api.route('/user-departments', userDepartments)

app.route('/api', api)

// START SERVER
serve({
  fetch: app.fetch,
  port: 3000
}, () => {
  console.log("🔥 Server running on http://localhost:3000")
})
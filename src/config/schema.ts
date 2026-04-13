// src/db/schema.ts
import { mysqlTable, int, varchar, text, date, mysqlEnum } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const categories = mysqlTable('categories', {
  category_id: int('category_id').primaryKey().autoincrement(),
  category_name: varchar('category_name', { length: 45 }).notNull(),
  description: text('description'),
})

export const creatives = mysqlTable('creatives', {
  creatives_id: int('creatives_id').primaryKey().autoincrement(),
  first_name: varchar('first_name', { length: 60 }).notNull(),
  last_name: varchar('last_name', { length: 60 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 60 }).notNull(),
  created_at: date('created_at').default(sql`(curdate())`),
  status: mysqlEnum('status', ['Active', 'Inactive']),
})

export const events = mysqlTable('events', {
  event_id: int('event_id').primaryKey().autoincrement(),
  event_name: varchar('event_name', { length: 60 }).notNull(),
  event_date: date('event_date', { mode: 'date' }),
  description: text('description'),
  category_id: int('category_id'),
  created_by: int('created_by'),
  created_at: date('created_at', { mode: 'date' }).default(sql`(curdate())`),
})

export const media = mysqlTable('media', {
  media_id: int('media_id').primaryKey().autoincrement(),
  event_id: int('event_id'),
  uploaded_by: int('uploaded_by'),
  file_name: varchar('file_name', { length: 60 }).notNull(),
  file_type: mysqlEnum('file_type', ['JPEG', 'PNG', 'MP4']),
  file_path: text('file_path'),
  upload_date: date('upload_date', { mode: 'date' }).default(sql`(curdate())`),
  description: text('description'),
})

export const tasks = mysqlTable('tasks', {
  task_id: int('task_id').primaryKey().autoincrement(),
  event_id: int('event_id'),
  assigned_to: int('assigned_to'),
  task_title: varchar('task_title', { length: 60 }).notNull(),
  task_description: text('task_description'),
  status: mysqlEnum('status', ['Active', 'Inactive']),
  due_date: date('due_date', { mode: 'date' }).notNull(),
  created_at: date('created_at').default(sql`(curdate())`),
})
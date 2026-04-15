// src/config/db.ts
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

try {
  const db = await mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  })

  console.log('✅ Database connection pool created successfully')
} catch (error) {
  console.error('❌ Error creating database connection pool:', error)
}



import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema.js';
import 'dotenv/config.js';

const dbConfig = {
    host: 'localhost',
    port: 3306, // Put the database port here
    user: 'root',
    password: '123456', // Put here your password
    database: 'liceo_creatives', // Put here your database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

export const db = drizzle(pool, { schema, mode: 'default' })
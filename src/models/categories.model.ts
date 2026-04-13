import { db }  from '../config/db.js'
import { categories } from '../config/schema.js'  // ← add this
import { eq } from 'drizzle-orm'

export const CategoriesModel = {
 
  getAll: async () => {
    const result = await db.select().from(categories)
    return result
  },
 
  getById: async (id: number) => {
    const [rows]: any = await db.select().from(categories).where(eq(categories.category_id, id))
    return rows[0] ?? null
  },
 
  create: async (data: {
    category_name: string
  }) => {
    const { category_name } = data
    const [result] = await db.insert(categories).values({ category_name })
    return result
  },
 
  update: async (id: number, data: { category_name: string }) => {
    const [result] = await db.update(categories).set(data).where(eq(categories.category_id, id))
    return result
  },
 
  delete: async (id: number) => {
    const [result]: any = await db.delete(categories).where(eq(categories.category_id, id))
    return result
  },
 
}

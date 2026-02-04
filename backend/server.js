import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import authRoutes from './Routes/Auth.js'
import blogRoutes from './Routes/BlogRoute.js'
import cloudinaryRoute from './Routes/cloudinary.js'
import subscriptionRoutes from './Routes/Subscription.js'
import { connectDb } from './config/Db.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors()) // Enable CORS for all routes
app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'public')))

app.use('/api/users', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/cloudinary', cloudinaryRoute)
app.use('/api/subscribe', subscriptionRoutes)

connectDb()

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

import express from 'express'
import mongoose from 'mongoose'
import Blog from '../models/Blogs.js'
import Subscriber from '../models/Subscribers.js'
import { protect } from '../middleware/Auth.js'
import NodeCache from 'node-cache'
import Brevo from '@getbrevo/brevo'

const router = express.Router()
const cache = new NodeCache({ stdTTL: 600 }) // 10 minutes

// --------------------
// Brevo setup
// --------------------
const brevo = new Brevo.TransactionalEmailsApi()
brevo.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
)

const SENDER = {
  email: 'contact@ikazeimmigrantadvocates.org',
  name: 'Ikaze Immigrant Advocates',
}

const REPLY_TO = {
  email: 'claudine@ikazeimmigrantadvocates.org',
  name: 'Claudine Gasana',
}

const LOGO_URL = process.env.EMAIL_LOGO_URL
const QR_URL = process.env.EMAIL_QR_URL

// ==============================
// GET all blogs
// ==============================
router.get('/', async (req, res) => {
  try {
    const cacheKey = 'blogs'
    let blogs = cache.get(cacheKey)

    if (blogs) {
      return res.status(200).json(blogs)
    }

    blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('title description img createdAt')
      .lean()

    cache.set(cacheKey, blogs)
    res.status(200).json(blogs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// ==============================
// GET single blog
// ==============================
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Invalid blog ID' })
  }

  try {
    const blog = await Blog.findById(req.params.id).lean()
    if (!blog) {
      return res
        .status(404)
        .json({ message: 'Blog not found' })
    }
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ==============================
// CREATE blog + send newsletter
// ==============================
router.post('/create', protect, async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required',
      })
    }

    const newBlog = await Blog.create({
      title,
      description,
    })

    cache.del('blogs')

    // -----------------------
    // SEND NEWSLETTER EMAILS
    // -----------------------
    const subscribers = await Subscriber.find(
      {},
      'email unsubscribeToken',
    ).lean()

    for (const sub of subscribers) {
      await brevo.sendTransacEmail({
        to: [{ email: sub.email }],
        sender: SENDER,
        replyTo: REPLY_TO,
        subject: `New Blog: ${newBlog.title}`,
        tags: ['newsletter'],
        htmlContent: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:24px;">
              <img src="${LOGO_URL}" width="120" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2>${newBlog.title}</h2>
              <p>${String(newBlog.description).substring(0, 250)}...</p>

              <p>
                <a href="${process.env.FRONTEND_URL}/blog/${newBlog._id}">
                  Read full article →
                </a>
              </p>

              <hr style="margin:32px 0" />

              <h3>Support Our Mission</h3>
              <img src="${QR_URL}" width="140" />

              <p style="font-size:12px;color:#777;margin-top:24px;">
                <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${sub.unsubscribeToken}">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      })
    }

    res.status(201).json(newBlog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// ==============================
// UPDATE blog
// ==============================
router.put('/update/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res
        .status(404)
        .json({ message: 'Blog not found' })
    }

    blog.title = req.body.title || blog.title
    blog.description =
      req.body.description || blog.description

    const updatedBlog = await blog.save()
    cache.del('blogs')

    res.json(updatedBlog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ==============================
// DELETE blog
// ==============================
router.delete('/delete/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res
        .status(404)
        .json({ message: 'Blog not found' })
    }

    await blog.deleteOne()
    cache.del('blogs')

    res.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

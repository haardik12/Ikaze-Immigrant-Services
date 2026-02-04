import express from "express";
import mongoose from 'mongoose'
import Blog from "../models/Blogs.js";
import { protect } from '../middleware/Auth.js'
import NodeCache from 'node-cache';
import { emailQueue } from "../queue/queue.js";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// getting the blogs
router.get('/', async (req, res) => {
    try {
        const cacheKey = 'blogs';
        let blogs = cache.get(cacheKey);
        if (blogs) {
            return res.status(200).json(blogs);
        }

        blogs = await Blog.find()
          .sort({ createdAt: -1 })
          .select('title description img createdAt')
          .lean();
        
        cache.set(cacheKey, blogs);
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Server error'});
    }
})

// getting a single blog
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


// creating the blogs
router.post('/create', protect, async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required',
      })
    }

    // Create blog
    const newBlog = await Blog.create({
      title,
      description,
    })

    // Clear cache
    cache.del('blogs')

    // 🔥 ENQUEUE NEWSLETTER EMAIL
    await emailQueue.add('newsletterEmail', {
      blogId: newBlog._id.toString(),
      title: newBlog.title,
      description: newBlog.description,
    })

    res.status(201).json(newBlog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})



// updating the blogs
// Update Blog (Admin Only)
router.put('/update/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res
        .status(404)
        .json({ message: 'Blog not found' })
    }

    // Update fields (text only)
    blog.title = req.body.title || blog.title
    blog.description = req.body.description || blog.description

    const updatedBlog = await blog.save()

    cache.del('blogs') // Invalidate cache

    res.json(updatedBlog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


// Delete Blog (Admin Only)
router.delete("/delete/:id", protect, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
      if (!blog)
        return res
          .status(404)
          .json({ message: 'Blog not found' })  

      await blog.deleteOne()
      cache.del('blogs'); // Invalidate cache
      res.json({ message: 'Blog deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
});

export default router;
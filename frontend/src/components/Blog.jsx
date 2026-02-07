import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import BlogCard from './Blog card/BlogCard'
import api from '../utils/Api.js'

const Blog = () => {
  const [blogs, setBlogs] = useState([])

 useEffect(() => {
   // 1️⃣ Load cached blogs instantly (if available)
   const cachedBlogs = localStorage.getItem('blogs')
   if (cachedBlogs) {
     setBlogs(JSON.parse(cachedBlogs))
   }

   // 2️⃣ Fetch fresh blogs in background
   api
     .get('/api/blogs')
     .then((res) => {
       setBlogs(res.data)
       localStorage.setItem(
         'blogs',
         JSON.stringify(res.data),
       )
     })
     .catch((err) => console.log(err))
 }, [])

  return (
    <>
      <div className='w-full min-h-screen bg-gradient-to-r from-slate-500 to-gray-400'>
        <div className='py-24 max-w-5xl mx-auto px-4'>
          <h1 className='text-3xl font-semibold mb-10 text-center text-white'>
            All Blogs
          </h1>

          <div className='flex flex-col gap-6'>
            {blogs.map((items, i) => (
              <BlogCard key={i} items={items} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog

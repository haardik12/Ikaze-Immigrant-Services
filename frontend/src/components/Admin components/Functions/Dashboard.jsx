import React from 'react'
import BlogCard from '../../Blog card/BlogCard.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../../utils/Api.js'

const Dashboard = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    api
      .get('/api/blogs')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      <div className='w-full justify-center overflow-hidden'>
        <div className='py-10 max-w-5xl mx-auto mt-14 px-4'>
          <h1 className='text-3xl font-semibold mb-8 text-white text-start'>
            All Blogs ({blogs.length})
          </h1>

          <div className='flex flex-col gap-6'>
            {blogs.map((items, i) => (
              <BlogCard key={i} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
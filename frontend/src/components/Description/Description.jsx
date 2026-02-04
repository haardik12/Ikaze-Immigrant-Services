import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import axios from 'axios'

const Description = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`)
        setBlog(res.data)
      } catch (err) {
        setError('Blog not found', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        Loading blog...
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error}
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full bg-gray-200 px-4 sm:px-6 py-24 flex justify-center'>
      <article className='w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col'>
        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className='inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 hover:text-black transition'
        >
          <FiArrowLeft />
          Back to Blogs
        </button>

        {/* Title */}
        <h1 className='text-3xl sm:text-4xl font-bold mb-8'>
          {blog.title}
        </h1>

        {/* BLOG CONTENT — HTML RENDER */}
        <div
          className='prose prose-lg prose-slate max-w-none'
          dangerouslySetInnerHTML={{
            __html: blog.description,
          }}
        />

        {/* Social icons */}
        <div className='flex items-center gap-4 justify-end mt-12 pt-6 border-t'>
          <a
            href='https://bsky.app/profile/clauug.bsky.social'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 hover:text-blue-400 transition'
          >
            <FaBluesky size={20} />
            <span>Bluesky</span>
          </a>

          <a
            href='mailto:Claudine@ikazeimmigrants.org?subject=Immigration%20Inquiry&body=Hello%20Claudine,%0D%0A%0D%0AI would like to inquire about your immigration services.%0D%0A%0D%0AThank you.'
            className='flex items-center gap-2 hover:text-red-400 transition'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MdEmail size={20} />
            <span>Mail</span>
          </a>

          <a
            href='https://x.com/ikazeservices?s=21&t=u1RWLWjrkW2NiGeKCO2ywQ'
            className='flex items-center gap-2 hover:text-blue-300 transition'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaSquareXTwitter size={20} />
            <span>@IkazeServices</span>
          </a>
        </div>
      </article>
    </div>
  )
}

export default Description

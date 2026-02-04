import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Quill from 'quill'


const AddBlogs = () => {
  const [title, setTitle] = useState('')
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  // Initialize Quill
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ],
        },
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const content = quillRef.current?.root.innerHTML

    if (!title || !content || content === '<p><br></p>') {
      alert('Title and content are required!')
      return
    }

    try {
      const token = localStorage.getItem('token')

      await axios.post(
        '/api/blogs/create',
        {
          title,
          description: content, // HTML stored
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      alert('Blog added successfully!')
      setTitle('')
      quillRef.current.root.innerHTML = ''
    } catch (error) {
      console.error(error)
      alert('Error creating blog')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full bg-white/10 backdrop-blur-md shadow-xl p-8 mt-20 rounded-2xl border border-white/20 max-w-2xl'
      >
        <h2 className='text-3xl font-bold text-white mb-6 text-center tracking-wide'>
          Add New Blog
        </h2>

        {/* Title */}
        <label className='text-white text-sm font-medium'>
          Title
        </label>
        <input
          type='text'
          placeholder='Enter blog title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-4 py-3 mt-1 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500'
          required
        />

        {/* Description */}
        {/* Quill Editor */}
        <label className='text-white text-sm font-medium mb-2 block'>
          Content
        </label>
        <div className='bg-white text-black rounded-lg min-h-[300px]'>
          <div ref={editorRef} />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-purple-500/50'
        >
          Publish Blog
        </button>
      </form>
    </div>
  )
}

export default AddBlogs

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit, FiTrash, FiX } from 'react-icons/fi'
import Quill from 'quill'

const EditBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [title, setTitle] = useState('')

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  // --------------------
  // Open edit modal
  // --------------------
  const handleEdit = (blog) => {
    setSelectedBlog(blog)
    setTitle(blog.title)

    // Delay needed so modal DOM exists
    setTimeout(() => {
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
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

      if (quillRef.current) {
        quillRef.current.root.innerHTML =
          blog.description || ''
      }
    }, 0)
  }

  // --------------------
  // Close modal
  // --------------------
  const closeModal = () => {
    setSelectedBlog(null)
    setTitle('')

    if (quillRef.current) {
      quillRef.current = null
    }
  }

  // --------------------
  // Delete blog
  // --------------------
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/blogs/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setBlogs((prev) => prev.filter((b) => b._id !== id))
    } catch (error) {
      alert('Delete failed', error)
    }
  }

  // --------------------
  // Update blog
  // --------------------
  const handleUpdate = async (e) => {
    e.preventDefault()

    const content = quillRef.current?.root.innerHTML

    if (!title || !content || content === '<p><br></p>') {
      alert('Title and content are required')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const res = await axios.put(
        `/api/blogs/update/${selectedBlog._id}`,
        {
          title,
          description: content, // HTML
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      setBlogs((prev) =>
        prev.map((b) =>
          b._id === selectedBlog._id ? res.data : b,
        ),
      )

      closeModal()
    } catch (err) {
      alert('Update failed', err)
    }
  }

  // --------------------
  // Fetch blogs
  // --------------------
  useEffect(() => {
    axios
      .get('/api/blogs')
      .then((res) => setBlogs(res.data))
      .catch(console.log)
  }, [])

  return (
    <div className='mt-24'>
      <table className='w-full text-sm text-white'>
        <thead className='border-b'>
          <tr>
            <th className='px-6 py-3'>Title</th>
            <th className='px-6 py-3'>Date</th>
            <th className='px-6 py-3'>Edit</th>
            <th className='px-6 py-3'>Delete</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className='border-b'>
              <td className='px-6 py-4'>{blog.title}</td>
              <td className='px-6 py-4'>
                {formatDate(blog.createdAt)}
              </td>
              <td className='px-6 py-4'>
                <FiEdit
                  className='cursor-pointer hover:text-blue-400'
                  onClick={() => handleEdit(blog)}
                />
              </td>
              <td className='px-6 py-4'>
                <FiTrash
                  className='cursor-pointer hover:text-red-400'
                  onClick={() => handleDelete(blog._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {selectedBlog && (
        <div className='fixed inset-0 bg-black/70 z-50 overflow-y-auto'>
          <div className='min-h-screen flex justify-center items-start py-16 px-4'>
            <form
              onSubmit={handleUpdate}
              className='relative w-full max-w-3xl bg-white/10 backdrop-blur-md p-8 rounded-2xl'
            >
              <FiX
                size={22}
                onClick={closeModal}
                className='absolute top-4 right-4 cursor-pointer text-white'
              />

              <h2 className='text-xl text-white mb-4 text-center'>
                Edit Blog
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                className='w-full p-3 mb-4 rounded bg-white/20 text-white'
                required
              />

              {/* Quill editor */}
              <div className='bg-white text-black rounded max-h-[60vh] overflow-y-auto mb-4'>
                <div ref={editorRef} />
              </div>

              <button
                type='submit'
                className='w-full bg-purple-600 py-3 rounded text-white'
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditBlogs

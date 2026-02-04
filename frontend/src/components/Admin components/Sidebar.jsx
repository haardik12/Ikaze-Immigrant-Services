import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const Navigate = useNavigate()
  const { logout } = useAuth()
    const links = [
      { to: 'dashboard', name: 'Dashboard' },
      { to: 'add-blogs', name: 'Add Blog' },
      { to: 'edit-blogs', name: 'Edit Blog' },
    ]

    const handleLogout = () => {
      logout()
      Navigate('/login')
    }
  return (
    <div className='p-4'>
      <div className='text-xl font-bold pt-20'>
        Admin Page
      </div>
      <hr className='my-4' />
      <div className='flex flex-col'>
        {links.map((items, i) => (
          <Link
            to={items.to}
            key={i}
            className='text-xl hover:scale-105 transition-all duration-200'
          >
            {items.name}
          </Link>
        ))}
      </div>

        <button
        onClick={handleLogout}
        className='w-full bg-red-500 text-white py-2 px-3 rounded-lg mt-4 hover:bg-red-600 transition font-semibold shadow-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar
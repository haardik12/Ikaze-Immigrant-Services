import React from 'react'
import Sidebar from '../Admin components/Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <>
      <div className='flex'>
        <div className='w-1/6'></div>
        <div className='w-1/6 fixed h-screen border-r'>
          <Sidebar />
        </div>
        <div className='w-5/6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Admin
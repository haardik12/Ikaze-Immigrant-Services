import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { CiMenuFries } from 'react-icons/ci'
// import logo from '../../assets/Final-logo.jpeg'

const Nav = () => {
  const [click, setClick] = useState(false)

  const toggleMenu = () => setClick((prev) => !prev)
  const closeMenu = () => setClick(false)

  return (
    <nav className='fixed z-50 pt-6'>
      {/* iOS-style backdrop */}
      <div
        onClick={closeMenu}
        className={`
          fixed inset-0 z-30 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${
            click
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }
        `}
      />

      {/* Navbar */}
      <div
        className='fixed top-[env(safe-area-inset-top)] h-[68px] left-0 w-full z-50
  flex justify-between items-center
  text-white bg-primary
  px-6 py-5
  lg:px-16
  xl:px-40
  2xl:px-60'
      >
        {/* Logo */}
        {/* <img
          src={logo}
          alt='Logo'
          className='h-10 w-auto opacity-90 hover:opacity-100 transition'
        /> */}
        <div className='h-6 w-auto'>
          <Link to={'/'}>
            <h1 className='uppercase'>
              ikaze immigrants services
            </h1>
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className='hidden lg:flex gap-8 text-[18px]'>
          {[
            'Home',
            'About',
            'Programs',
            'Blog',
            'Donate',
            'Join Us',
          ].map((item) => (
            <Link
              key={item}
              to={
                item === 'Home'
                  ? '/'
                  : `/${item
                      .toLowerCase()
                      .replace(' ', '-')}`
              }
            >
              <li className='hover:text-blue-300 transition'>
                {item}
              </li>
            </Link>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className='lg:hidden text-2xl transition-transform duration-300 ease-out'
        >
          {click ? (
            <FaTimes className='rotate-90' />
          ) : (
            <CiMenuFries />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          lg:hidden fixed top-16 left-0 w-full h-screen z-40
          bg-primary backdrop-blur-xl
          transition-all duration-200 ease-out
          ${
            click
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
          }
        `}
      >
        <ul className='text-center text-3xl uppercase p-20 space-y-2'>
          {[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Programs', to: '/programs' },
            { label: 'Blog', to: '/blog' },
            { label: 'Donate', to: '/donate' },
            { label: 'Join Us', to: '/join-us' },
          ].map(({ label, to }) => (
            <Link key={label} to={to} onClick={closeMenu}>
              <li className='py-4 text-white rounded-xl hover:bg-white/10 transition active:scale-95'>
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav

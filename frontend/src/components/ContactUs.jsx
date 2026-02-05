import React, { useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [captchaToken, setCaptchaToken] = useState(null)

  const [status, setStatus] = useState({
    message: '',
    loading: false,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!captchaToken) {
      setStatus({
        message: 'Please verify that you are not a robot.',
        loading: false,
      })
      return
    }

    setStatus({ message: '', loading: true })

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || ''

      await axios.post(`${API_BASE}/api/subscribe`, {
        ...formData,
        captchaToken,
      })

      setStatus({
        message:
          'Subscribed successfully! Check your email.',
        loading: false,
      })

      setFormData({ name: '', email: '' })
      setCaptchaToken(null)

      setTimeout(() => {
        setStatus({ message: '', loading: false })
      }, 5000)
    } catch (error) {
      setStatus({
        message:
          error.response?.data?.message ||
          'An error occurred. Please try again.',
        loading: false,
      })
      console.error(error)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen text-white'>
      <Nav />

      <section className='relative bg-gray-100 py-20 px-4'>
        <div className='text-center mt-10 mb-10'>
          <h2 className='text-3xl md:text-4xl font-serif text-gray-800'>
            Join Us
          </h2>
          <p className='mt-4 text-gray-500 max-w-md mx-auto'>
            Our journey matters—get in touch with our team
            today.
          </p>
        </div>

        <div className='relative max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 relative md:min-h-[400px]'>
            {/* LEFT – FORM */}
            <div className='px-8 py-10'>
              <h3 className='text-2xl font-serif text-gray-800 mb-2'>
                Subscribe to Our Newsletter
              </h3>

              <form
                className='space-y-6'
                onSubmit={handleSubmit}
              >
                <input
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Name'
                  required
                  className='w-full border-b border-gray-500 outline-none py-2 bg-transparent text-black'
                />

                <input
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your Email'
                  required
                  className='w-full border-b border-gray-500 outline-none py-2 bg-transparent text-black'
                />

                <ReCAPTCHA
                  sitekey={
                    import.meta.env.VITE_RECAPTCHA_SITE_KEY
                  }
                  onChange={setCaptchaToken}
                />

                <button
                  type='submit'
                  disabled={status.loading}
                  className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-md uppercase'
                >
                  {status.loading
                    ? 'Subscribing...'
                    : 'Subscribe'}
                </button>
              </form>

              {status.message && (
                <p className='mt-4 text-center text-sm text-green-600'>
                  {status.message}
                </p>
              )}
            </div>

            {/* RIGHT – SOCIALS */}
            <div className='bg-gray-900 text-white px-8 py-10 flex flex-col items-center text-center md:justify-center'>
              <h3 className='text-2xl font-serif mb-4'>
                {' '}
                Connect With Us{' '}
              </h3>
              <p className='text-gray-400 text-sm mb-8'>
                {' '}
                Follow us on social media and stay
                connected.{' '}
              </p>
              <div className='flex space-x-6'>
                <a
                  href='https://bsky.app/profile/clauug.bsky.social'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-4 hover:text-blue-400 transition'
                >
                  {' '}
                  <FaBluesky size={22} />{' '}
                  <span>Bluesky</span>{' '}
                </a>
                <a
                  href='#'
                  target='mailto:Claudine@ikazeimmigrants.org?subject=Immigration%20Inquiry&body=Hello%20Claudine,%0D%0A%0D%0AI would like to inquire about your immigration services.%0D%0A%0D%0AThank you.'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-4 hover:text-red-400 transition'
                >
                  {' '}
                  <MdEmail size={23} />{' '}
                  <span>Mail</span>{' '}
                </a>
                <a
                  href='https://x.com/ikazeservices?s=21&t=u1RWLWjrkW2NiGeKCO2ywQ'
                  className='flex items-center gap-2 hover:text-blue-300 transition'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {' '}
                  <FaSquareXTwitter size={20} />{' '}
                  <span>@IkazeServices</span>{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className='bg-slate-800 text-white px-6 py-5'>
        {' '}
        <div className='max-w-4xl mx-auto flex flex-col items-center text-center gap-3'>
          {' '}
          {/* Text */}{' '}
          <p className='text-sm sm:text-base'>
            {' '}
            Ikaze Immigrant Services / 501(c)(3) Charity –
            99-1691713{' '}
          </p>{' '}
          {/* Social links */}{' '}
          <div className='flex items-center justify-center gap-8'>
            {' '}
            <a
              href='https://bsky.app/profile/clauug.bsky.social'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 hover:text-blue-400 transition'
            >
              {' '}
              <FaBluesky size={20} />{' '}
              <span>Bluesky</span>{' '}
            </a>{' '}
            <a
              href='mailto:Claudine@ikazeimmigrants.org?subject=Immigration%20Inquiry&body=Hello%20Claudine,%0D%0A%0D%0AI would like to inquire about your immigration services.%0D%0A%0D%0AThank you.'
              className='flex items-center gap-2 hover:text-red-400 transition'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              <MdEmail size={20} /> <span>Mail</span>{' '}
            </a>{' '}
            <a
              href='https://x.com/ikazeservices?s=21&t=u1RWLWjrkW2NiGeKCO2ywQ'
              className='flex items-center gap-2 hover:text-blue-300 transition'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              <FaSquareXTwitter size={20} />{' '}
              <span>@IkazeServices</span>{' '}
            </a>{' '}
          </div>{' '}
          {/* Donate button */}{' '}
          <Link to='/donate'>
            {' '}
            <button className='bg-yellow-500 text-slate-900 px-10 py-3 rounded-full text-sm font-medium hover:bg-yellow-400 transition'>
              {' '}
              Donate{' '}
            </button>{' '}
          </Link>{' '}
        </div>{' '}
      </footer>
    </div>
  )
}

export default ContactUs

import React from 'react'
import logo from '../../assets/Final-logo.jpeg'
import serveOne from '../../assets/who-we-serve-1.jpg'
import '../index.css'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import donateQR from '../../assets/Donate-qr.png'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Legal and Immigration Services.',
    img: serveOne,
  },
  {
    title:
      'Offer citizenship classes to help naturalization applicants.',
    img: serveOne,
  },
  {
    title: 'Resources to access Employment Opportunities.',
    img: serveOne,
  },
  {
    title: 'Translation and Language Services.',
    img: serveOne,
  },
  {
    title: 'Capacity building.',
    img: serveOne,
  },
]

const Home = () => {
  return (
    <div className='font-serif antialiased text-slate-800'>
      {/* HERO */}
      <section className='relative top-10 h-[30vh] md:h-[100vh] sm:min-h-[80vh]'>
        <img
          src={logo}
          alt='Family'
          className='absolute inset-0 w-full h-full object-contain md:object-fill'
        />
        <div className='absolute inset-0 bg-black/35' />

        <div
          className='relative max-w-7xl mx-2 sm:mx-8 left-0 sm:px-2 lg:px-2
                        h-[30vh] sm:min-h-[80vh]
                        flex items-center'
        >
          <div className='text-white max-w-xl'>
            <h1
              className='
              text-[18px]
              sm:text-2xl
              md:text-6xl
              leading-[1.25]
              md:leading-[1]
              mb-4
            '
            >
              Empowering
              <br />
              immigrants
              <br />
              with compassion
              <br />
              and respect.
            </h1>

            <div className='flex flex-wrap gap-4'>
              <Link to={'/donate'}>
                <button
                  className='
                bg-blue-600
                px-3 py-2
                text-sm
                rounded-full
                hover:bg-blue-700
                transition
              '
                >
                  Donate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white px-6 py-20'>
        <div className='max-w-6xl mx-auto space-y-24'>
          {/* DONATION SECTION */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            {/* Text */}
            <div className='text-center md:text-left'>
              <h2 className='text-3xl sm:text-4xl font-serif text-slate-800 mb-6'>
                Support Our Mission
              </h2>

              <p className='text-slate-600 leading-relaxed mb-6'>
                Ikaze Immigrant Services is committed to
                supporting immigrant communities through
                advocacy, education, and access to
                resources. Your contribution allows us to
                continue this work with dignity and care.
              </p>

              <a
                href='https://tally.so/r/WOzDJv'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-slate-800 text-white px-8 py-3 rounded-md hover:bg-slate-700 transition'
              >
                Donate →
              </a>

              <p className='text-xs text-slate-500 mt-4'>
                Ikaze Immigrant Services is a registered
                501(c)(3) nonprofit. Donations may be
                tax-deductible.
              </p>
            </div>

            {/* QR */}
            <div className='flex flex-col items-center'>
              <img
                src={donateQR}
                alt='Scan to donate to Ikaze Immigrant Services'
                className='w-60 sm:w-64 md:w-72 object-contain mb-4'
              />
              <p className='text-sm text-slate-500 text-center'>
                Scan the QR code to open the form.
              </p>
            </div>
          </div>

          {/* IMPACT SECTION */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 text-center'>
            <div className='p-6 bg-slate-50 rounded-lg'>
              <h3 className='text-xl font-serif text-slate-800 mb-3'>
                Advocacy
              </h3>
              <p className='text-slate-600 text-sm'>
                Supporting immigrants through guidance,
                referrals, and community partnerships.
              </p>
            </div>

            <div className='p-6 bg-slate-50 rounded-lg'>
              <h3 className='text-xl font-serif text-slate-800 mb-3'>
                Education
              </h3>
              <p className='text-slate-600 text-sm'>
                Providing reliable information and workshops
                to empower individuals and families.
              </p>
            </div>

            <div className='p-6 bg-slate-50 rounded-lg'>
              <h3 className='text-xl font-serif text-slate-800 mb-3'>
                Community Support
              </h3>
              <p className='text-slate-600 text-sm'>
                Creating safe spaces and resources for
                immigrants navigating complex systems.
              </p>
            </div>
          </div>

          {/* TRANSPARENCY / TRUST SECTION */}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className='bg-slate-50 py-28 sm:py-16 md:py-28'>
        <h2 className='text-center text-2xl sm:text-3xl mb-10 uppercase'>
          What we do
        </h2>

        <div className='max-w-8xl mx-2 px-4 sm:px-6 lg:px-8 space-y-8 grid grid-cols-1 md:grid-cols-2'>
          {services.map((service, i) => (
            <div
              key={i}
              className={`
                flex flex-col
                bg-white
                rounded-tr-[40px]
                rounded-bl-[40px]
                overflow-hidden
                shadow-sm
                mx-2
              `}
            >
              {/* IMAGE */}
              {/* <div className='w-full md:w-1/2 h-56 sm:h-64 md:h-72'>
                <img
                  src={service.img}
                  alt={service.title}
                  className='w-full h-full object-cover'
                />
              </div> */}

              {/* CONTENT */}
              <div className='w-full flex flex-col justify-center p-8 sm:p-10'>
                <h3 className='text-xl text-center sm:text-2xl mb-3'>
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className='py-14 sm:py-16 md:py-20'>
        <h2 className='text-center text-2xl sm:text-3xl mb-14'>
          About Us
        </h2>

        <div
          className='
           max-w-7xl justify-center flex-row gap-4 md:gap-10 md:flex mx-14
          px-4 sm:px-6 lg:px-8
        '
        >
          {[
            {
              title: 'Legal and Immigration Services.',
              desc: 'Accessible, trusted legal support for immigrants and their families.',
            },
            {
              title: 'Community Support',
              desc: 'Connecting immigrants to resources, trust, and opportunity.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`
                flex flex-col
                md:flex
                ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                items-center
                gap-10
              `}
            >
              <div className='w-full'>
                <h3 className='text-xl sm:text-2xl mb-3'>
                  {item.title}
                </h3>
                <p className='text-sm sm:text-base mb-6 text-slate-600'>
                  {item.desc}
                </p>
                <Link to={'/programs'}>
                  <button
                    className='
                  bg-blue-600 text-white
                  px-6 py-3
                  rounded-full
                  text-sm
                  hover:bg-blue-700
                  transition
                '
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN US */}
      <section className='bg-slate-50 py-16 sm:py-20 text-center px-4'>
        <h2 className='text-2xl sm:text-3xl mb-3'>
          Join Us
        </h2>
        <Link to={'/join-us'}>
          <button
            className='
          border px-8 py-3
          rounded-full
          text-sm
          hover:bg-slate-800 hover:text-white
          transition
        '
          >
            Join
          </button>
        </Link>
      </section>

      {/* FOOTER CTA */}
      <footer className='bg-slate-800 text-white px-6 py-5'>
        <div className='max-w-4xl mx-auto flex flex-col items-center text-center gap-3'>
          {/* Text */}
          <p className='text-sm sm:text-base'>
            Ikaze Immigrant Services / 501(c)(3) Charity –
            99-1691713
          </p>

          {/* Social links */}
          <div className='flex items-center justify-center gap-8'>
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

          {/* Donate button */}
          <Link to='/donate'>
            <button className='bg-yellow-500 text-slate-900 px-10 py-3 rounded-full text-sm font-medium hover:bg-yellow-400 transition'>
              Donate
            </button>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Home

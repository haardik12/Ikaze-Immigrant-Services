import React from 'react'
import Nav from './Nav'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import donateQR from '../../assets/Donate-qr.png'

const Donate = () => {
  return (
    <>
      {/* PAGE HEADER */}
      <section className='bg-slate-100 py-24 sm:py-20 text-center px-4'>
        <h1 className='text-3xl mt-10 sm:text-4xl mb-4 font-serif text-slate-800'>
          Donate
        </h1>
      </section>

      {/* CONTENT WRAPPER */}
      {/* CONTENT WRAPPER */}
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

      {/* FOOTER CTA */}
      <footer className='bg-slate-800 text-white px-6 py-5 flex bottom-0'>
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
        </div>
      </footer>
    </>
  )
}

export default Donate
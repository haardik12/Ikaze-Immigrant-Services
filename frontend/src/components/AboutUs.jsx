import React from 'react'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <>
      {/* PAGE HEADER */}
      <section className='bg-slate-100 py-24 sm:py-32 text-center px-4'>
        <h1 className='text-3xl sm:text-4xl mb-4 font-serif text-slate-800'>
          About Us
        </h1>
        <p className='max-w-xl mx-auto text-sm sm:text-base text-slate-600'>
          IKAZE Immigrant Services provides accessible,
          ethical immigration legal support with dignity and
          care.
        </p>
      </section>

      {/* CONTENT WRAPPER */}
      <section className='bg-slate-50 py-16 px-4'>
        <div className='max-w-5xl mx-auto'>
          {/* CONTENT CARD */}
          <div
            className='
              bg-white
              rounded-2xl
              shadow-lg
              p-8
              sm:p-12
              space-y-10
            '
          >
            {/* MISSION */}
            <div>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 tracking-wide'>
                MISSION
              </h2>
              <p className='text-slate-600 text-sm sm:text-base leading-relaxed'>
                Ikaze Immigrant Services (IIS) helps
                immigrants realize their American dream by
                empowering them to achieve their full
                potential. IIS provides top-notch and
                hands-on guidance on navigating immigration
                legal services, citizenship test tutoring,
                and access to career and business support
                services.
              </p>
            </div>

            {/* VISION */}
            <div>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 tracking-wide'>
                VISION
              </h2>
              <p className='text-slate-600 text-sm sm:text-base leading-relaxed'>
                Ikaze Immigrant Services envisions a
                community where no immigrant experiences
                barriers and where they become
                self-sufficient— enhancing productivity and
                the standard of living through diverse
                skills.
              </p>
            </div>

            {/* GOALS */}
            <div>
              <h2 className='text-lg sm:text-xl font-semibold mb-4 tracking-wide'>
                GOALS & OBJECTIVES
              </h2>
              <ul className='list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base'>
                <li>
                  Provide resources to access employment
                  opportunities.
                </li>
                <li>
                  Train and provide life, work, and social
                  skills to manage cultural and language
                  differences.
                </li>
                <li>Provide access to legal services.</li>
                <li>
                  Facilitate citizenship test tutoring.
                </li>
              </ul>
            </div>
          </div>
        </div>
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
    </>
  )
}

export default AboutUs

import React from 'react'
import Nav from './Nav'
// import service1 from '../../assets/Services-card-1.jpeg'
// import service2 from '../../assets/Services-card-2.jpeg'
// import service3 from '../../assets/Services-card-3.jpeg'
// import service4 from '../../assets/Services-card-4.jpeg'
// import service5 from '../../assets/Services-card-5.jpeg'
import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Legal and Immigration Services',
    desc: 'To ensure that immigrants facing removal proceedings and appeals have access to quality legal representation in order to safeguard their rights, protect their interests, and pursue a fair and just resolution to their immigration cases.',
    // img: service1,
  },
  {
    title:
      'Offer citizenship classes to help naturalization applicants',
    desc: 'Learn the information needed to pass the exam portion of the naturalization interview and offer training and resources to immigrants and their families so that they can be informed of their rights, responsibilities, and civic duties as American citizens.',
    // img: service2,
  },
  {
    title: 'Resources to access Employment Opportunities',
    desc: 'To empower immigrants with the necessary support to access employment opportunities, enabling them to contribute to their communities, achieve economic self-sufficiency, and pursue a better quality of life in their new home.',
    // img: service3,
  },
  {
    title: 'Translation and Language Services',
    desc: 'To enable immigrants to communicate with others in a language they are comfortable with and remove social and cultural barriers and limit access to government and community services.',
    // img: service4,
  },
  {
    title: 'Capacity building',
    desc: 'To offer comprehensive training and support to immigrants, equipping them with essential life, work, and social skills to effectively navigate and embrace cultural differences. This empowerment fosters their successful integration into the new community and enhances their overall well-being.',
    // img: service5,
  },
]

const Services = () => {
  return (
    <>
      {/* <div className='bg-slate-900'>
        <Nav />
      </div> */}
      <div className='font-serif antialiased text-slate-800'>
        {/* HEADER */}
        <section className='bg-slate-100 py-24 sm:py-32 text-center px-4'>
          <h1 className='text-3xl sm:text-4xl mb-4'>
            Programs
          </h1>
          <p className='max-w-xl mx-auto text-sm sm:text-xl text-slate-600'>
            IKAZE Immigrant Services provides accessible,
            ethical immigration legal support with dignity
            and care.
          </p>
        </section>

        {/* SERVICES LIST */}
        <section className='py-16 sm:py-20'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16'>
            {services.map((service, i) => (
              <div
                key={i}
                className={`
                flex flex-col
                ${
                  i % 2 !== 0
                    ? 'md:flex-row-reverse'
                    : 'md:flex-row'
                }
                bg-gray-100
                rounded-tr-[40px]
                rounded-bl-[40px]
                overflow-hidden
                shadow-sm
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
                <div className='w-full text-center flex flex-col justify-center p-8 sm:p-10'>
                  <h3 className='text-2xl sm:text-4xl mb-3'>
                    {service.title}
                  </h3>
                  <p className='text-xl sm:text-2xl text-slate-600 mb-6'>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA BUTTON */}
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
    </>
  )
}

export default Services

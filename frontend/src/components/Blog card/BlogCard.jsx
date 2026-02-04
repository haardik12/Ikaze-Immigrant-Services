import { FaBluesky } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

/* ---------- helpers ---------- */
const stripHtml = (html) => {
  if (!html) return ''
  return html
    .replace(/<[^>]+>/g, '') // remove all HTML tags
    .replace(/\s+/g, ' ') // normalize spaces
    .trim()
}

const getPreview = (html, length = 800) => {
  const text = stripHtml(html)
  return text.length > length
    ? text.slice(0, length) + '…'
    : text
}
/* ----------------------------- */

const BlogCard = ({ items }) => {
  const navigate = useNavigate()

  return (
    <li className='flex flex-col bg-white rounded-xl shadow-md border border-white/20 p-6'>
      {/* TITLE */}
      <h3 className='mb-4 font-semibold uppercase'>
        <span className='block text-xl text-indigo-600'>
          {items.title}
        </span>
      </h3>

      {/* DESCRIPTION PREVIEW */}
      <p className='text-gray-700 text-sm leading-relaxed line-clamp-5'>
        {getPreview(items.description)}
      </p>

      {/* ACTIONS */}
      <div className='flex flex-wrap items-center justify-between gap-4 mt-6'>
        {/* READ MORE */}
        <button
          onClick={() => navigate(`/blog/${items._id}`)}
          className='inline-flex items-center h-9 rounded-full text-sm font-semibold px-8
            bg-slate-100 text-slate-800 hover:bg-blue-600 hover:text-white transition'
        >
          Read More
        </button>

        {/* SOCIAL ICONS */}
        <div className='flex items-center gap-4'>
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
      </div>
    </li>
  )
}

export default BlogCard

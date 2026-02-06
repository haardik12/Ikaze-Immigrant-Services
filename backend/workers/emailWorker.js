import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { Worker } from 'bullmq'
import Brevo from '@getbrevo/brevo'

// --------------------
// CONNECT TO MONGODB
// --------------------
try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('📦 Worker MongoDB connected')
} catch (error) {
  console.error(
    '❌ Worker MongoDB connection failed:',
    error,
  )
  process.exit(1)
}

// --------------------
// Brevo setup
// --------------------
const brevo = new Brevo.TransactionalEmailsApi()
brevo.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
)

// --------------------
// Constants
// --------------------
const SENDER = {
  email: 'contact@ikazeimmigrantadvocates.org',
  name: 'Ikaze Immigrant Advocates',
}

const REPLY_TO = {
  email: 'claudine@ikazeimmigrantadvocates.org',
  name: 'Claudine Gasana',
}

const LOGO_URL = process.env.EMAIL_LOGO_URL
const QR_URL = process.env.EMAIL_QR_URL

// --------------------
// Worker
// --------------------
const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    switch (job.name) {
      // ====================
      // WELCOME EMAIL
      // ====================
      case 'welcomeEmail': {
        const { email, name, unsubscribeToken } = job.data

        await brevo.sendTransacEmail({
          to: [{ email }],
          sender: SENDER,
          replyTo: REPLY_TO,
          subject: 'Welcome to Ikaze Immigrant Advocates',
          tags: ['welcome-email'],
          htmlContent: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:24px;">
              <img src="${LOGO_URL}" width="120" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1>Welcome ${name} 👋</h1>
              <p>
                Thank you for subscribing to <strong>Ikaze Immigrant Advocates</strong>.
                You’ll now receive updates and important news.
              </p>

              <hr style="margin:32px 0" />

              <h3>Support Our Work</h3>
              <p>Your support helps us empower immigrants with compassion and respect.</p>
              <img src="${QR_URL}" width="140" />

              <p style="font-size:12px;color:#777;margin-top:24px;">
                <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        })
        break
      }

      // ====================
      // NEWSLETTER TRIGGER
      // ====================
      case 'newsletterEmail': {
        const { blogId, title, description } = job.data

        const Subscriber = (
          await import('../models/Subscribers.js')
        ).default

        const subscribers = await Subscriber.find(
          {},
          'email unsubscribeToken',
        )

        if (!subscribers.length) {
          console.log('ℹ️ No subscribers found')
          return
        }

        const { emailQueue } =
          await import('../queue/queue.js')

        for (const subscriber of subscribers) {
          await emailQueue.add(
            'newsletterSingle',
            {
              email: subscriber.email,
              blogId,
              title,
              description,
              unsubscribeToken: subscriber.unsubscribeToken,
            },
            {
              jobId: `newsletter-${blogId}-${subscriber.email}`,
            },
          )
        }

        break
      }

      // ====================
      // NEWSLETTER PER USER
      // ====================
      case 'newsletterSingle': {
        const {
          email,
          blogId,
          title,
          description,
          unsubscribeToken,
        } = job.data

        await brevo.sendTransacEmail({
          to: [{ email }],
          sender: SENDER,
          replyTo: REPLY_TO,
          subject: `New Blog: ${title}`,
          tags: ['newsletter'],
          htmlContent: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:24px;">
              <img src="${LOGO_URL}" width="120" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2>${title}</h2>
              <p>${description.substring(0, 250)}...</p>

              <p>
                <a href="${process.env.FRONTEND_URL}/blog/${blogId}">
                  Read full article →
                </a>
              </p>

              <hr style="margin:32px 0" />

              <h3>Support Our Mission</h3>
              <img src="${QR_URL}" width="140" />

              <p style="font-size:12px;color:#777;margin-top:24px;">
                <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        })
        break
      }

      default:
        console.warn(`Unknown job type: ${job.name}`)
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  },
)

// --------------------
// Logging
// --------------------
emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.name} (${job.id}) completed`)
})

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.name} failed:`, err.message)
})

console.log('📨 Email worker started')

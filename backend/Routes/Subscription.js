import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import axios from 'axios'
import Subscriber from '../models/Subscribers.js'
import Brevo from '@getbrevo/brevo'

const router = express.Router()

// --------------------
// Brevo setup
// --------------------
const brevo = new Brevo.TransactionalEmailsApi()
brevo.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
)

// --------------------
// Email constants
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

// ==============================
// POST /api/subscribe
// ==============================
router.post('/', async (req, res) => {
  const { email, name, captchaToken } = req.body

  // -----------------------
  // VALIDATIONS
  // -----------------------
  if (!captchaToken) {
    return res.status(400).json({
      message: 'Captcha verification required',
    })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ message: 'Invalid email address' })
  }

  if (!name || name.trim().length === 0) {
    return res
      .status(400)
      .json({ message: 'Name is required' })
  }

  try {
    // -----------------------
    // VERIFY reCAPTCHA
    // -----------------------
    const captchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      },
    )

    if (!captchaResponse.data.success) {
      return res.status(403).json({
        message: 'Captcha verification failed',
      })
    }

    // -----------------------
    // SAVE SUBSCRIBER
    // -----------------------
    const subscriber = new Subscriber({ email, name })
    await subscriber.save()

    // -----------------------
    // SEND WELCOME EMAIL (DIRECT)
    // -----------------------
    await brevo.sendTransacEmail({
      to: [{ email: subscriber.email }],
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
                <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${subscriber.unsubscribeToken}">
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

    res.status(201).json({
      message:
        'Subscribed successfully! Welcome email sent.',
    })
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'Email already subscribed' })
    }

    console.error('Subscription error:', error)
    res
      .status(500)
      .json({ message: 'Internal server error' })
  }
})

// ==============================
// GET /unsubscribe
// ==============================
router.get('/unsubscribe', async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res
      .status(400)
      .send('<h1>Invalid unsubscribe link</h1>')
  }

  try {
    const subscriber = await Subscriber.findOneAndDelete({
      unsubscribeToken: token,
    })

    if (!subscriber) {
      return res
        .status(404)
        .send(
          '<h1>Subscriber not found or already unsubscribed</h1>',
        )
    }

    res.send(`
      <h1>Unsubscribed Successfully</h1>
      <p>You have been removed from our newsletter.</p>
      <a href="${process.env.FRONTEND_URL}">Back to site</a>
    `)
  } catch (error) {
    console.error('Unsubscribe error:', error)
    res.status(500).send('<h1>Internal server error</h1>')
  }
})

export default router

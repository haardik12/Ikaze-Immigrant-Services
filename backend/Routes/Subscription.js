import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import axios from 'axios'
import { emailQueue } from '../queue/queue.js'
import Subscriber from '../models/Subscribers.js'
import Brevo from '@getbrevo/brevo'

const router = express.Router()

// Initialize Brevo API client (unchanged)
const apiInstance = new Brevo.TransactionalEmailsApi()
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
)

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
    // SEND WELCOME EMAIL
    // -----------------------
    await emailQueue.add('welcomeEmail', {
      email: subscriber.email,
      name: subscriber.name,
      unsubscribeToken: subscriber.unsubscribeToken,
    })

    res.status(201).json({
      message:
        'Subscribed successfully! A welcome email will be sent shortly.',
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

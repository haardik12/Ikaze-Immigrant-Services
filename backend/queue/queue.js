import { Queue } from 'bullmq'

export const emailQueue = new Queue('emailQueue', {
  connection: process.env.REDIS_URL
    ? { url: process.env.REDIS_URL }
    : { host: 'localhost', port: 6379 },
})

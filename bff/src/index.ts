import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import NodeCache from 'node-cache'
import { qiitaRouter } from './routes/qiita'
import { careersRouter } from './routes/careers'
import { noticesRouter } from './routes/notices'

const app = express()
const PORT = process.env.PORT ?? 3001

// In-memory cache: TTL 15分
export const cache = new NodeCache({ stdTTL: 900, checkperiod: 120 })

app.use(cors({
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
}))
app.use(express.json())

// Health check for k8s liveness/readiness probes
app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() })
})

app.use('/api/qiita', qiitaRouter)
app.use('/api/careers', careersRouter)
app.use('/api/notices', noticesRouter)

// Cache stats (debug)
app.get('/api/_cache', (_req, res) => {
  res.json({
    keys: cache.keys(),
    stats: cache.getStats(),
  })
})

app.listen(PORT, () => {
  console.log(`BFF listening on :${PORT}`)
})

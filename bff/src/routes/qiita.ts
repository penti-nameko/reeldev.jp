import { Router, Request, Response } from 'express'
import { cache } from '../index'

export const qiitaRouter = Router()

const QIITA_API = 'https://qiita.com/api/v2'
const QIITA_USER = process.env.QIITA_USER ?? 'riel-hosiduki'
const QIITA_TOKEN = process.env.QIITA_TOKEN  // optional — higher rate limit

function qiitaHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (QIITA_TOKEN) headers['Authorization'] = `Bearer ${QIITA_TOKEN}`
  return headers
}

// GET /api/qiita/articles
// query: per_page (default 10, max 20)
qiitaRouter.get('/articles', async (req: Request, res: Response) => {
  const perPage = Math.min(Number(req.query['per_page'] ?? 10), 20)
  const cacheKey = `qiita:articles:${perPage}`

  const hit = cache.get<unknown>(cacheKey)
  if (hit) {
    res.json({ data: hit, cached_at: 'cache' })
    return
  }

  try {
    const upstream = await fetch(
      `${QIITA_API}/users/${QIITA_USER}/items?per_page=${perPage}`,
      { headers: qiitaHeaders() }
    )
    if (!upstream.ok) {
      const body = await upstream.text()
  console.error('[qiita] status:', upstream.status, body)
      res.status(upstream.status).json({ error: 'Qiita API error', status: upstream.status, detail: body })
      return
    }
    const articles = await upstream.json()
    cache.set(cacheKey, articles)
    res.json({ data: articles, cached_at: new Date().toISOString() })
  } catch (err) {
    console.error('[qiita] fetch error:', err)
    res.status(502).json({ error: 'upstream error' })
  }
})

// GET /api/qiita/articles/:id
qiitaRouter.get('/articles/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const cacheKey = `qiita:article:${id}`

  const hit = cache.get<unknown>(cacheKey)
  if (hit) {
    res.json({ data: hit, cached_at: 'cache' })
    return
  }

  try {
    const upstream = await fetch(
      `${QIITA_API}/items/${id}`,
      { headers: qiitaHeaders() }
    )
    if (!upstream.ok) {
      const body = await upstream.text()
      console.error('[qiita] status:', upstream.status, body)
      res.status(upstream.status).json({ error: 'Qiita API error', status: upstream.status, detail: body })
      return
    }
    const article = await upstream.json()
    cache.set(cacheKey, article)
    res.json({ data: article, cached_at: new Date().toISOString() })
  } catch (err) {
    console.error('[qiita] fetch error:', err)
    res.status(502).json({ error: 'upstream error' })
  }
})

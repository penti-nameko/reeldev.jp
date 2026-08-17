import { Router, Request } from 'express'
import type { Notice } from '../types'

export const noticesRouter = Router()

// お知らせ一覧 — 静的管理。後でDBやCMSに差し替え可能
const NOTICES: Notice[] = [
  {
    id: '1', date: '2024-08-12', category: 'release',
    title: 'ポートフォリオサイトをリニューアルしました',
    body: 'React + TypeScript + k8s 構成にて全面的にリニューアル。Qiita の記事が自動反映されるようになりました。',
  },
 {
    id: '2', date: '2024-08-13', category: 'update',
    title: '定期メンテナンスのお知らせ',
    body: '定期メンテナンスを実施予定です。',
  },
]

noticesRouter.get('/', (req: Request, res) => {
  const limit = req.query['limit'] ? Number(req.query['limit']) : undefined
  const data = limit ? NOTICES.slice(0, limit) : NOTICES
  res.json({ data })
})

import { Router, Request } from 'express'
import type { Notice } from '../types'

export const noticesRouter = Router()

// お知らせ一覧 — 静的管理。後でDBやCMSに差し替え可能
const NOTICES: Notice[] = [
  {
    id: '1', date: '2024-06-01', category: 'release',
    title: 'ポートフォリオサイトをリニューアルしました',
    body: 'React + TypeScript + k8s 構成にて全面的にリニューアル。Qiita の記事が自動反映されるようになりました。',
  },
  {
    id: '2', date: '2024-05-10', category: 'update',
    title: 'Qiita に新記事を投稿しました',
    url: 'https://qiita.com',
  },
  {
    id: '3', date: '2024-04-15', category: 'info',
    title: 'OSS コントリビュート活動を開始しました',
    body: 'ingress-nginx 周りのドキュメント整備にコントリビュートを開始しました。',
  },
  {
    id: '4', date: '2024-03-01', category: 'release',
    title: '個人プロジェクト v2.0 をリリース',
    url: 'https://github.com',
  },
]

noticesRouter.get('/', (req: Request, res) => {
  const limit = req.query['limit'] ? Number(req.query['limit']) : undefined
  const data = limit ? NOTICES.slice(0, limit) : NOTICES
  res.json({ data })
})

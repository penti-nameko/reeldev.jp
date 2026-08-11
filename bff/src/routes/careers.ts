import { Router } from 'express'
import type { Career } from '../types'

export const careersRouter = Router()

// Static data — edit here or replace with DB later
const CAREERS: Career[] = [
  {
    id: '1',
    company: 'デジタル創作サークルUniProject',
    role: '暫定Infraチーム',
    period: '2022年4月 — 現在',
    description: 'K8sクラスタの構築・運用、CI/CDパイプラインの設計・構築、Webサービスの開発・運用関連の予備要員。',
    technologies: ['TypeScript', 'React', 'Go', 'Kubernetes', 'ArgoCD', 'Other'],
  },
  {
    id: '2',
    company: '湘南藤沢高専 Discordキャンパス ',
    role: 'OSS制作科:学科長',
    period: '2026年4月 — ',
    description: '多種多様なOSSプロジェクトを管理し、他のメンバーと協力しつつOSSの配布、制作を行う。',
    technologies: ['Node.js', 'Python', 'Other'],
  },
]

careersRouter.get('/', (_req, res) => {
  res.json({ data: CAREERS })
})

import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import type { Notice } from '../types'

const CATEGORIES: { value: Notice['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'release', label: 'リリース' },
  { value: 'update', label: 'アップデート' },
  { value: 'info', label: 'お知らせ' },
]

const CATEGORY_COLOR: Record<Notice['category'], string> = {
  info: '#2D5BE3',
  update: '#16A34A',
  release: '#EA580C',
}

export default function NoticeList() {
  const { data: notices, loading } = useApi<Notice[]>('/api/notices')
  const [filter, setFilter] = useState<Notice['category'] | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all'
    ? (notices ?? MOCK_NOTICES)
    : (notices ?? MOCK_NOTICES).filter((n) => n.category === filter)

  return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-6)' }}>
      <p className="section-eyebrow">Notice</p>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 'var(--space-8)' }}>お知らせ</h1>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 999,
              border: '1px solid',
              borderColor: filter === cat.value ? 'var(--color-accent)' : 'var(--color-border)',
              background: filter === cat.value ? 'var(--color-tag-bg)' : 'transparent',
              color: filter === cat.value ? 'var(--color-accent)' : 'var(--color-ink-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--color-border)' }}>
              <div className="skeleton" style={{ height: 14, width: '60%' }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((notice) => (
            <div
              key={notice.id}
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <button
                onClick={() => notice.body ? setExpanded(expanded === notice.id ? null : notice.id) : undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4) 0',
                  textAlign: 'left',
                  cursor: notice.body ? 'pointer' : 'default',
                  background: 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--color-ink-muted)',
                  minWidth: 84,
                  flexShrink: 0,
                }}>
                  {notice.date}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  padding: '1px 8px',
                  borderRadius: 999,
                  border: `1px solid ${CATEGORY_COLOR[notice.category]}`,
                  color: CATEGORY_COLOR[notice.category],
                  flexShrink: 0,
                }}>
                  {notice.category}
                </span>
                <span style={{ fontSize: 14, color: 'var(--color-ink)', flex: 1 }}>
                  {notice.title}
                </span>
                {notice.url && (
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: 12, color: 'var(--color-accent)', flexShrink: 0 }}
                  >
                    詳細 →
                  </a>
                )}
                {notice.body && (
                  <span style={{ fontSize: 12, color: 'var(--color-ink-muted)', flexShrink: 0 }}>
                    {expanded === notice.id ? '▲' : '▼'}
                  </span>
                )}
              </button>
              {expanded === notice.id && notice.body && (
                <div style={{
                  padding: 'var(--space-4)',
                  paddingTop: 0,
                  paddingLeft: 'calc(84px + var(--space-4) + 56px + var(--space-4))',
                  fontSize: 13,
                  color: 'var(--color-ink-secondary)',
                  lineHeight: 1.8,
                }}>
                  {notice.body}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const MOCK_NOTICES: Notice[] = [
  {
    id: '1', date: '2024-06-01', category: 'release',
    title: 'ポートフォリオサイトをリニューアルしました',
    body: 'React + TypeScript + k8s 構成にて全面的にリニューアルしました。Qiita の記事が自動反映されるようになりました。',
  },
  {
    id: '2', date: '2024-05-10', category: 'update',
    title: 'Qiita に新記事を投稿しました', url: 'https://qiita.com',
  },
  {
    id: '3', date: '2024-04-15', category: 'info',
    title: 'OSS コントリビュート活動を開始しました',
    body: 'ingress-nginx 周りのドキュメント整備にコントリビュートを開始しました。',
  },
  {
    id: '4', date: '2024-03-01', category: 'release',
    title: '個人プロジェクト v2.0 をリリースしました', url: 'https://github.com',
  },
  {
    id: '5', date: '2024-01-15', category: 'info',
    title: '技術顧問活動を開始しました',
  },
]

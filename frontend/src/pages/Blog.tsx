import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import type { QiitaArticle } from '../types'

export default function Blog() {
  const { data: articles, loading, error } = useApi<QiitaArticle[]>('/api/qiita/articles?per_page=20')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = articles
    ? [...new Set(articles.flatMap((a) => a.tags.map((t) => t.name)))]
    : []

  const filtered = selectedTag
    ? (articles ?? []).filter((a) => a.tags.some((t) => t.name === selectedTag))
    : (articles ?? [])

  return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-6)' }}>
      <p className="section-eyebrow">Blog</p>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 'var(--space-8)' }}>記事一覧</h1>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          <button
            onClick={() => setSelectedTag(null)}
            style={{
              fontSize: 12,
              padding: '3px 10px',
              borderRadius: 999,
              border: '1px solid',
              borderColor: selectedTag === null ? 'var(--color-accent)' : 'var(--color-border)',
              background: selectedTag === null ? 'var(--color-tag-bg)' : 'transparent',
              color: selectedTag === null ? 'var(--color-accent)' : 'var(--color-ink-secondary)',
              cursor: 'pointer',
            }}
          >
            すべて
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              style={{
                fontSize: 12,
                padding: '3px 10px',
                borderRadius: 999,
                border: '1px solid',
                borderColor: selectedTag === tag ? 'var(--color-accent)' : 'var(--color-border)',
                background: selectedTag === tag ? 'var(--color-tag-bg)' : 'transparent',
                color: selectedTag === tag ? 'var(--color-accent)' : 'var(--color-ink-secondary)',
                cursor: 'pointer',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p style={{ color: '#DC2626', fontSize: 14 }}>記事の取得に失敗しました。しばらく後に再試行してください。</p>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 'var(--space-6)', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 12, width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

function ArticleListItem({ article }: { article: QiitaArticle }) {
  const date = new Date(article.created_at).toLocaleDateString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-6)',
        padding: 'var(--space-5) 0',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background var(--transition)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#00000003' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--color-ink-muted)',
        minWidth: 84,
        paddingTop: 3,
        flexShrink: 0,
      }}>
        {date}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
          {article.tags.slice(0, 4).map((tag) => (
            <span key={tag.name} className="tag">{tag.name}</span>
          ))}
        </div>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)', lineHeight: 1.5 }}>
          {article.title}
        </p>
      </div>
      <span style={{ fontSize: 13, color: 'var(--color-ink-muted)', flexShrink: 0, paddingTop: 2 }}>
        ♡ {article.likes_count}
      </span>
    </a>
  )
}

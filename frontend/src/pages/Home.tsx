import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import type { QiitaArticle, Notice } from '../types'

export default function Home() {
  const { data: articles, loading: articlesLoading } = useApi<QiitaArticle[]>('/api/qiita/articles?per_page=3')
  const { data: notices, loading: noticesLoading } = useApi<Notice[]>('/api/notices?limit=3')

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-24) 0',
      }}>
        <div className="container">
          <p className="section-eyebrow">Software Engineer</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: 'var(--space-6)',
            maxWidth: 700,
          }}>
            コードで<br />
            <span style={{ color: 'var(--color-accent)' }}>問題を解く</span>
            エンジニア
          </h1>
          <p style={{
            fontSize: 16,
            color: 'var(--color-ink-secondary)',
            maxWidth: 520,
            marginBottom: 'var(--space-8)',
            lineHeight: 1.8,
          }}>
            TypeScript / React / k8s を中心に、
            スケーラブルなWebアプリケーションを設計・開発しています。
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/career" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--color-accent)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 14,
              fontWeight: 500,
              transition: 'background var(--transition)',
            }}>
              経歴を見る →
            </Link>
            <Link to="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'transparent',
              color: 'var(--color-ink)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid var(--color-border)',
              transition: 'border-color var(--transition)',
            }}>
              記事を読む
            </Link>
          </div>

          {/* Tech stack chips */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-12)' }}>
            {['TypeScript', 'React', 'Node.js', 'Kubernetes', 'ArgoCD', 'Go'].map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section style={{ padding: 'var(--space-16) 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
            <div>
              <p className="section-eyebrow">Notice</p>
              <h2 style={{ fontSize: 20, fontWeight: 600 }}>お知らせ</h2>
            </div>
            <Link to="/notices" style={{ fontSize: 13, color: 'var(--color-accent)' }}>一覧を見る →</Link>
          </div>

          {noticesLoading ? (
            <NoticesSkeleton />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {(notices ?? MOCK_NOTICES.slice(0, 3)).map((notice) => (
                <NoticeRow key={notice.id} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}>
            <div>
              <p className="section-eyebrow">Blog</p>
              <h2 style={{ fontSize: 20, fontWeight: 600 }}>最近の記事</h2>
            </div>
            <Link to="/blog" style={{ fontSize: 13, color: 'var(--color-accent)' }}>一覧を見る →</Link>
          </div>

          {articlesLoading ? (
            <ArticlesSkeleton />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}>
              {(articles ?? MOCK_ARTICLES).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function NoticeRow({ notice }: { notice: Notice }) {
  const categoryColor: Record<Notice['category'], string> = {
    info: '#2D5BE3',
    update: '#16A34A',
    release: '#EA580C',
  }
  const categoryLabel: Record<Notice['category'], string> = {
    info: 'info',
    update: 'update',
    release: 'release',
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-3) 0',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--color-ink-muted)',
        minWidth: 80,
        flexShrink: 0,
      }}>
        {notice.date}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        padding: '1px 6px',
        borderRadius: 999,
        border: `1px solid ${categoryColor[notice.category]}`,
        color: categoryColor[notice.category],
        flexShrink: 0,
      }}>
        {categoryLabel[notice.category]}
      </span>
      {notice.url ? (
        <a
          href={notice.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 14, color: 'var(--color-ink)' }}
        >
          {notice.title}
        </a>
      ) : (
        <span style={{ fontSize: 14 }}>{notice.title}</span>
      )}
    </div>
  )
}

function ArticleCard({ article }: { article: QiitaArticle }) {
  const date = new Date(article.created_at).toLocaleDateString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow var(--transition), transform var(--transition)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag.name} className="tag">{tag.name}</span>
        ))}
      </div>
      <h3 style={{
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.5,
        color: 'var(--color-ink)',
        marginBottom: 'var(--space-3)',
      }}>
        {article.title}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-muted)' }}>
          {date}
        </span>
        <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
          ♡ {article.likes_count}
        </span>
      </div>
    </a>
  )
}

function ArticlesSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)' }}>
          <div className="skeleton" style={{ height: 16, width: '60%', marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 20, width: '90%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 20, width: '75%', marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 12, width: '30%' }} />
        </div>
      ))}
    </div>
  )
}

function NoticesSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="skeleton" style={{ height: 12, width: 72 }} />
          <div className="skeleton" style={{ height: 16, width: 48 }} />
          <div className="skeleton" style={{ height: 14, width: '50%' }} />
        </div>
      ))}
    </div>
  )
}

// Fallback mock data (表示確認用 — BFFが起動するまで)
const MOCK_ARTICLES: QiitaArticle[] = [
  {
    id: '1', title: 'k8s + ArgoCD で GitOps を実践する', url: '#',
    created_at: '2024-05-01T00:00:00Z', updated_at: '2024-05-01T00:00:00Z',
    tags: [{ name: 'Kubernetes', versions: [] }, { name: 'ArgoCD', versions: [] }],
    likes_count: 42, page_views_count: 1200, body: '',
  },
  {
    id: '2', title: 'React 19 の新機能まとめ', url: '#',
    created_at: '2024-04-15T00:00:00Z', updated_at: '2024-04-15T00:00:00Z',
    tags: [{ name: 'React', versions: [] }, { name: 'TypeScript', versions: [] }],
    likes_count: 88, page_views_count: 3400, body: '',
  },
  {
    id: '3', title: 'ingress-nginx でカナリアリリースを実装する', url: '#',
    created_at: '2024-03-20T00:00:00Z', updated_at: '2024-03-20T00:00:00Z',
    tags: [{ name: 'Kubernetes', versions: [] }, { name: 'nginx', versions: [] }],
    likes_count: 31, page_views_count: 890, body: '',
  },
]

const MOCK_NOTICES: Notice[] = [
  { id: '1', date: '2024-06-01', category: 'release', title: 'ポートフォリオサイトをリニューアルしました' },
  { id: '2', date: '2024-05-10', category: 'update', title: 'Qiita に新記事を投稿しました', url: '#' },
  { id: '3', date: '2024-04-01', category: 'info', title: '新しいプロジェクトを開始しました' },
]

import { useApi } from '../hooks/useApi'
import type { Career } from '../types'

const SKILLS = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'Vite', 'CSS Modules'] },
  { category: 'Backend', items: ['Node.js', 'Go', 'PostgreSQL', 'Redis'] },
  { category: 'Infrastructure', items: ['Kubernetes', 'ArgoCD', 'ingress-nginx', 'Terraform'] },
  { category: 'Tools', items: ['GitHub Actions', 'Datadog', 'Docker', 'Figma'] },
]

export default function CareerPage() {
  const { data: careers, loading } = useApi<Career[]>('/api/careers')

  return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-6)' }}>
      <p className="section-eyebrow">Career</p>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 'var(--space-12)' }}>経歴・スキル</h1>

      {/* Skills grid */}
      <section style={{ marginBottom: 'var(--space-16)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 'var(--space-6)' }}>技術スタック</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {SKILLS.map((group) => (
            <div key={group.category} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-3)',
              }}>
                {group.category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {group.items.map((item) => (
                  <span key={item} style={{
                    fontSize: 13,
                    padding: '2px 8px',
                    background: 'var(--color-bg)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-ink)',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 'var(--space-8)' }}>職歴</h2>
        {loading ? (
          <TimelineSkeleton />
        ) : (
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 0,
              width: 1,
              background: 'var(--color-border)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              {(careers ?? MOCK_CAREERS).map((career) => (
                <CareerItem key={career.id} career={career} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function CareerItem({ career }: { career: Career }) {
  return (
    <div style={{ paddingLeft: 'var(--space-8)', position: 'relative' }}>
      {/* dot */}
      <div style={{
        position: 'absolute',
        left: -4,
        top: 8,
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        border: '2px solid var(--color-bg)',
        boxShadow: '0 0 0 1px var(--color-accent)',
      }} />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-muted)', marginBottom: 4 }}>
        {career.period}
      </p>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{career.company}</h3>
      <p style={{ fontSize: 13, color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}>{career.role}</p>
      <p style={{ fontSize: 14, color: 'var(--color-ink-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
        {career.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {career.technologies.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </div>
  )
}

function TimelineSkeleton() {
  return (
    <div style={{ paddingLeft: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="skeleton" style={{ height: 11, width: 100, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 20, width: 160, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 14, width: 240, marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 14, width: '80%' }} />
        </div>
      ))}
    </div>
  )
}

const MOCK_CAREERS: Career[] = [
  {
    id: '1',
    company: '株式会社 Example A',
    role: 'シニアソフトウェアエンジニア',
    period: '2022年4月 — 現在',
    description: 'マイクロサービスアーキテクチャへの移行を主導。k8s / ArgoCD による GitOps パイプラインを構築し、デプロイ頻度を週1回から日次へ改善。フロントエンドは React + TypeScript で再設計し、Core Web Vitals スコアを大幅改善。',
    technologies: ['TypeScript', 'React', 'Go', 'Kubernetes', 'ArgoCD', 'PostgreSQL'],
  },
  {
    id: '2',
    company: '株式会社 Example B',
    role: 'ソフトウェアエンジニア',
    period: '2020年4月 — 2022年3月',
    description: 'ECサイトのバックエンド API を Node.js で開発。Redis を用いたキャッシュ戦略の設計・実装により応答時間を60%削減。CI/CD パイプライン整備と開発ドキュメントの体系化を担当。',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'MySQL', 'Docker', 'GitHub Actions'],
  },
  {
    id: '3',
    company: '株式会社 Example C',
    role: 'フロントエンドエンジニア（新卒）',
    period: '2018年4月 — 2020年3月',
    description: 'SaaS プロダクトのフロントエンド開発に従事。Vue.js から React への技術移行プロジェクトに参加し、コンポーネント設計の標準化を推進。',
    technologies: ['JavaScript', 'React', 'Vue.js', 'SCSS'],
  },
]

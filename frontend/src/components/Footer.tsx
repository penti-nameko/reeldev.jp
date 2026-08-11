export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-8) 0',
      marginTop: 'var(--space-24)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-ink-muted)' }}>
          © {new Date().getFullYear()} Riel Hosiduki. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          <a
            href="https://qiita.com/riel-hosiduki"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}
          >
            Qiita
          </a>
          <a
            href="https://github.com/penti-nameko"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/riel_hosiduki"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}
          >
            X (Twitter)
          </a>
        </div>
      </div>
    </footer>
  )
}

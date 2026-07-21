export function AdvicePanel({ audience, advice, isLoading, error }) {
  return (
    <aside className="panel advice-panel">
      <div className="panel-heading">
        <p className="eyebrow">Step 3</p>
        <h2>{advice.title}</h2>
        <p className="panel-copy">
          {isLoading ? 'Generating your AI advice now...' : 'The AI report will appear here after submission.'}
        </p>
      </div>

      {error ? (
        <div className="advice-callout">
          <p>{error}</p>
        </div>
      ) : (
        <div className="advice-callout">
          <p style={{ whiteSpace: 'pre-wrap' }}>{advice.description}</p>
        </div>
      )}

      <div className="summary-chip-row">
        <span>Audience: {audience}</span>
        <span>{isLoading ? 'Generating…' : 'Advice ready'}</span>
      </div>

      <ul className="advice-list">
        {advice.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}

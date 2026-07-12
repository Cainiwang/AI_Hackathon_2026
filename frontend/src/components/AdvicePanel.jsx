export function AdvicePanel({ audience, advice }) {
  return (
    <aside className="panel advice-panel">
      <div className="panel-heading">
        <p className="eyebrow">Step 3</p>
        <h2>{advice.title}</h2>
        <p className="panel-copy">
          The AI advice will connect later. For now this is a frontend placeholder for the final
          response.
        </p>
      </div>

      <div className="advice-callout">
        <p>{advice.description}</p>
      </div>

      <div className="summary-chip-row">
        <span>Audience: {audience}</span>
        <span>Advice ready</span>
      </div>

      <ul className="advice-list">
        {advice.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}

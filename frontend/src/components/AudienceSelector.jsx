export function AudienceSelector({ onSelect }) {
  return (
    <section className="panel audience-panel">
      <div className="panel-heading">
        <p className="eyebrow">Step 1</p>
        <h2>Who is this for?</h2>
        <p className="panel-copy">
          Start by choosing the audience type so the next screen can tailor the inputs and future
          AI advice.
        </p>
      </div>

      <div className="choice-grid">
        <button type="button" className="choice-card" onClick={() => onSelect('business')}>
          <span className="choice-tag">Business</span>
          <strong>Commercial customer</strong>
          <span>Use this for company or business banking scenarios.</span>
        </button>

        <button type="button" className="choice-card" onClick={() => onSelect('personal')}>
          <span className="choice-tag">Personal</span>
          <strong>Retail customer</strong>
          <span>Use this for individual or household banking scenarios.</span>
        </button>
      </div>
    </section>
  )
}

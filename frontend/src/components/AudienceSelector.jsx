export function AudienceSelector({ onSelect }) {
  return (
    <section className="panel audience-panel">
      <div className="panel-heading">
        <p className="eyebrow">Step 1</p>
        <h2>What is this for?</h2>
        <p className="panel-copy">
          Start by choosing the audience type so the next screen can tailor the inputs and future
          AI advice.
        </p>
      </div>

      <div className="choice-grid">
        <button type="button" className="choice-card" onClick={() => onSelect('savings')}>
          <span className="choice-tag">Savings</span>
          <strong>Saving Interest</strong>
          <span>See how OCR changes may affect the interest you earn on your savings.</span>
        </button>

        <button type="button" className="choice-card" onClick={() => onSelect('borrowing')}>
          <span className="choice-tag">Borrowing</span>
          <strong>Loan Interest</strong>
          <span>See how OCR changes may affect the interest you pay on loans.</span>
        </button>
      </div>
    </section>
  )
}

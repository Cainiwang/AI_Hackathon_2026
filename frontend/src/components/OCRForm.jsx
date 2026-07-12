import { useState } from 'react'

const initialForm = {
  currentOCRRate: '',
  currentBankRate: '',
  targetBankRate: '',
  customerNumber: '',
  averageBalance: '',
}

export function OCRForm({ audience, onSubmit }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <p className="eyebrow">Step 2</p>
        <h2>Enter the rate inputs</h2>
        <p className="panel-copy">
          Fill in the numbers you want to compare. The advice panel will show a placeholder result
          for now.
        </p>
      </div>

      <div className="field-grid">
        <label>
          <span>Current OCR rate (%)</span>
          <input
            type="number"
            name="currentOCRRate"
            value={form.currentOCRRate}
            onChange={handleChange}
            placeholder="5.50"
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          <span>Current bank rate (%)</span>
          <input
            type="number"
            name="currentBankRate"
            value={form.currentBankRate}
            onChange={handleChange}
            placeholder="4.75"
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          <span>Target bank rate (%)</span>
          <input
            type="number"
            name="targetBankRate"
            value={form.targetBankRate}
            onChange={handleChange}
            placeholder="6.00"
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          <span>Customer number</span>
          <input
            type="number"
            name="customerNumber"
            value={form.customerNumber}
            onChange={handleChange}
            placeholder="250"
            min="0"
            required
          />
        </label>

        <label className="full-width">
          <span>Average balance</span>
          <input
            type="number"
            name="averageBalance"
            value={form.averageBalance}
            onChange={handleChange}
            placeholder="15000"
            step="0.01"
            min="0"
            required
          />
        </label>
      </div>

      <button type="submit" className="primary-button">
        Generate advice
      </button>

      <p className="form-footnote">
        Audience selected: <strong>{audience}</strong>
      </p>
    </form>
  )
}

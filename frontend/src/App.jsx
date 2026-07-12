import { useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
import './App.css'

const audienceOptions = [
  {
    id: 'business',
    label: 'Load Interest',
    description: 'Commercial clients, companies, and business accounts.',
  },
  {
    id: 'personal',
    label: 'Saving Interest',
    description: 'Individual customers and personal banking accounts.',
  },
]

const initialForm = {
  currentOcrRate: '',
  currentBankRate: '',
  targetBankRate: '',
  customerNumber: '',
  averageBalance: '',
}

function App() {
  const [selectedAudience, setSelectedAudience] = useState('')
  const [form, setForm] = useState(initialForm)
  const [adviceText, setAdviceText] = useState('Choose an audience and fill in the details to generate advice.')
  const [submitted, setSubmitted] = useState(false)

  const summary = useMemo(() => {
    const ocr = Number(form.currentOcrRate || 0)
    const bank = Number(form.currentBankRate || 0)
    const target = Number(form.targetBankRate || 0)
    const customers = Number(form.customerNumber || 0)
    const balance = Number(form.averageBalance || 0)

    return {
      audience: selectedAudience || 'not chosen yet',
      rateGap: (target - bank).toFixed(2),
      portfolioValue: (customers * balance).toLocaleString(),
      ocr,
    }
  }, [form, selectedAudience])

  const handleSelectAudience = (audience) => {
    setSelectedAudience(audience)
    setSubmitted(false)
    setAdviceText('Choose an audience and fill in the details to generate advice.')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handlePredict = (event) => {
    event.preventDefault()

    const audienceLabel = selectedAudience === 'business' ? 'business' : 'personal'
    const bankRate = Number(form.currentBankRate || 0)
    const targetRate = Number(form.targetBankRate || 0)
    const ocrRate = Number(form.currentOcrRate || 0)
    const customerCount = Number(form.customerNumber || 0)
    const averageBalance = Number(form.averageBalance || 0)
    const gap = targetRate - bankRate
    const portfolioValue = customerCount * averageBalance

    setAdviceText(
      `Here is the advice for now: for ${audienceLabel} customers, review the OCR rate at ${ocrRate.toFixed(2)}%, keep the bank rate around ${bankRate.toFixed(2)}%, and target ${targetRate.toFixed(2)}%. With ${customerCount} customers and an average balance of ${averageBalance.toLocaleString()}, the current gap is ${gap.toFixed(2)}% and the portfolio value is about ${portfolioValue.toLocaleString()}.`
    )
    setSubmitted(true)
  }

  const handleDownloadPdf = () => {
    const pdf = new jsPDF()

    pdf.setFillColor(0, 80, 149)
    pdf.rect(0, 0, 210, 24, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.text('OCR Future Rate Advice', 14, 15)

    pdf.setTextColor(20, 35, 55)
    pdf.setFontSize(12)
    pdf.text(`Audience: ${selectedAudience || 'not selected'}`, 14, 40)
    pdf.text(`Current OCR Rate: ${form.currentOcrRate || '-'}`, 14, 50)
    pdf.text(`Current Bank Rate: ${form.currentBankRate || '-'}`, 14, 60)
    pdf.text(`Target Bank Rate: ${form.targetBankRate || '-'}`, 14, 70)
    pdf.text(`Customer Number: ${form.customerNumber || '-'}`, 14, 80)
    pdf.text(`Average Balance: ${form.averageBalance || '-'}`, 14, 90)

    const lines = pdf.splitTextToSize(adviceText, 180)
    pdf.text('Advice:', 14, 105)
    pdf.text(lines, 14, 115)

    pdf.save('ocr-advice.pdf')
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">BNZ OCR forecast</p>
          <h1>Predict OCR rate</h1>
          <p className="intro">
            Start on the left, then use the chat bubble on the right to enter the OCR, bank rate,
            target rate, customer number, and average balance.
          </p>
        </div>

        <div className="workspace">
          <aside className="audience-column">
            {audienceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`cube-card ${selectedAudience === option.id ? 'selected' : ''}`}
                onClick={() => handleSelectAudience(option.id)}
              >
                <span className="cube-label">{option.label}</span>
                <span className="cube-description">{option.description}</span>
              </button>
            ))}
          </aside>

          <section className="chat-column">
            <div className="chat-bubble">
              <div className="chat-header">
                <span className="chat-dot" />
                <strong>OCR assistant</strong>
                <span className="chat-status">
                  {selectedAudience ? `Audience: ${selectedAudience}` : 'Pick an audience to begin'}
                </span>
              </div>

              {!selectedAudience ? (
                <p className="chat-message">
                  Select load interest or saving interest on the left, and I will ask for the values here.
                </p>
              ) : (
                <form className="input-form" onSubmit={handlePredict}>
                  <label>
                    <span>Current OCR rate</span>
                    <input
                      type="number"
                      step="0.01"
                      name="currentOcrRate"
                      value={form.currentOcrRate}
                      onChange={handleChange}
                      placeholder="5.50"
                      required
                    />
                  </label>

                  <label>
                    <span>Current bank rate</span>
                    <input
                      type="number"
                      step="0.01"
                      name="currentBankRate"
                      value={form.currentBankRate}
                      onChange={handleChange}
                      placeholder="4.75"
                      required
                    />
                  </label>

                  <label>
                    <span>Target bank rate</span>
                    <input
                      type="number"
                      step="0.01"
                      name="targetBankRate"
                      value={form.targetBankRate}
                      onChange={handleChange}
                      placeholder="6.00"
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
                      required
                    />
                  </label>

                  <label>
                    <span>Average balance</span>
                    <input
                      type="number"
                      step="0.01"
                      name="averageBalance"
                      value={form.averageBalance}
                      onChange={handleChange}
                      placeholder="15000"
                      required
                    />
                  </label>

                  <button type="submit" className="primary-button">
                    Predict future OCR rate
                  </button>
                </form>
              )}

              <div className="advice-card">
                <p className="advice-label">Advice</p>
                <p className="advice-text">{adviceText}</p>

                {submitted && (
                  <div className="advice-meta">
                    <span>OCR: {summary.ocr.toFixed(2)}%</span>
                    <span>Gap to target: {summary.rateGap}%</span>
                    <span>Portfolio: {summary.portfolioValue}</span>
                  </div>
                )}

                <div className="button-row">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleDownloadPdf}
                    disabled={!submitted}
                  >
                    Download advice as PDF
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const audienceOptions = [
  {
    id: 'Loan interest rate simulator',
    label: 'Loan Interest',
    description: 'Calculate the best interest rates range for loan interest.',
  },
  {
    id: 'Saving interest rate simulator',
    label: 'Saving Interest',
    description: 'Calculate the best interest rates range for saving interest.',
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
    setAdviceText('Choose a model and fill in the details to generate advice.')
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

    const audienceLabel = selectedAudience === 'Loan interest rate simulator' ? 'loan' : 'saving'
    const bankRate = Number(form.currentBankRate || 0)
    const targetRate = Number(form.targetBankRate || 0)
    const ocrRate = Number(form.currentOcrRate || 0)
    const customerCount = Number(form.customerNumber || 0)
    const averageBalance = Number(form.averageBalance || 0)
    const gap = targetRate - bankRate
    const portfolioValue = customerCount * averageBalance

    setAdviceText(
      `Here is the advice for now: for ${audienceLabel}, review the OCR rate at ${ocrRate.toFixed(2)}%, keep the bank rate around ${bankRate.toFixed(2)}%, and target ${targetRate.toFixed(2)}%. With ${customerCount} customers and an average balance of ${averageBalance.toLocaleString()}, the current gap is ${gap.toFixed(2)}% and the portfolio value is about ${portfolioValue.toLocaleString()}.`
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
                  {selectedAudience ? `Model: ${selectedAudience}` : 'Pick a model to begin'}
                </span>
              </div>

              {!selectedAudience ? (
                <p className="chat-message">
                  Select a model on the left, and I will ask for the values here.
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

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login/>}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard/>}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
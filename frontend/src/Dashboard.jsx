import { useMemo, useState } from 'react'
import { AudienceSelector } from './components/AudienceSelector.jsx'
import { AdvicePanel } from './components/AdvicePanel.jsx'
import { OCRForm } from './components/OCRForm.jsx'
import './App.css'

function Dashboard() {
  const [audience, setAudience] = useState('')
  const [scenario, setScenario] = useState(null)

  const placeholderAdvice = useMemo(() => {
    if (!scenario) {
      return {
        title: 'Advice preview',
        description: 'Your future AI advice will appear here after the form is submitted.',
        bullets: [
          'Choose business or personal first.',
          'Enter the OCR and bank rate values.',
          'Connect the AI later to replace this placeholder.',
        ],
      }
    }

    return {
      title: 'Okay, here is the advice for now',
      description: `This is a placeholder result for a ${scenario.audience} customer.`,
      bullets: [
        `Current OCR rate: ${scenario.currentOCRRate}%`,
        `Current bank rate: ${scenario.currentBankRate}%`,
        `Target bank rate: ${scenario.targetBankRate}%`,
        `Customer number: ${scenario.customerNumber}`,
        `Average balance: ${scenario.averageBalance}`,
      ],
    }
  }, [scenario])

  const handleAudienceSelect = (nextAudience) => {
    setAudience(nextAudience)
    setScenario(null)
  }

  const handleReset = () => {
    setAudience('')
    setScenario(null)
  }

  const handleScenarioSubmit = (formValues) => {
    setScenario({
      audience,
      ...formValues,
    })
  }

  return (
    <main className="app-shell">
      <header className="hero-banner">
        <p className="eyebrow">OCR forecast assistant</p>
        <h1>Plan the right rate strategy</h1>
        <p className="hero-copy">
          Pick whether this is for business or personal first, then enter the current OCR and
          banking inputs. This is the frontend skeleton only for now.
        </p>
      </header>

      {!audience ? (
        <AudienceSelector onSelect={handleAudienceSelect} />
      ) : (
        <section className="workspace">
          <div className="workspace-header">
            <div>
              <p className="eyebrow">Selected audience</p>
              <h2>{audience === 'business' ? 'Business' : 'Personal'}</h2>
            </div>

            <button type="button" className="secondary-button" onClick={handleReset}>
              Change audience
            </button>
          </div>

          <div className="workspace-grid">
            <OCRForm audience={audience} onSubmit={handleScenarioSubmit} />
            <AdvicePanel audience={audience} advice={placeholderAdvice} />
          </div>
        </section>
      )}
    </main>
  )
}

export default Dashboard

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AudienceSelector } from './components/AudienceSelector.jsx';
import { AdvicePanel } from './components/AdvicePanel.jsx';
import { OCRForm } from './components/OCRForm.jsx';
import './App.css';
import { getCurrentUser, logoutUser } from "./utils/Auth.js";

function Dashboard() {
  const [audience, setAudience] = useState('')
  const [scenario, setScenario] = useState(null)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const user = getCurrentUser();

  const placeholderAdvice = useMemo(() => {
    if (!scenario) {
      return {
        title: 'Advice preview',
        description: 'Your future AI advice will appear here after the form is submitted.',
        bullets: [
          'Choose Savings or Borrowing first.',
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

        <div className="top-bar">

          <div>

            <p className="eyebrow">
              OCR forecast assistant
            </p>

          </div>

          <div className="profile-container">

            <button

              className="profile-button"
              onClick={() => setShowMenu(!showMenu)}
            >

              👤 {user?.username} ▼
            </button>

            {

              showMenu &&

              <div className="profile-menu">

                <button
                  onClick={() => {
                    navigate("/profile")
                  }}>

                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/settings")
                  }}
                >
                  Settings
                </button>

                <hr />

                <button
                  onClick={() => {
                    localStorage.removeItem("loggedIn")
                    navigate("/")
                  }}

                >
                  Logout

                </button>

              </div>

            }

          </div>

        </div>

        <h1>Plan the right rate strategy</h1>
        <p className="hero-copy">
          Explore how different OCR rates could affect your banking options.
        </p>
      </header>

      {!audience ? (
        <AudienceSelector onSelect={handleAudienceSelect} />
      ) : (
        <section className="workspace">
          <div className="workspace-header">
            <div>
              <p className="eyebrow">Selected audience</p>
              <h2>{audience === 'savings' ? 'Savings' : 'Borrowing'}</h2>
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

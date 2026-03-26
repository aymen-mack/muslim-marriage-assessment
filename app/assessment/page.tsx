'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, PILLARS } from '@/lib/questions'

interface FormData {
  firstName: string
  age: string
  location: string
  email: string
  countryCode: string
  phone: string
  answers: Record<number, number>
}

const COUNTRY_CODES = [
  { code: '+1', country: '🇺🇸 US/CA' },
  { code: '+44', country: '🇬🇧 UK' },
  { code: '+61', country: '🇦🇺 AU' },
  { code: '+971', country: '🇦🇪 UAE' },
  { code: '+966', country: '🇸🇦 SA' },
  { code: '+974', country: '🇶🇦 QA' },
  { code: '+965', country: '🇰🇼 KW' },
  { code: '+973', country: '🇧🇭 BH' },
  { code: '+968', country: '🇴🇲 OM' },
  { code: '+20', country: '🇪🇬 EG' },
  { code: '+212', country: '🇲🇦 MA' },
  { code: '+213', country: '🇩🇿 DZ' },
  { code: '+216', country: '🇹🇳 TN' },
  { code: '+249', country: '🇸🇩 SD' },
  { code: '+92', country: '🇵🇰 PK' },
  { code: '+880', country: '🇧🇩 BD' },
  { code: '+62', country: '🇮🇩 ID' },
  { code: '+60', country: '🇲🇾 MY' },
  { code: '+90', country: '🇹🇷 TR' },
  { code: '+98', country: '🇮🇷 IR' },
  { code: '+33', country: '🇫🇷 FR' },
  { code: '+49', country: '🇩🇪 DE' },
  { code: '+31', country: '🇳🇱 NL' },
  { code: '+32', country: '🇧🇪 BE' },
  { code: '+46', country: '🇸🇪 SE' },
  { code: '+47', country: '🇳🇴 NO' },
  { code: '+45', country: '🇩🇰 DK' },
  { code: '+27', country: '🇿🇦 ZA' },
  { code: '+234', country: '🇳🇬 NG' },
  { code: '+254', country: '🇰🇪 KE' },
]

const QUESTIONS_PER_PILLAR = 6

export default function AssessmentPage() {
  const router = useRouter()
  const [step, setStep] = useState<'intro' | 'questions' | 'submitting'>('intro')
  const [currentPillar, setCurrentPillar] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    age: '',
    location: '',
    email: '',
    countryCode: '+1',
    phone: '',
    answers: {},
  })
  const [error, setError] = useState('')

  const pillarQuestions = QUESTIONS.filter(q => q.pillarIndex === currentPillar)
  const question = pillarQuestions[currentQuestion]

  const totalQuestions = QUESTIONS.length
  const answeredCount = Object.keys(formData.answers).length
  const progress = step === 'intro' ? 0 : Math.round((answeredCount / totalQuestions) * 100)

  const totalPillarSteps = PILLARS.length
  const globalQuestionIndex = currentPillar * QUESTIONS_PER_PILLAR + currentQuestion

  function handleIntroSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.age) {
      setError('Please fill in all fields.')
      return
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    setStep('questions')
  }

  function handleAnswer(value: number) {
    const newAnswers = { ...formData.answers, [question.id]: value }
    setFormData(prev => ({ ...prev, answers: newAnswers }))

    const isLastInPillar = currentQuestion === pillarQuestions.length - 1
    const isLastPillar = currentPillar === PILLARS.length - 1

    if (isLastInPillar && isLastPillar) {
      handleSubmit(newAnswers)
    } else if (isLastInPillar) {
      setCurrentPillar(p => p + 1)
      setCurrentQuestion(0)
    } else {
      setCurrentQuestion(q => q + 1)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(q => q - 1)
    } else if (currentPillar > 0) {
      setCurrentPillar(p => p - 1)
      setCurrentQuestion(QUESTIONS_PER_PILLAR - 1)
    } else {
      setStep('intro')
    }
  }

  async function handleSubmit(answers: Record<number, number>) {
    setStep('submitting')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, answers }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || `Server error ${res.status}`)
      }

      sessionStorage.setItem('assessmentResult', JSON.stringify(data))
      router.push('/results')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(`Error: ${message}`)
      setStep('questions')
    }
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center geometric-bg px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Analyzing your results...</h2>
          <p className="text-white/50">
            We&apos;re preparing your personalized report. This takes about 15 seconds.
          </p>
        </div>
      </div>
    )
  }

  if (step === 'intro') {
    return (
      <div className="min-h-screen geometric-bg flex flex-col">
        <nav className="px-6 py-5 max-w-2xl mx-auto w-full">
          <a href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
            ← Back
          </a>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">
                  30 Questions · ~5 Minutes
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-3">Start Your Assessment</h1>
              <p className="text-white/50 text-sm">
                Your results will be shown instantly and sent to your inbox.
              </p>
            </div>

            <form onSubmit={handleIntroSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                    placeholder="Ahmad"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                    placeholder="27"
                    min="18"
                    max="50"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">City / Country</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                  placeholder="London, UK"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
                <p className="text-white/30 text-xs mt-1.5">Your report will be sent here. No spam.</p>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Phone Number <span className="text-white/30">(optional)</span></label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={e => setFormData(p => ({ ...p, countryCode: e.target.value }))}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                  >
                    {COUNTRY_CODES.map(({ code, country }) => (
                      <option key={code} value={code} className="bg-charcoal-900 text-white">
                        {code} {country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="7911 123456"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-100 mt-2"
              >
                Begin Assessment →
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Questions step
  return (
    <div className="min-h-screen geometric-bg flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-white/5">
        <div
          className="h-full bg-gold-500 progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="px-6 py-4 max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ← Back
        </button>
        <div className="text-white/40 text-sm">
          {globalQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>

      {/* Pillar indicator */}
      <div className="px-6 max-w-2xl mx-auto w-full">
        <div className="flex gap-1.5 mb-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.key}
              className={`h-1 flex-1 rounded-full transition-all ${
                i < currentPillar
                  ? 'bg-gold-500'
                  : i === currentPillar
                  ? 'bg-gold-500/60'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <p className="text-gold-400 text-xs font-medium tracking-widest uppercase mb-1">
          Pillar {currentPillar + 1} of {totalPillarSteps} — {PILLARS[currentPillar].name}
        </p>
        <p className="text-white/30 text-xs mb-8">{PILLARS[currentPillar].description}</p>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start px-6 max-w-2xl mx-auto w-full">
        <div className="w-full fade-in" key={question.id}>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-8">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left card card-hover p-4 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-gold-400 flex-shrink-0 transition-colors" />
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-12" />
    </div>
  )
}

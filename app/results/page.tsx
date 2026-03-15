'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PILLARS } from '@/lib/questions'

interface PillarScore {
  key: string
  name: string
  description: string
  score: number
  max: number
  percentage: number
}

interface ResultData {
  firstName: string
  totalScore: number
  maxScore: number
  percentage: number
  tier: string
  tierLabel: string
  tierDescription: string
  pillarScores: PillarScore[]
  analysis: string
  emailSent: boolean
}

const TIER_COLORS: Record<string, string> = {
  alpha: 'from-gold-400 to-gold-300',
  builder: 'from-slate-300 to-white',
  developing: 'from-amber-500 to-amber-400',
  foundation: 'from-stone-400 to-stone-300',
}

const PILLAR_ICONS: Record<string, string> = {
  deen: '☪️',
  provision: '💼',
  character: '🧠',
  values: '⚖️',
  readiness: '🎯',
}

function PillarBar({ pillar, delay }: { pillar: PillarScore; delay: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pillar.percentage), delay)
    return () => clearTimeout(timer)
  }, [pillar.percentage, delay])

  const color =
    pillar.percentage >= 75
      ? 'bg-gold-500'
      : pillar.percentage >= 50
      ? 'bg-amber-500'
      : 'bg-red-500/70'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{PILLAR_ICONS[pillar.key]}</span>
          <span className="text-sm font-medium text-white">{pillar.name}</span>
          <span className="text-xs text-white/30">{pillar.description}</span>
        </div>
        <span className="text-sm font-semibold text-white/70">
          {pillar.score}/{pillar.max}
        </span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function parseAnalysis(text: string) {
  const sections: { heading: string; content: string }[] = []
  const lines = text.split('\n')
  let currentHeading = ''
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, content: currentContent.join('\n').trim() })
      }
      currentHeading = line.replace('## ', '')
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }
  if (currentHeading) {
    sections.push({ heading: currentHeading, content: currentContent.join('\n').trim() })
  }
  return sections
}

export default function ResultsPage() {
  const [data, setData] = useState<ResultData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('assessmentResult')
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center geometric-bg">
        <div className="text-center">
          <p className="text-white/50 mb-4">No results found.</p>
          <Link href="/assessment" className="text-gold-400 hover:text-gold-300">
            Take the assessment →
          </Link>
        </div>
      </div>
    )
  }

  const sections = parseAnalysis(data.analysis)
  const tierColor = TIER_COLORS[data.tier] || TIER_COLORS.builder

  return (
    <div className="min-h-screen geometric-bg">
      {/* Nav */}
      <nav className="px-6 py-5 max-w-3xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
          ← Home
        </Link>
        {data.emailSent && (
          <span className="text-xs text-white/30">📧 Report sent to your inbox</span>
        )}
      </nav>

      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Score Hero */}
        <div className="text-center py-12 fade-in">
          <p className="text-white/40 text-sm mb-2">
            {data.firstName}&apos;s Marriage Readiness Report
          </p>
          <div className={`text-8xl font-black bg-gradient-to-r ${tierColor} bg-clip-text text-transparent mb-2`}>
            {data.totalScore}
          </div>
          <p className="text-white/30 text-lg mb-4">out of {data.maxScore}</p>
          <div className={`inline-block bg-gradient-to-r ${tierColor} bg-clip-text text-transparent text-2xl font-bold mb-3`}>
            {data.tierLabel}
          </div>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {data.tierDescription}
          </p>
        </div>

        {/* Pillar Scores */}
        <div className="card p-6 mb-6 fade-in">
          <h2 className="text-lg font-bold mb-5">Your Pillar Breakdown</h2>
          <div className="space-y-5">
            {data.pillarScores.map((pillar, i) => (
              <PillarBar key={pillar.key} pillar={pillar} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* Analysis Sections */}
        {sections.map((section, i) => (
          <div key={i} className="card p-6 mb-4 fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-0.5 bg-gold-500" />
              <h2 className="text-lg font-bold text-gold-400">{section.heading}</h2>
            </div>
            <div className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}

        {/* Retake / Share */}
        <div className="text-center pt-6">
          <p className="text-white/30 text-sm mb-4">
            {data.emailSent
              ? 'Your full report has been sent to your inbox.'
              : 'Take a screenshot to save your results.'}
          </p>
          <Link
            href="/assessment"
            className="inline-block border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-gold-300 font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            Retake the Assessment
          </Link>
        </div>
      </div>
    </div>
  )
}

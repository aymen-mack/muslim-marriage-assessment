import { QUESTIONS, PILLARS } from './questions'

export interface PillarScore {
  key: string
  name: string
  description: string
  score: number
  max: number
  percentage: number
}

export interface AssessmentResult {
  totalScore: number
  maxScore: number
  percentage: number
  tier: 'alpha' | 'builder' | 'developing' | 'foundation'
  tierLabel: string
  tierDescription: string
  pillarScores: PillarScore[]
}

export function calculateScores(answers: Record<number, number>): AssessmentResult {
  const pillarScores: PillarScore[] = PILLARS.map((pillar, index) => {
    const pillarQuestions = QUESTIONS.filter(q => q.pillarIndex === index)
    const score = pillarQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 1), 0)
    const max = pillarQuestions.length * 4
    return {
      key: pillar.key,
      name: pillar.name,
      description: pillar.description,
      score,
      max,
      percentage: Math.round((score / max) * 100),
    }
  })

  const totalScore = pillarScores.reduce((sum, p) => sum + p.score, 0)
  const maxScore = pillarScores.reduce((sum, p) => sum + p.max, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)

  let tier: AssessmentResult['tier']
  let tierLabel: string
  let tierDescription: string

  if (totalScore >= 100) {
    tier = 'alpha'
    tierLabel = 'The Established Man'
    tierDescription = 'You are genuinely ready. Your deen, provision, and character are aligned. The woman you\'re looking for is looking for someone like you.'
  } else if (totalScore >= 80) {
    tier = 'builder'
    tierLabel = 'The Rising Contender'
    tierDescription = 'You have strong foundations and real potential. A few targeted improvements will close the gap between where you are and the man she\'s waiting for.'
  } else if (totalScore >= 60) {
    tier = 'developing'
    tierLabel = 'The Work in Progress'
    tierDescription = 'You have the right intentions but your foundations need strengthening. The good news: the gaps are fixable. This report tells you exactly where to focus.'
  } else {
    tier = 'foundation'
    tierLabel = 'Start Here'
    tierDescription = 'You\'re being honest with yourself — and that\'s actually the first step. Before pursuing marriage, there is foundational work to do. This report is your roadmap.'
  }

  return { totalScore, maxScore, percentage, tier, tierLabel, tierDescription, pillarScores }
}

export function formatAnswersForPrompt(answers: Record<number, number>): string {
  return QUESTIONS.map(q => {
    const selectedOption = q.options.find(o => o.value === answers[q.id])
    return `[${q.pillar}] ${q.text}\nAnswer: ${selectedOption?.label ?? 'Not answered'} (${answers[q.id] ?? 1}/4)`
  }).join('\n\n')
}

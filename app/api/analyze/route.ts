import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { calculateScores, formatAnswersForPrompt } from '@/lib/scoring'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, age, location, email, answers } = body

    if (!firstName || !email || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Calculate scores
    const result = calculateScores(answers)
    const formattedAnswers = formatAnswersForPrompt(answers)

    // Build the Claude prompt
    const prompt = `You are an Islamic marriage readiness coach giving an honest, direct, and encouraging report to a Muslim man who just completed a marriage readiness assessment.

PROFILE:
- Name: ${firstName}
- Age: ${age}
- Location: ${location}

SCORES:
- Deen (Faith & Practice): ${result.pillarScores[0].score}/${result.pillarScores[0].max} (${result.pillarScores[0].percentage}%)
- Provision (Stability & Leadership): ${result.pillarScores[1].score}/${result.pillarScores[1].max} (${result.pillarScores[1].percentage}%)
- Character (Maturity & Accountability): ${result.pillarScores[2].score}/${result.pillarScores[2].max} (${result.pillarScores[2].percentage}%)
- Values (Lifestyle & Alignment): ${result.pillarScores[3].score}/${result.pillarScores[3].max} (${result.pillarScores[3].percentage}%)
- Readiness (Intentionality & Preparation): ${result.pillarScores[4].score}/${result.pillarScores[4].max} (${result.pillarScores[4].percentage}%)
- Total: ${result.totalScore}/${result.maxScore}
- Tier: ${result.tierLabel}

ALL ANSWERS:
${formattedAnswers}

Write a personalized marriage readiness report using EXACTLY this structure. Use ## for each section heading:

## Your Archetype
Write 2–3 sentences giving ${firstName} a compelling archetype name based on his score pattern (not the tier label — something creative and specific to his actual answers). Explain what this archetype means.

## The Woman You're Aligned With Right Now
Be honest and direct. Based on his actual scores, describe the type of Muslim woman he is currently positioned to attract and keep. Don't soften this — if his scores are low, be clear that a high-value traditional woman would not be impressed by where he stands right now. If his scores are high, affirm what he brings. Be specific about what she would look for and whether he meets it.

## Your Strengths
Identify 2–3 genuine strengths based on his highest-scoring areas and specific answers. Be specific — reference what he actually said, not just the pillar name.

## Where You Need to Focus
Identify his top 2–3 weakest areas based on his actual answers. Be specific and direct. For each area, give one concrete action he can take this week.

## Your 90-Day Roadmap
Write a practical, milestone-based 90-day plan organized by month. Be specific — reference his actual pillar weaknesses. Include Islamic practices as part of the roadmap where relevant.

## Where to Find Her
Give ${firstName} practical, specific advice on where and how to meet high-value traditional Muslim women. Include: matrimonial apps worth using, types of Islamic events to attend, the wali process, and how to approach this with the right intention. Tailor this to his tier — a man at tier ${result.tierLabel} should be focused on X before actively searching.

Tone: Like a trusted older brother who is direct, honest, and wants the best for him. Islamic but not preachy. Encouraging but not coddling. Use his name occasionally. No filler. No fluff.`

    // Call Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const analysis = message.content[0].type === 'text' ? message.content[0].text : ''

    // Send email
    let emailSent = false
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'results@muslimmarriageassessment.com'

    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `${firstName}, your Muslim Marriage Readiness Report is here`,
        html: buildEmailHtml(firstName, result, analysis),
      })
      emailSent = true
    } catch (emailError) {
      console.error('Email failed:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({
      firstName,
      totalScore: result.totalScore,
      maxScore: result.maxScore,
      percentage: result.percentage,
      tier: result.tier,
      tierLabel: result.tierLabel,
      tierDescription: result.tierDescription,
      pillarScores: result.pillarScores,
      analysis,
      emailSent,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

function buildEmailHtml(
  firstName: string,
  result: ReturnType<typeof calculateScores>,
  analysis: string
): string {
  const tierColor = {
    alpha: '#C9A84C',
    builder: '#94A3B8',
    developing: '#F59E0B',
    foundation: '#A8A29E',
  }[result.tier] || '#C9A84C'

  const pillarRows = result.pillarScores
    .map(
      p => `
      <tr>
        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${p.name}</td>
        <td style="padding: 8px 0; text-align: right; color: #9CA3AF; font-size: 14px;">${p.score}/${p.max}</td>
        <td style="padding: 8px 16px;">
          <div style="background: #1F2937; border-radius: 4px; height: 6px; width: 120px;">
            <div style="background: ${p.percentage >= 75 ? '#C9A84C' : p.percentage >= 50 ? '#F59E0B' : '#EF4444'}; border-radius: 4px; height: 6px; width: ${p.percentage * 1.2}px;"></div>
          </div>
        </td>
      </tr>
    `
    )
    .join('')

  const analysisHtml = analysis
    .replace(/## (.+)/g, '<h2 style="color: #C9A84C; font-size: 18px; margin: 28px 0 12px;">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="background: #0D1117; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <p style="color: #6B7280; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
        Muslim Marriage Readiness Assessment
      </p>
      <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin: 0;">
        ${firstName}'s Report
      </h1>
    </div>

    <!-- Score Card -->
    <div style="background: #1A1F2E; border: 1px solid rgba(201,168,76,0.2); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px;">
      <div style="font-size: 72px; font-weight: 900; color: ${tierColor}; line-height: 1;">
        ${result.totalScore}
      </div>
      <div style="color: #6B7280; margin-bottom: 12px;">out of ${result.maxScore}</div>
      <div style="color: ${tierColor}; font-size: 20px; font-weight: 700; margin-bottom: 8px;">
        ${result.tierLabel}
      </div>
      <div style="color: #9CA3AF; font-size: 14px; max-width: 400px; margin: 0 auto; line-height: 1.6;">
        ${result.tierDescription}
      </div>
    </div>

    <!-- Pillar Scores -->
    <div style="background: #1A1F2E; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <h2 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">Pillar Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${pillarRows}
      </table>
    </div>

    <!-- Analysis -->
    <div style="background: #1A1F2E; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; margin-bottom: 32px; font-size: 15px; line-height: 1.7; color: #D1D5DB;">
      ${analysisHtml}
    </div>

    <!-- Footer -->
    <div style="text-align: center; color: #374151; font-size: 13px; border-top: 1px solid #1F2937; padding-top: 24px;">
      <p>May Allah put barakah in your path.</p>
      <p style="margin-top: 8px;">Muslim Marriage Assessment</p>
    </div>
  </div>
</body>
</html>
`
}

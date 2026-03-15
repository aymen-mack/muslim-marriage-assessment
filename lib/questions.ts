export interface Option {
  label: string
  value: number
}

export interface Question {
  id: number
  pillar: string
  pillarIndex: number
  text: string
  options: Option[]
}

export const PILLARS = [
  { key: 'deen', name: 'Deen', description: 'Faith & Practice' },
  { key: 'provision', name: 'Provision', description: 'Stability & Leadership' },
  { key: 'character', name: 'Character', description: 'Maturity & Accountability' },
  { key: 'values', name: 'Values', description: 'Lifestyle & Alignment' },
  { key: 'readiness', name: 'Readiness', description: 'Intentionality & Preparation' },
]

export const QUESTIONS: Question[] = [
  // ── DEEN ──────────────────────────────────────────────────────────────────
  {
    id: 1, pillar: 'Deen', pillarIndex: 0,
    text: 'How consistently do you pray your 5 daily salah?',
    options: [
      { label: 'Always — I never miss them', value: 4 },
      { label: 'Mostly — I occasionally miss one', value: 3 },
      { label: 'Inconsistently — some days yes, some days no', value: 2 },
      { label: 'Rarely', value: 1 },
    ],
  },
  {
    id: 2, pillar: 'Deen', pillarIndex: 0,
    text: 'How would you describe your relationship with the Quran?',
    options: [
      { label: 'Daily recitation and reflection', value: 4 },
      { label: 'A few times a week', value: 3 },
      { label: 'Mainly during Ramadan', value: 2 },
      { label: 'Rarely engage with it', value: 1 },
    ],
  },
  {
    id: 3, pillar: 'Deen', pillarIndex: 0,
    text: 'Do you attend Jumu\'ah (Friday prayer) regularly?',
    options: [
      { label: 'Yes, almost always', value: 4 },
      { label: 'Most weeks', value: 3 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 1 },
    ],
  },
  {
    id: 4, pillar: 'Deen', pillarIndex: 0,
    text: 'How important is it that your future wife maintains her Islamic obligations?',
    options: [
      { label: 'Non-negotiable — it\'s the foundation', value: 4 },
      { label: 'Very important', value: 3 },
      { label: 'Somewhat important', value: 2 },
      { label: 'Not a priority', value: 1 },
    ],
  },
  {
    id: 5, pillar: 'Deen', pillarIndex: 0,
    text: 'How would you describe your Islamic knowledge?',
    options: [
      { label: 'Actively studying — I attend circles or halaqas', value: 4 },
      { label: 'Know the basics and actively learning more', value: 3 },
      { label: 'Know the basics but not growing', value: 2 },
      { label: 'Limited — I haven\'t prioritized it', value: 1 },
    ],
  },
  {
    id: 6, pillar: 'Deen', pillarIndex: 0,
    text: 'Do you have a sheikh, mentor, or Islamic community you\'re accountable to?',
    options: [
      { label: 'Yes, actively connected', value: 4 },
      { label: 'Loosely connected to a community', value: 3 },
      { label: 'No, but I\'m looking', value: 2 },
      { label: 'No', value: 1 },
    ],
  },

  // ── PROVISION ─────────────────────────────────────────────────────────────
  {
    id: 7, pillar: 'Provision', pillarIndex: 1,
    text: 'What is your current employment and income situation?',
    options: [
      { label: 'Stable career — I can support a family today', value: 4 },
      { label: 'Employed and building toward it', value: 3 },
      { label: 'In transition but actively working on it', value: 2 },
      { label: 'Unstable or currently unemployed', value: 1 },
    ],
  },
  {
    id: 8, pillar: 'Provision', pillarIndex: 1,
    text: 'Do you have a clear financial plan — savings, manageable debt, a budget?',
    options: [
      { label: 'Yes — finances are organized and intentional', value: 4 },
      { label: 'Working on it, some structure in place', value: 3 },
      { label: 'Not really, but I\'m aware I need to', value: 2 },
      { label: 'No financial plan', value: 1 },
    ],
  },
  {
    id: 9, pillar: 'Provision', pillarIndex: 1,
    text: 'How close are you to being ready to establish your own household?',
    options: [
      { label: 'Ready now or already established', value: 4 },
      { label: 'Within the next year', value: 3 },
      { label: '1–3 years away', value: 2 },
      { label: 'No clear timeline', value: 1 },
    ],
  },
  {
    id: 10, pillar: 'Provision', pillarIndex: 1,
    text: 'How do you view your role as a husband financially?',
    options: [
      { label: 'The primary provider — it\'s an honor and obligation', value: 4 },
      { label: 'Primary provider but open to partnership', value: 3 },
      { label: 'Equal financial partnership', value: 2 },
      { label: 'I haven\'t thought deeply about this', value: 1 },
    ],
  },
  {
    id: 11, pillar: 'Provision', pillarIndex: 1,
    text: 'Do you have a clear career direction or business vision?',
    options: [
      { label: 'Yes — clear path with goals and milestones', value: 4 },
      { label: 'General direction, still refining it', value: 3 },
      { label: 'Unsure, still exploring', value: 2 },
      { label: 'No clear direction', value: 1 },
    ],
  },
  {
    id: 12, pillar: 'Provision', pillarIndex: 1,
    text: 'Are you free from financial obligations that would burden a new marriage (gambling debt, excessive loans, financial irresponsibility)?',
    options: [
      { label: 'Yes — my finances are clean', value: 4 },
      { label: 'Minor issues I\'m actively resolving', value: 3 },
      { label: 'Some significant obligations I\'m managing', value: 2 },
      { label: 'This is a real problem area for me', value: 1 },
    ],
  },

  // ── CHARACTER ─────────────────────────────────────────────────────────────
  {
    id: 13, pillar: 'Character', pillarIndex: 2,
    text: 'When you make a mistake or hurt someone, how do you typically respond?',
    options: [
      { label: 'Acknowledge it quickly, apologize, and correct it', value: 4 },
      { label: 'Acknowledge it eventually — it takes me some time', value: 3 },
      { label: 'I struggle to apologize but I try', value: 2 },
      { label: 'I tend to deflect or blame others', value: 1 },
    ],
  },
  {
    id: 14, pillar: 'Character', pillarIndex: 2,
    text: 'How do you handle conflict or disagreement?',
    options: [
      { label: 'Stay calm, listen, and seek resolution', value: 4 },
      { label: 'Usually calm, occasionally reactive', value: 3 },
      { label: 'Often reactive — I\'m working on it', value: 2 },
      { label: 'I avoid it completely or it escalates', value: 1 },
    ],
  },
  {
    id: 15, pillar: 'Character', pillarIndex: 2,
    text: 'Do you have a close male friend or mentor you can be fully honest with?',
    options: [
      { label: 'Yes — I have real accountability relationships', value: 4 },
      { label: 'One or two people, loosely', value: 3 },
      { label: 'Not really', value: 2 },
      { label: 'No', value: 1 },
    ],
  },
  {
    id: 16, pillar: 'Character', pillarIndex: 2,
    text: 'How self-aware are you about your flaws and patterns?',
    options: [
      { label: 'Very — I actively identify and work on them', value: 4 },
      { label: 'Somewhat — I know them but don\'t always address them', value: 3 },
      { label: 'Not much — I don\'t reflect often', value: 2 },
      { label: 'I don\'t think I have major flaws', value: 1 },
    ],
  },
  {
    id: 17, pillar: 'Character', pillarIndex: 2,
    text: 'How do you manage stress, pressure, or hardship?',
    options: [
      { label: 'Through dua, sabr, and healthy habits', value: 4 },
      { label: 'Mostly well, with some struggles', value: 3 },
      { label: 'Inconsistently — sometimes poorly', value: 2 },
      { label: 'It usually overwhelms me', value: 1 },
    ],
  },
  {
    id: 18, pillar: 'Character', pillarIndex: 2,
    text: 'Have you invested in your personal growth (therapy, coaching, books, self-study)?',
    options: [
      { label: 'Yes — actively investing in myself', value: 4 },
      { label: 'Some reading and reflection', value: 3 },
      { label: 'Considered it but haven\'t started', value: 2 },
      { label: 'No — I don\'t see the need', value: 1 },
    ],
  },

  // ── VALUES ────────────────────────────────────────────────────────────────
  {
    id: 19, pillar: 'Values', pillarIndex: 3,
    text: 'How would you describe your current lifestyle overall?',
    options: [
      { label: 'Aligned with Islamic values — intentional and clean', value: 4 },
      { label: 'Mostly aligned, with some areas to improve', value: 3 },
      { label: 'Mixed — I\'m actively working on it', value: 2 },
      { label: 'Fairly far from where I want to be', value: 1 },
    ],
  },
  {
    id: 20, pillar: 'Values', pillarIndex: 3,
    text: 'What is your relationship with social media and entertainment?',
    options: [
      { label: 'Minimal, curated, and intentional', value: 4 },
      { label: 'Moderate — mostly beneficial content', value: 3 },
      { label: 'Heavy use, sometimes wasteful', value: 2 },
      { label: 'Very heavy — it consumes a lot of my time', value: 1 },
    ],
  },
  {
    id: 21, pillar: 'Values', pillarIndex: 3,
    text: 'How do you view gender roles in marriage?',
    options: [
      { label: 'Strong belief in complementary roles — qiwamah is an honor', value: 4 },
      { label: 'Mostly traditional with some flexibility', value: 3 },
      { label: 'Prefer equality in most areas', value: 2 },
      { label: 'Fully egalitarian', value: 1 },
    ],
  },
  {
    id: 22, pillar: 'Values', pillarIndex: 3,
    text: 'Do you want your wife to prioritize the home and children over a career?',
    options: [
      { label: 'Yes — that\'s the vision I\'m building toward', value: 4 },
      { label: 'Preferably yes, open to a real conversation', value: 3 },
      { label: 'No strong preference', value: 2 },
      { label: 'I prefer a career-focused partner', value: 1 },
    ],
  },
  {
    id: 23, pillar: 'Values', pillarIndex: 3,
    text: 'What are your intentions around starting a family?',
    options: [
      { label: 'I want children and am actively preparing for that responsibility', value: 4 },
      { label: 'I want children, haven\'t thought deeply about preparation', value: 3 },
      { label: 'Unsure about children', value: 2 },
      { label: 'I don\'t want children', value: 1 },
    ],
  },
  {
    id: 24, pillar: 'Values', pillarIndex: 3,
    text: 'How do you envision the home environment you want to create?',
    options: [
      { label: 'An Islamic home — full of deen, warmth, and intentional structure', value: 4 },
      { label: 'Mainly Islamic values with some flexibility', value: 3 },
      { label: 'Balanced but haven\'t thought much about the details', value: 2 },
      { label: 'No strong vision for this yet', value: 1 },
    ],
  },

  // ── READINESS ─────────────────────────────────────────────────────────────
  {
    id: 25, pillar: 'Readiness', pillarIndex: 4,
    text: 'Why are you looking to get married?',
    options: [
      { label: 'To complete my deen and build a purposeful family', value: 4 },
      { label: 'I\'m ready to settle down and grow with someone', value: 3 },
      { label: 'Feeling pressure — family, age, or loneliness', value: 2 },
      { label: 'Not fully sure', value: 1 },
    ],
  },
  {
    id: 26, pillar: 'Readiness', pillarIndex: 4,
    text: 'Have you had a serious conversation with your family about marriage?',
    options: [
      { label: 'Yes — they\'re involved and supportive', value: 4 },
      { label: 'Mentioned it, not deeply discussed', value: 3 },
      { label: 'No, but I plan to soon', value: 2 },
      { label: 'No, and they\'re not in the picture', value: 1 },
    ],
  },
  {
    id: 27, pillar: 'Readiness', pillarIndex: 4,
    text: 'How soon are you looking to get married?',
    options: [
      { label: 'Within the next 6 months', value: 4 },
      { label: 'Within the year', value: 3 },
      { label: '1–2 years from now', value: 2 },
      { label: 'No clear timeline', value: 1 },
    ],
  },
  {
    id: 28, pillar: 'Readiness', pillarIndex: 4,
    text: 'Are you clear on the type of woman you want to marry?',
    options: [
      { label: 'Very clear — deen, values, character, and lifestyle', value: 4 },
      { label: 'I have a general idea', value: 3 },
      { label: 'Mostly focused on physical or surface-level traits', value: 2 },
      { label: 'Not really', value: 1 },
    ],
  },
  {
    id: 29, pillar: 'Readiness', pillarIndex: 4,
    text: 'Do you understand the Islamic process of approaching a woman\'s family (wali, mahr, etc.)?',
    options: [
      { label: 'Yes — I\'m confident in the process and can do it properly', value: 4 },
      { label: 'I know the process but haven\'t done it yet', value: 3 },
      { label: 'Fuzzy on the details', value: 2 },
      { label: 'I don\'t know how this works', value: 1 },
    ],
  },
  {
    id: 30, pillar: 'Readiness', pillarIndex: 4,
    text: 'On honest self-assessment — how ready are you for marriage today?',
    options: [
      { label: 'Genuinely ready', value: 4 },
      { label: 'Close — a few things left to lock in', value: 3 },
      { label: 'Not quite there yet', value: 2 },
      { label: 'Being honest — not ready', value: 1 },
    ],
  },
]

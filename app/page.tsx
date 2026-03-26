import Link from 'next/link'

const pillars = [
  { icon: '☪️', name: 'Deen', desc: 'How seriously you practice your faith' },
  { icon: '💼', name: 'Provision', desc: 'Your ability to lead and provide' },
  { icon: '🧠', name: 'Character', desc: 'Your emotional maturity and accountability' },
  { icon: '⚖️', name: 'Values', desc: 'Your lifestyle and traditional alignment' },
  { icon: '🎯', name: 'Readiness', desc: 'How intentional and prepared you are' },
]

const tiers = [
  { score: '100–120', label: 'The Established Man', color: 'from-gold-400 to-gold-300' },
  { score: '80–99', label: 'The Rising Contender', color: 'from-slate-300 to-slate-200' },
  { score: '60–79', label: 'The Work in Progress', color: 'from-amber-600 to-amber-500' },
  { score: '0–59', label: 'Start Here', color: 'from-stone-400 to-stone-300' },
]

export default function Home() {
  return (
    <main className="geometric-bg min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="text-gold-400 font-semibold tracking-wide text-sm uppercase">
          FaiyadFit
        </span>
        <Link
          href="/assessment"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          Take the Assessment →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-xs font-medium tracking-widest uppercase">
            Free Assessment · 5 Minutes
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight max-w-3xl mx-auto">
          Before you find <span className="gold-gradient">the right woman,</span>{' '}
          find out if you&apos;re <span className="gold-gradient">the right man.</span>
        </h1>

        <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Most men focus on finding her. This assessment asks a different question.
          Get a full personality and readiness report — scored across 5 pillars —
          sent directly to your inbox.
        </p>

        <Link
          href="/assessment"
          className="inline-block bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-100 shadow-lg shadow-gold-500/20"
        >
          Take the Free Assessment →
        </Link>

        <p className="mt-4 text-white/30 text-sm">
          For Muslim men 21–35 who are serious about marriage
        </p>
      </section>

      {/* What you'll discover */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Your Readiness Score',
              desc: 'A detailed score across 5 core pillars showing exactly where you stand today.',
            },
            {
              title: 'The Woman You\'re Aligned With',
              desc: 'An honest profile of the woman your current self is ready for — not who you imagine.',
            },
            {
              title: 'Your 90-Day Roadmap',
              desc: 'Specific, actionable steps to become the man a high-value Muslim woman is looking for.',
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <div className="w-8 h-0.5 bg-gold-500 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Pillars */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">The 5 Pillars of Assessment</h2>
          <p className="text-white/50">30 questions. Honest scoring. No fluff.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {pillars.map((p) => (
            <div key={p.name} className="card p-5 text-center">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-semibold text-gold-400 mb-1">{p.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Where Will You Land?</h2>
          <p className="text-white/50">Your score determines your tier — and the type of woman you&apos;re ready for.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {tiers.map((t) => (
            <div key={t.label} className="card p-5 flex items-center gap-4">
              <div className={`text-2xl font-bold bg-gradient-to-r ${t.color} bg-clip-text text-transparent min-w-[80px]`}>
                {t.score}
              </div>
              <div>
                <p className="font-semibold text-white">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="card gold-border p-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to see where you stand?
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Takes 5 minutes. Your personalized report will be shown immediately and sent to your inbox.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
          >
            Start the Assessment →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-white/20 text-sm">
        <p>Built for serious Muslim men. May Allah put barakah in your path.</p>
      </footer>
    </main>
  )
}

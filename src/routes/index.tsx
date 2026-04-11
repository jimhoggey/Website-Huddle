import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HuddleLanding,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = el.querySelectorAll('.reveal')
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}

// Logo SVG — wordmark style
function HuddleLogo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg', light?: boolean }) {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' }
  return (
    <span
      className={`font-bold tracking-tight ${sizes[size]} ${light ? 'text-white' : 'text-[#1a1a1a]'}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      Huddle
      <span style={{ color: '#7C3AED' }}>.</span>
    </span>
  )
}

// Feature icon components
function IconRunSheet() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="2" width="22" height="24" rx="3" stroke="#7C3AED" strokeWidth="1.8"/>
      <circle cx="9" cy="10" r="1.5" fill="#7C3AED"/>
      <circle cx="9" cy="15" r="1.5" fill="#7C3AED" opacity="0.6"/>
      <circle cx="9" cy="20" r="1.5" fill="#7C3AED" opacity="0.3"/>
      <path d="M13 10h8M13 15h6M13 20h5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 6h22" stroke="#7C3AED" strokeWidth="1.2" opacity="0.2"/>
    </svg>
  )
}

function IconTeamNotify() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="10" cy="10" r="4" stroke="#7C3AED" strokeWidth="1.8"/>
      <circle cx="19" cy="12" r="3" stroke="#7C3AED" strokeWidth="1.5" opacity="0.5"/>
      <path d="M3 22c0-4 3.5-7 7-7s7 3 7 7" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M22 7v4M24 9h-4" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function IconSafeSpace() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4L4 10v8c0 5 4.5 8.5 10 10 5.5-1.5 10-5 10-10v-8L14 4z" stroke="#7C3AED" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 14.5l3 3 5.5-5.5" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconYourBrand() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="22" rx="5" stroke="#7C3AED" strokeWidth="1.8"/>
      <circle cx="14" cy="12" r="4" stroke="#7C3AED" strokeWidth="1.5" opacity="0.5"/>
      <path d="M8 22c0-3 2.7-5 6-5s6 2 6 5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M3 8h22" stroke="#7C3AED" strokeWidth="1.2" opacity="0.2"/>
      <circle cx="6" cy="5.5" r="1" fill="#7C3AED" opacity="0.4"/>
      <circle cx="9" cy="5.5" r="1" fill="#7C3AED" opacity="0.25"/>
    </svg>
  )
}

function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/huddle-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'early-access', email }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-4">✓</div>
        <p className="text-xl font-semibold text-[#1a1a1a] mb-2">You're on the list.</p>
        <p className="text-[#6b7280]">We'll be in touch before the doors open.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <input type="hidden" name="form-name" value="early-access" />
      {/* Honeypot */}
      <div style={{ display: 'none' }}>
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-5 py-3.5 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a1a] text-base outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 rounded-xl font-semibold text-white text-base transition-all whitespace-nowrap"
          style={{
            background: loading ? '#9b59f7' : '#7C3AED',
            cursor: loading ? 'wait' : 'pointer',
            border: 'none',
          }}
        >
          {loading ? 'Joining…' : 'Get Early Access →'}
        </button>
      </div>
    </form>
  )
}

export default function HuddleLanding() {
  const storyRef = useReveal()
  const featuresRef = useReveal()
  const peakRef = useReveal()
  const trustRef = useReveal()
  const ctaRef = useReveal()

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <HuddleLogo size="md" />
        <a
          href="#early-access"
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ background: '#7C3AED' }}
        >
          Get Early Access
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="animate-fade-in mb-10">
          <span className="font-bold tracking-tight text-[#1a1a1a]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Huddle
            <span style={{ color: '#7C3AED' }}>.</span>
          </span>
        </div>

        <p
          className="animate-rise-in-slow text-[#6b7280] font-light"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', maxWidth: '460px', lineHeight: 1.6 }}
        >
          The app for youth groups — built by a youth leader<br />who gets it.
        </p>

        <div className="animate-rise-in-slow mt-10 flex items-center gap-3 opacity-0" style={{ animationDelay: '1.2s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase"
            style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}>
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
            Coming soon
          </span>
        </div>

        <div className="animate-rise-in-slow mt-14 flex flex-col items-center gap-3" style={{ animationDelay: '1.6s' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#d1d5db]" />
          <span className="text-xs uppercase tracking-widest text-[#9ca3af]">Scroll</span>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────────────── */}
      <section
        ref={storyRef}
        className="py-32 px-6"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-16 font-medium">Every Friday</p>

          <div className="space-y-12">
            {[
              "Every Friday, someone sets up the chairs.",
              "Someone drives across town to pick up the kid who doesn't have a lift.",
              "Someone remembers the kid who looked quiet last week.",
              "Someone carries the whole night in their head.",
              "Not because it's a job.\nBecause it matters.",
            ].map((line, i) => (
              <p
                key={i}
                className={`reveal delay-${(i + 1) * 100} text-[#1a1a1a] font-light`}
                style={{
                  fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'pre-line',
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="reveal delay-600 mt-16 w-12 h-px bg-[#7C3AED] opacity-40" />
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section
        ref={featuresRef}
        className="py-32 px-6"
        style={{ background: '#F5F5F7' }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-4 font-medium text-center">What Huddle does</p>
          <h2 className="reveal delay-100 text-center font-bold text-[#1a1a1a] mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Your entire Friday night,<br />
            <span style={{ color: '#7C3AED' }}>in everyone's pocket.</span>
          </h2>
          <p className="reveal delay-200 text-center text-[#6b7280] font-light mb-20 mx-auto" style={{ maxWidth: '520px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            One app that keeps your team prepared, your youth connected, and your identity front and centre.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <IconRunSheet />,
                title: 'Live Run Sheet',
                quote: 'Everyone knows what\'s happening.',
                body: 'A real-time run sheet on every phone. No more scrambling, no more "what\'s next?" — your whole team moves together, all night long.',
                delay: 'delay-100',
              },
              {
                icon: <IconTeamNotify />,
                title: 'Smart Rostering',
                quote: 'Your team knows before Friday arrives.',
                body: 'Huddle reads your run sheet, notifies every rostered volunteer automatically. They confirm, swap, or message their team — zero follow-ups from you.',
                delay: 'delay-200',
              },
              {
                icon: <IconSafeSpace />,
                title: 'Safe Community',
                quote: 'Connected through the week. Protected always.',
                body: 'A safe space for youth and leaders to stay connected beyond Friday. AI watches over every conversation — flagging concerns so leaders can focus on pouring in, not policing.',
                delay: 'delay-300',
              },
              {
                icon: <IconYourBrand />,
                title: 'Your Brand, Your Vibe',
                quote: 'Huddle disappears. Your community shines.',
                body: 'Upload your logo, drop in your colours, and Huddle rebuilds itself around your identity. No two groups look the same — because no two groups are the same.',
                delay: 'delay-400',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`reveal ${feature.delay} feature-card bg-white rounded-2xl p-8`}
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.08)' }}>
                  {feature.icon}
                </div>
                <p className="text-xs uppercase tracking-widest text-[#7C3AED] font-semibold mb-2">{feature.title}</p>
                <p className="font-semibold text-[#1a1a1a] mb-3" style={{ fontSize: '1.2rem', letterSpacing: '-0.01em' }}>
                  {feature.quote}
                </p>
                <p className="text-[#6b7280] leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL PEAK ─────────────────────────────────────────── */}
      <section
        ref={peakRef}
        className="py-40 px-6 text-center relative overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        {/* Subtle violet radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <p
            className="reveal font-bold text-[#1a1a1a]"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Friday nights{' '}
            <span style={{ color: '#7C3AED' }}>matter.</span>
          </p>
          <p
            className="reveal delay-200 text-[#6b7280] font-light mt-6"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', lineHeight: 1.6 }}
          >
            And so do the people who make them happen.
          </p>
        </div>
      </section>

      {/* ── TRUST ──────────────────────────────────────────────────── */}
      <section
        ref={trustRef}
        className="py-28 px-6"
        style={{ background: '#F5F5F7' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-6 font-medium">Built different</p>
          <p
            className="reveal delay-100 font-semibold text-[#1a1a1a] mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.3 }}
          >
            Built for youth groups, by a youth leader.{' '}
            <span className="text-[#6b7280] font-light">Not by a tech company guessing.</span>
          </p>

          <p className="reveal delay-200 text-[#6b7280] leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
            I've run the nights. I've chased the rosters. I've sat in the car park after youth wondering if I missed something important. Huddle exists because I needed it — and I know you do too.
          </p>

          <p className="reveal delay-300 text-[#6b7280] leading-relaxed mb-12" style={{ fontSize: '1.05rem' }}>
            This isn't a generic platform with a youth ministry skin. It's being built from the ground up around the way real youth groups actually work — the chaos, the beauty, and everything in between.
          </p>

          <div className="reveal delay-400 flex flex-wrap justify-center gap-4">
            {['Built in Australia', 'For churches of all sizes', 'By a youth leader', 'Safety-first design', 'Your brand, not ours'].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#6b7280] bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section
        id="early-access"
        ref={ctaRef}
        className="py-40 px-6 text-center"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-6 font-medium">Early Access</p>
          <h2
            className="reveal delay-100 font-bold text-[#1a1a1a] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Huddle is coming.
          </h2>
          <p
            className="reveal delay-200 text-[#6b7280] font-light mb-10"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', lineHeight: 1.6 }}
          >
            Join the youth leaders shaping what's next.
          </p>

          <div className="reveal delay-300">
            <EarlyAccessForm />
          </div>

          <p className="reveal delay-400 text-[#9ca3af] text-sm mt-6 leading-relaxed">
            For youth pastors, senior leaders, and church administrators<br />
            across Australia.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        className="py-16 px-8 text-center"
        style={{ background: '#F5F5F7', borderTop: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <HuddleLogo size="md" />
          </div>
          <p className="text-[#9ca3af] text-sm mb-4">Built for youth groups, by a youth leader.</p>
          <p className="text-[#c4c9d4] text-xs">
            Made with care for Australian youth ministry.
            {' · '}
            <a href="mailto:hello@huddleapp.au" className="hover:text-[#7C3AED] transition-colors">hello@huddleapp.au</a>
          </p>
        </div>
      </footer>

    </div>
  )
}

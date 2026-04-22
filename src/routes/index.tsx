import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: HuddleLanding,
  head: () => ({
    meta: [
      {
        title:
          'Huddle — Youth Management App | Organize Your Friday Night Youth Group',
      },
      {
        name: 'description',
        content:
          'Huddle is the all-in-one youth management app for Friday night youth groups. Run sheets, rosters, attendance, communication, and safety tools — built for youth leaders and the young people they serve.',
      },
      {
        property: 'og:title',
        content:
          'Huddle — Youth Management App | Organize Your Friday Night Youth Group',
      },
      {
        property: 'og:description',
        content:
          'The youth management app that helps leaders lead with clarity and youth feel like they belong. Try Huddle for your Friday night youth group.',
      },
    ],
  }),
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

/* ── HOOKS ─────────────────────────────────────────────────── */

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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    const targets = el.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .divider-animated, .story-line')
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, scrolled))
      ref.current.style.setProperty('--parallax', `${(clamped - 0.5) * 40}px`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return ref
}

function useCountUp(target: number, duration: number = 1200) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target, duration])

  return { ref, value }
}

/* ── LOGO ──────────────────────────────────────────────────── */

function HuddleLogo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg' | 'hero', light?: boolean }) {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl', hero: '' }
  const heroStyle = size === 'hero'
    ? { fontSize: 'clamp(4rem, 12vw, 8rem)', letterSpacing: '-0.05em', lineHeight: 1 }
    : { letterSpacing: '-0.02em' }

  return (
    <span
      className={`font-bold tracking-tight ${sizes[size]} ${light ? 'text-white' : 'text-[#1a1a1a]'}`}
      style={heroStyle}
    >
      Huddle
      <span className="text-gradient-static" style={{ WebkitTextFillColor: '#7C3AED' }}>.</span>
    </span>
  )
}

/* ── ICON COMPONENTS ───────────────────────────────────────── */

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

/* ── PHONE MOCKUP (Youth View) ─────────────────────────────── */

function PhoneMockupYouth() {
  return (
    <div className="phone-mockup bg-white animate-float" style={{ animationDelay: '-2s' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED] to-[#5B21B6] opacity-[0.03]" />
      {/* Status bar */}
      <div className="pt-10 px-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-semibold text-[#1a1a1a] opacity-60">Friday 7pm</span>
          <span className="text-[10px] font-bold text-[#7C3AED]">LIVE</span>
        </div>
        {/* Run sheet items */}
        <div className="space-y-2.5">
          {[
            { time: '7:00', label: 'Doors Open', active: true },
            { time: '7:15', label: 'Games', active: false },
            { time: '7:45', label: 'Worship', active: false },
            { time: '8:05', label: 'Message', active: false },
            { time: '8:30', label: 'Small Groups', active: false },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all"
              style={{
                background: item.active ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                border: item.active ? '1px solid rgba(124, 58, 237, 0.15)' : '1px solid transparent',
              }}
            >
              <span className="text-[9px] font-mono text-[#9ca3af] w-7">{item.time}</span>
              <span className={`text-[11px] font-medium ${item.active ? 'text-[#7C3AED]' : 'text-[#6b7280]'}`}>
                {item.label}
              </span>
              {item.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />}
            </div>
          ))}
        </div>
        {/* Chat preview */}
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <span className="text-[9px] uppercase tracking-wider text-[#9ca3af] font-semibold">Group Chat</span>
          <div className="mt-2 flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex-shrink-0" />
            <div className="bg-[#F5F5F7] rounded-lg px-2.5 py-1.5">
              <span className="text-[10px] text-[#1a1a1a]">Can't wait for tonight! 🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── PHONE MOCKUP (Leader View) ────────────────────────────── */

function PhoneMockupLeader() {
  return (
    <div className="phone-mockup bg-[#fafafa] animate-float" style={{ animationDelay: '-4s' }}>
      <div className="pt-10 px-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-[#1a1a1a]">Control Hub</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[9px] text-green-600 font-medium">All Clear</span>
          </div>
        </div>
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white rounded-lg p-2" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <span className="text-[16px] font-bold text-[#7C3AED]">24</span>
            <span className="text-[8px] block text-[#9ca3af]">Checked in</span>
          </div>
          <div className="bg-white rounded-lg p-2" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <span className="text-[16px] font-bold text-[#1a1a1a]">8</span>
            <span className="text-[8px] block text-[#9ca3af]">Leaders on</span>
          </div>
        </div>
        {/* Roster status */}
        <div className="space-y-2">
          <span className="text-[9px] uppercase tracking-wider text-[#9ca3af] font-semibold">Team Tonight</span>
          {[
            { name: 'Sarah M.', role: 'Worship', status: '✓' },
            { name: 'Jake L.', role: 'Games', status: '✓' },
            { name: 'Emma R.', role: 'Welcome', status: '✓' },
            { name: 'Tom K.', role: 'AV', status: '⏳' },
          ].map((person, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex-shrink-0 flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">{person.name[0]}</span>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-medium text-[#1a1a1a]">{person.name}</span>
                <span className="text-[8px] text-[#9ca3af] ml-1">{person.role}</span>
              </div>
              <span className="text-[10px]">{person.status}</span>
            </div>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="mt-3 flex gap-2">
          <div className="flex-1 bg-[#7C3AED] rounded-lg py-2 text-center">
            <span className="text-[9px] font-semibold text-white">Send Update</span>
          </div>
          <div className="flex-1 bg-white rounded-lg py-2 text-center" style={{ border: '1px solid rgba(124, 58, 237, 0.2)' }}>
            <span className="text-[9px] font-semibold text-[#7C3AED]">Edit Run Sheet</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── EARLY ACCESS FORM ─────────────────────────────────────── */

function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [groupSize, setGroupSize] = useState(30)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/huddle-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'early-access',
          email,
          'group-size': String(groupSize),
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const getSizeLabel = useCallback((size: number) => {
    if (size <= 15) return 'Intimate crew'
    if (size <= 30) return 'Growing group'
    if (size <= 60) return 'Thriving community'
    if (size <= 100) return 'Large ministry'
    return 'Movement'
  }, [])

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'rgba(124, 58, 237, 0.08)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l6 6L24 10" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-2xl font-bold text-[#1a1a1a] mb-2">You're on the list.</p>
        <p className="text-[#6b7280] font-light">We'll be in touch before the doors open.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <input type="hidden" name="form-name" value="early-access" />
      <div style={{ display: 'none' }}>
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Group Size Slider */}
      <div className="mb-8 text-center">
        <p className="text-sm text-[#9ca3af] uppercase tracking-widest font-medium mb-6">
          How big is your youth group?
        </p>
        <div className="relative mb-4">
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-5xl font-bold text-[#1a1a1a] counter-value" style={{ letterSpacing: '-0.03em' }}>
              ~{groupSize}
            </span>
            <span className="text-lg text-[#9ca3af] font-light">youth</span>
          </div>
          <p className="text-sm text-[#7C3AED] font-medium mb-6">{getSizeLabel(groupSize)}</p>
          <input
            type="range"
            name="group-size"
            min="5"
            max="150"
            step="5"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="w-full max-w-xs mx-auto block"
          />
          <div className="flex justify-between max-w-xs mx-auto mt-2">
            <span className="text-[10px] text-[#c4c9d4]">5</span>
            <span className="text-[10px] text-[#c4c9d4]">150+</span>
          </div>
        </div>
      </div>

      {/* Email + Submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-5 py-3.5 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a1a] text-base outline-none transition-all"
          style={{ boxShadow: 'none' }}
          onFocus={(e) => {
            e.target.style.borderColor = '#7C3AED'
            e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all whitespace-nowrap"
          style={{
            background: loading ? '#9b59f7' : '#7C3AED',
            cursor: loading ? 'wait' : 'pointer',
            border: 'none',
            boxShadow: '0 4px 16px rgba(124, 58, 237, 0.25)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.target as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.target as HTMLElement).style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.35)'
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)'
            ;(e.target as HTMLElement).style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.25)'
          }}
        >
          {loading ? 'Joining…' : 'Get Early Access →'}
        </button>
      </div>
    </form>
  )
}

/* ── MAIN LANDING PAGE ─────────────────────────────────────── */

export default function HuddleLanding() {
  const storyRef = useReveal()
  const twoWorldsRef = useReveal()
  const featuresRef = useReveal()
  const peakRef = useReveal()
  const trustRef = useReveal()
  const ctaRef = useReveal()
  const propelRevealRef = useReveal()
  const parallaxRef = useParallax()

  // Combine parallax + reveal refs for the Propel section
  const propelRef = useCallback((node: HTMLDivElement | null) => {
    (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (propelRevealRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }, [parallaxRef, propelRevealRef])

  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500"
        style={{
          background: navSolid ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: navSolid ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: navSolid ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}
      >
        <HuddleLogo size="md" />
        <a
          href="#early-access"
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
          style={{
            background: '#7C3AED',
            boxShadow: '0 2px 12px rgba(124, 58, 237, 0.25)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(-1px)'
            ;(e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.35)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)'
            ;(e.target as HTMLElement).style.boxShadow = '0 2px 12px rgba(124, 58, 237, 0.25)'
          }}
        >
          Get Early Access
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 overflow-hidden">
        {/* Floating orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="relative z-10">
          <div className="animate-fade-in mb-6">
            <h1 className="sr-only">Huddle — Youth Management App for Friday Night Youth Groups</h1>
            <HuddleLogo size="hero" />
          </div>

          <p
            className="animate-rise-in-slow text-[#6b7280] font-light mx-auto"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', maxWidth: '520px', lineHeight: 1.7 }}
          >
            Where youth leaders lead with Youth {' '}
            <span style={{ color: '#7C3AED' }}>on a platform that puts Youth first.</span>
          </p>

          <div className="animate-rise-in-slow mt-8 flex items-center justify-center gap-4 opacity-0" style={{ animationDelay: '1.2s' }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase"
              style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}>
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" style={{ animation: 'dotPulse 2s ease-in-out infinite' }} />
              Coming soon
            </span>
          </div>

          <div className="animate-rise-in-slow mt-16 flex flex-col items-center gap-3" style={{ animationDelay: '1.8s' }}>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#d1d5db] to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c4c9d4]">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────────── */}
      <section
        ref={storyRef}
        className="py-36 px-6"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-16 font-medium">Every Friday</p>

          <div className="space-y-10">
            {[
              "Every Friday, someone sets up the chairs.",
              "Someone drives across town to pick up the kid who doesn't have a lift.",
              "Someone remembers the kid who looked quiet last week.",
              "Someone carries the whole night in their head.",
              "Not because it's a job.\nBecause it matters.",
            ].map((line, i) => (
              <p
                key={i}
                className={`reveal story-line delay-${(i + 1) * 100} text-[#1a1a1a] font-light`}
                style={{
                  fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                  lineHeight: 1.55,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'pre-line',
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="reveal delay-700 mt-16 flex items-center gap-3">
            <div className="w-12 h-px bg-[#7C3AED] opacity-40" />
            <p className="text-sm text-[#7C3AED] font-medium opacity-60">
              Huddle takes the load off.
            </p>
          </div>
        </div>
      </section>

      {/* ── TWO WORLDS ─────────────────────────────────────────── */}
      <section
        ref={twoWorldsRef}
        className="py-36 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #F5F5F7 0%, #FAFAFA 50%, #F5F5F7 100%)' }}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.03) 0%, transparent 60%)',
        }} />

        <div className="relative max-w-6xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-4 font-medium text-center">Two Worlds, One App</p>
          <h2 className="reveal delay-100 text-center font-bold text-[#1a1a1a] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Where everyone{' '}
            <span className="text-gradient">connects.</span>
          </h2>
          <p className="reveal delay-200 text-center text-[#6b7280] font-light mb-20 mx-auto" style={{ maxWidth: '560px', fontSize: '1.1rem', lineHeight: 1.7 }}>
            For youth, it's community. For leaders, it's clarity.
            Huddle brings both worlds together in one place — so meaningful relationships can truly form.
          </p>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── YOUTH WORLD ── */}
            <div className="reveal-left delay-300">
              <div className="world-card rounded-3xl p-8 lg:p-10"
                style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFBFF 100%)', border: '1px solid rgba(124, 58, 237, 0.08)' }}>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L2 7v6c0 3.5 3.2 6 8 7 4.8-1 8-3.5 8-7V7l-8-5z" stroke="white" strokeWidth="1.5" fill="none"/>
                      <circle cx="10" cy="9" r="2.5" stroke="white" strokeWidth="1.3"/>
                      <path d="M6 15c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-lg" style={{ letterSpacing: '-0.01em' }}>For Youth</h3>
                    <p className="text-xs text-[#9ca3af]">Your community, your way</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-1 space-y-5">
                    {[
                      { icon: '📋', title: 'See the Run Sheet', desc: 'Know what\'s happening tonight in real time.' },
                      { icon: '🗓️', title: 'Your Roster', desc: 'Check when you\'re on and what you\'re doing.' },
                      { icon: '💬', title: 'Group Chat', desc: 'Stay connected with your crew through the week.' },
                      { icon: '🤝', title: 'Safe Community', desc: 'A space that feels like yours — protected always.' },
                    ].map((item, i) => (
                      <div key={i} className="ui-list-item flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-default">
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-[#1a1a1a] text-sm">{item.title}</p>
                          <p className="text-xs text-[#6b7280] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block flex-shrink-0">
                    <PhoneMockupYouth />
                  </div>
                </div>
              </div>
            </div>

            {/* ── LEADERS WORLD ── */}
            <div className="reveal-right delay-400">
              <div className="world-card rounded-3xl p-8 lg:p-10"
                style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F3FF 100%)', border: '1px solid rgba(124, 58, 237, 0.08)' }}>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #5B21B6, #7C3AED)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="3" width="16" height="14" rx="2" stroke="white" strokeWidth="1.3"/>
                      <path d="M2 7h16" stroke="white" strokeWidth="1.3"/>
                      <circle cx="6" cy="11" r="1" fill="white"/>
                      <circle cx="10" cy="11" r="1" fill="white"/>
                      <circle cx="14" cy="11" r="1" fill="white"/>
                      <path d="M6 14h8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-lg" style={{ letterSpacing: '-0.01em' }}>For Leaders</h3>
                    <p className="text-xs text-[#9ca3af]">Your control hub</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-1 space-y-5">
                    {[
                      { icon: '🎯', title: 'Command Centre', desc: 'See your whole night at a glance — attendance, team, timing.' },
                      { icon: '📣', title: 'Team Communication', desc: 'One tap to notify your whole team. No more chasing.' },
                      { icon: '📊', title: 'Smart Rostering', desc: 'Auto-assign from the run sheet. Confirmations built in.' },
                      { icon: '🛡️', title: 'AI Safety Net', desc: 'Conversations monitored. Concerns flagged. Leaders empowered.' },
                    ].map((item, i) => (
                      <div key={i} className="ui-list-item flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-default">
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-[#1a1a1a] text-sm">{item.title}</p>
                          <p className="text-xs text-[#6b7280] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block flex-shrink-0">
                    <PhoneMockupLeader />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connecting message */}
          <div className="mt-16 text-center">
            <div className="reveal delay-500 divider-animated max-w-xs mx-auto mb-8" />
            <p className="reveal delay-600 text-[#6b7280] font-light" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Same app. Different experience.{' '}
              <span className="text-[#7C3AED] font-medium">One mission.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section
        ref={featuresRef}
        className="py-36 px-6"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-4 font-medium text-center">What Huddle does</p>
          <h2 className="reveal delay-100 text-center font-bold text-[#1a1a1a] mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Your entire Friday night,<br />
            <span className="text-gradient-static">in everyone's pocket.</span>
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
                className={`reveal-scale ${feature.delay} feature-card bg-white rounded-2xl p-8`}
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

      {/* ── PROPEL SECTION ─────────────────────────────────────── */}
      <section
        ref={propelRef}
        className="py-40 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)' }}
      >
        {/* Violet glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }} />

        <div className="relative max-w-4xl mx-auto text-center" style={{ transform: 'translateY(var(--parallax, 0))' }}>
          <p className="reveal text-[#7C3AED] text-sm uppercase tracking-widest mb-8 font-semibold">The Next Dimension</p>
          <h2
            className="reveal delay-100 font-bold text-white mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Propelling youth ministry{' '}
            <span className="text-gradient">forward.</span>
          </h2>
          <p className="reveal delay-200 text-[#9ca3af] font-light max-w-xl mx-auto mb-12" style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
            Huddle takes the load off youth leaders so they can do what they do best — lead.
            A safe place where meaningful youth leader and youth relationships can truly form.
          </p>

          <div className="reveal delay-300 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Less admin', desc: 'More presence' },
              { label: 'Less chasing', desc: 'More leading' },
              { label: 'Less guessing', desc: 'More connecting' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-semibold text-lg mb-1">{item.label}</p>
                <p className="text-[#7C3AED] text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL PEAK ─────────────────────────────────────── */}
      <section
        ref={peakRef}
        className="py-40 px-6 text-center relative overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p
            className="reveal font-bold text-[#1a1a1a]"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Friday nights{' '}
            <span className="text-gradient-static">matter.</span>
          </p>
          <p
            className="reveal delay-200 text-[#6b7280] font-light mt-6"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', lineHeight: 1.6 }}
          >
            And so do the people who make them happen.
          </p>
        </div>
      </section>

      {/* ── TRUST ──────────────────────────────────────────────── */}
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

          <div className="reveal delay-400 flex flex-wrap justify-center gap-3">
            {['Built in Australia', 'For churches of all sizes', 'By a youth leader', 'Safety-first design', 'Your brand, not ours'].map((badge, i) => (
              <span
                key={badge}
                className={`badge-float px-4 py-2 rounded-full text-sm font-medium text-[#6b7280] bg-white`}
                style={{ border: '1px solid rgba(0,0,0,0.08)', animationDelay: `${-i * 0.8}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + GROUP SIZE ───────────────────────────────────── */}
      <section
        id="early-access"
        ref={ctaRef}
        className="py-40 px-6 text-center relative overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.15), transparent)' }} />

        <div className="max-w-xl mx-auto relative">
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-6 font-medium">Early Access</p>
          <h2
            className="reveal delay-100 font-bold text-[#1a1a1a] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Huddle is coming.
          </h2>
          <p
            className="reveal delay-200 text-[#6b7280] font-light mb-12"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', lineHeight: 1.6 }}
          >
            Join the youth leaders shaping what's next.
          </p>

          <div className="reveal delay-300">
            <EarlyAccessForm />
          </div>

          <p className="reveal delay-500 text-[#9ca3af] text-sm mt-8 leading-relaxed">
            For youth pastors, senior leaders, and church administrators<br />
            across Australia.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="py-16 px-8 text-center"
        style={{ background: '#F5F5F7', borderTop: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <HuddleLogo size="md" />
          </div>
          <p className="text-[#9ca3af] text-sm mb-2">Built for youth groups, by a youth leader.</p>
          <p className="text-[#6b7280] text-xs mb-4">
            Where youth leaders lead and youth belong.
          </p>
          <p className="text-[#c4c9d4] text-xs">
            Made with care for Australian youth ministry.
            {' · '}
            <a href="mailto:hello@huddleapp.au" className="hover:text-[#7C3AED] transition-colors duration-300">hello@huddleapp.au</a>
          </p>
        </div>
      </footer>

    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useForm } from '@formspree/react'

/** Formspree form ID. Public by design — submissions are posted from the browser. */
const FORMSPREE_FORM_ID = 'xbgjlwvo'

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

/* ── LOGO ──────────────────────────────────────────────────── */

function HuddleLogo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg' | 'hero', light?: boolean }) {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl', hero: '' }
  const heroStyle = size === 'hero'
    ? { fontSize: 'clamp(4rem, 12vw, 8rem)', letterSpacing: '-0.05em', lineHeight: 1 }
    : { letterSpacing: '-0.02em' }
  const logoLetters = ['H', 'u', 'd', 'd', 'l', 'e']
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - bounds.left) / bounds.width) * 100
    const y = ((e.clientY - bounds.top) / bounds.height) * 100
    e.currentTarget.style.setProperty('--logo-grad-x', `${x}%`)
    e.currentTarget.style.setProperty('--logo-grad-y', `${y}%`)
  }

  const handleLogoMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.setProperty('--logo-grad-x', '50%')
    e.currentTarget.style.setProperty('--logo-grad-y', '50%')
  }

  return (
    <span
      className={`logo-word font-bold tracking-tight ${sizes[size]} ${light ? 'text-white' : 'text-[#1a1a1a]'}`}
      style={heroStyle}
      onMouseMove={handleLogoMouseMove}
      onMouseLeave={handleLogoMouseLeave}
    >
      {logoLetters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="logo-letter"
        >
          {letter}
        </span>
      ))}
      <span
        className="logo-letter logo-dot-gradient"
      >
        .
      </span>
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

/** Ghost examples that cycle in the location field — the rotation *is* the hint
 *  that this is free text: share a suburb, a state, a country, or nothing much. */
const LOCATION_HINTS = [
  'Melbourne, VIC',
  'Regional NSW',
  'Somewhere in Queensland',
  'Perth — but we travel',
  'Auckland, New Zealand',
  'As much or as little as you like',
]

/** The tick that springs in once a field has something in it. */
function FieldCheck({ show }: { show: boolean }) {
  return (
    <span
      className="pointer-events-none absolute right-4 top-1/2"
      style={{
        opacity: show ? 1 : 0,
        transform: `translateY(-50%) scale(${show ? 1 : 0.5})`,
        transition:
          'opacity 260ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      aria-hidden="true"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.4l3 3 6-6.8"
          stroke="#7C3AED"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function EarlyAccessForm() {
  const [groupSize, setGroupSize] = useState(30)
  const [ministryName, setMinistryName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hintIndex, setHintIndex] = useState(0)
  const [isHintVisible, setIsHintVisible] = useState(true)
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID)

  const trimmedName = ministryName.trim()

  // The ghost examples only cycle while the field is genuinely idle.
  const showLocationHint = !location && focusedField !== 'location'

  useEffect(() => {
    if (!showLocationHint) return

    const cycleInterval = window.setInterval(() => {
      setIsHintVisible(false)

      window.setTimeout(() => {
        setHintIndex((prev) => (prev + 1) % LOCATION_HINTS.length)
        setIsHintVisible(true)
      }, 350)
    }, 3200)

    return () => window.clearInterval(cycleInterval)
  }, [showLocationHint])

  // Every text input shares one look; focus and filled states are derived, not
  // poked into the DOM, so re-renders while typing can't drop the focus ring.
  const inputClass =
    'w-full px-5 py-3.5 pr-11 rounded-xl border bg-white text-[#1a1a1a] text-base outline-none transition-all duration-300'
  const labelClass =
    'block text-left text-[10px] uppercase tracking-widest font-medium text-[#9ca3af] mb-2'

  const fieldStyle = (name: string, filled: boolean) => ({
    borderColor:
      focusedField === name
        ? '#7C3AED'
        : filled
          ? 'rgba(124, 58, 237, 0.35)'
          : '#e5e7eb',
    boxShadow:
      focusedField === name ? '0 0 0 3px rgba(124, 58, 237, 0.1)' : 'none',
  })

  const fieldFocus = (name: string) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField((prev) => (prev === name ? null : prev)),
  })

  const getSizeLabel = useCallback((size: number) => {
    if (size <= 15) return 'Intimate crew'
    if (size <= 30) return 'Growing group'
    if (size <= 60) return 'Thriving community'
    if (size <= 100) return 'Large ministry'
    return 'Movement'
  }, [])

  if (state.succeeded) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'rgba(124, 58, 237, 0.08)' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l6 6L24 10" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-2xl font-bold text-[#1a1a1a] mb-2">
          {trimmedName ? `${trimmedName} is on the list.` : "You're on the list."}
        </p>
        <p className="text-[#6b7280] font-light">We'll be in touch before the doors open.</p>
      </div>
    )
  }

  const errors = state.errors
    ? [
        ...state.errors.getFormErrors(),
        ...state.errors.getFieldErrors('email'),
        ...state.errors.getFieldErrors('ministry-name'),
        ...state.errors.getFieldErrors('location'),
      ].map((error) => error.message)
    : []

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <input
        type="hidden"
        name="_subject"
        value={
          trimmedName
            ? `Huddle — interest from ${trimmedName}`
            : 'Huddle — new interest'
        }
      />
      {/* Honeypot: Formspree silently discards submissions that fill this in. */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
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
          <p className="text-sm font-medium mb-6">
            {trimmedName ? (
              <span style={{ animation: 'riseIn 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <span className="text-[#1a1a1a]">{trimmedName}</span>
                <span className="text-[#d8d3e6]">{' · '}</span>
              </span>
            ) : null}
            <span className="text-[#7C3AED]">{getSizeLabel(groupSize)}</span>
          </p>
          <input
            type="range"
            name="group-size"
            min="5"
            max="150"
            step="5"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="w-full max-w-xs mx-auto block"
            aria-label="Youth group size"
          />
          <div className="flex justify-between max-w-xs mx-auto mt-2">
            <span className="text-[10px] text-[#c4c9d4]">5</span>
            <span className="text-[10px] text-[#c4c9d4]">150+</span>
          </div>
        </div>
      </div>

      {/* Ministry name (required) + location (free text, optional) */}
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="ministry-name" className={labelClass}>
            Youth ministry
          </label>
          <div className="relative">
            <input
              id="ministry-name"
              type="text"
              name="ministry-name"
              placeholder="e.g. Ignite Youth"
              required
              autoComplete="organization"
              value={ministryName}
              onChange={(e) => setMinistryName(e.target.value)}
              className={inputClass}
              style={fieldStyle('ministry-name', trimmedName.length > 0)}
              {...fieldFocus('ministry-name')}
            />
            <FieldCheck show={trimmedName.length > 0} />
          </div>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Where you're based{' '}
            <span className="text-[#c4c9d4] normal-case tracking-normal">
              — optional
            </span>
          </label>
          <div className="relative">
            <input
              id="location"
              type="text"
              name="location"
              autoComplete="address-level1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
              style={fieldStyle('location', location.trim().length > 0)}
              {...fieldFocus('location')}
            />
            {/* Rotating ghost examples stand in for a static placeholder. */}
            {showLocationHint && (
              <span
                className="pointer-events-none absolute left-5 top-1/2 text-base text-[#9ca3af]"
                style={{
                  opacity: isHintVisible ? 1 : 0,
                  transform: `translateY(-50%) translateY(${isHintVisible ? '0px' : '6px'})`,
                  transition: 'opacity 350ms ease, transform 350ms ease',
                }}
                aria-hidden="true"
              >
                {LOCATION_HINTS[hintIndex]}
              </span>
            )}
            <FieldCheck show={location.trim().length > 0} />
          </div>
        </div>
      </div>

      {/* Email + Submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex-1 w-full">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              style={fieldStyle('email', email.trim().length > 0)}
              {...fieldFocus('email')}
            />
            <FieldCheck show={/.+@.+\..+/.test(email.trim())} />
          </div>
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all whitespace-nowrap"
          style={{
            background: state.submitting ? '#9b59f7' : '#7C3AED',
            cursor: state.submitting ? 'wait' : 'pointer',
            border: 'none',
            boxShadow: '0 4px 16px rgba(124, 58, 237, 0.25)',
          }}
          onMouseEnter={(e) => {
            if (!state.submitting) {
              (e.target as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.target as HTMLElement).style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.35)'
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)'
            ;(e.target as HTMLElement).style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.25)'
          }}
        >
          {state.submitting ? 'Counting you in…' : 'Count me in →'}
        </button>
      </div>

      {errors.length > 0 && (
        <p role="alert" className="mt-3 text-sm text-center text-[#dc2626]">
          {errors.join(' ')} Please try again.
        </p>
      )}
    </form>
  )
}

/* ── MAIN LANDING PAGE ─────────────────────────────────────── */

export default function HuddleLanding() {
  const heroSlogans = [
    {
      primary: 'Serving youth leaders,',
      highlight: 'so every young person is known and cared for.',
    },
    {
      primary: 'Built for ministry nights',
      highlight: 'where leaders serve well and youth truly belong.',
    },
    {
      primary: 'Helping your team steward every Friday night',
      highlight: 'with clarity, care, and purpose.',
    },
    {
      primary: 'The operating system',
      highlight: 'for modern youth ministry.',
    },
    {
      primary: 'One platform',
      highlight: 'to run safer, smoother, more connected youth nights.',
    },
    {
      primary: 'From run sheet to roster to comms —',
      highlight: 'Huddle keeps your whole night in sync.',
    },
    {
      primary: 'A youth-first platform',
      highlight: 'that turns Friday night chaos into coordinated impact.',
    },
  ]

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
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [isSloganVisible, setIsSloganVisible] = useState(true)
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 35, active: false })

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const cycleInterval = window.setInterval(() => {
      setIsSloganVisible(false)

      window.setTimeout(() => {
        setCurrentSloganIndex((prev) => (prev + 1) % heroSlogans.length)
        setIsSloganVisible(true)
      }, 450)
    }, 10000)

    return () => window.clearInterval(cycleInterval)
  }, [heroSlogans.length])

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - bounds.left) / bounds.width) * 100
    const y = ((e.clientY - bounds.top) / bounds.height) * 100
    setHeroPointer({ x, y, active: true })
  }

  const handleHeroMouseLeave = () => {
    setHeroPointer({ x: 50, y: 35, active: false })
  }

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
          Join the mission
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${heroPointer.x}% ${heroPointer.y}%, rgba(124, 58, 237, ${heroPointer.active ? 0.2 : 0.12}) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 65%)`,
            transition: 'background 220ms ease',
          }}
        />
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
            <span
              style={{
                display: 'inline-block',
                opacity: isSloganVisible ? 1 : 0,
                transform: isSloganVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 450ms ease, transform 450ms ease',
              }}
            >
              <span style={{ color: '#1a1a1a' }}>
                {heroSlogans[currentSloganIndex].primary}{' '}
              </span>
              <span style={{ color: '#7C3AED' }}>
                {heroSlogans[currentSloganIndex].highlight}
              </span>
            </span>
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
          <p className="reveal text-[#9ca3af] text-sm uppercase tracking-widest mb-6 font-medium">Register your interest</p>
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
            <a href="#early-access" className="hover:text-[#7C3AED] transition-colors duration-300">Get in touch</a>
          </p>
        </div>
      </footer>

    </div>
  )
}

import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header.jsx'
import Raffles from '@/components/Raffles.jsx'
import Winners from '@/components/Winners.jsx'
import Seasonal from '@/components/Seasonal.jsx'
import Team from '@/components/Team.jsx'
import FAQ from '@/components/FAQ.jsx'
import DevTests from '@/components/DevTests.jsx'
import Home from '@/pages/Home.jsx'
import AboutUs from '@/pages/AboutUs.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import Container from '@/components/Container.jsx'

export default function App() {
  const [credits, setCredits] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)

  const [promoMsg, setPromoMsg] = useState('')
  const [promoCode, setPromoCode] = useState('')

  const raffles = [
    { id: 'raff-1', kind: 'Raffle', title: '$100,000 Ticket — Big Pot', badge: '$100k / ticket', max: 1000, value: 412 },
    { id: 'raff-2', kind: 'Instant Win', title: 'Scratch — up to $50,000,000', badge: '$250k / play', max: 100, value: 72 },
    { id: 'raff-3', kind: 'Raffle', title: 'Bond Stack — High Roller', badge: '$1m / ticket', max: 500, value: 120 },
    { id: 'raff-4', kind: 'Instant Win', title: 'Spin — Win up to $5m', badge: '$50k / spin', max: 100, value: 54 },
  ]

  const winners = [
    { when: 'Today, 18:42', name: 'Minty_Minxy', xid: '1927218', prize: '$5,000,000', raffle: 'Spin — up to $5m' },
    { when: 'Yesterday', name: 'Shmichael', xid: '3461692', prize: 'Faction Honour Crown', raffle: 'Seasonal — Item Raffle' },
    { when: '2d ago', name: 'kaiLin', xid: '3320707', prize: '$100,000,000', raffle: 'Big Pot' },
  ]

  async function handleRedeem() {
    const code = promoCode.trim()
    if (!code) { setPromoMsg('Enter a code from Discord.'); return }
    try {
      const res = await fetch('/api/promo/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok) { setPromoMsg(data.error || 'Something went wrong.'); return }
      const add = Number(data.tickets_added || 0)
      setCredits(c => c + add)
      setPromoMsg(add > 0 ? `+${add} tickets added.` : 'Redeemed.')
    } catch {
      const key = code.toUpperCase()
      if (key === 'INVALID') return setPromoMsg('Code not found.')
      if (key === 'USED') return setPromoMsg('This code was already redeemed.')
      if (key === 'EXPIRED') return setPromoMsg('This code has expired.')
      if (key === 'NOTELIGIBLE') return setPromoMsg('Your Discord account isn’t eligible for this code.')
      setCredits(c => c + 10)
      setPromoMsg('+10 tickets added.')
    }
  }

  return (
    <div className="min-h-screen bg-ink-900 text-zinc-100 selection:bg-zinc-200 selection:text-black">
      {/* Background grid */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_50rem_at_50%_-20%,rgba(255,255,255,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(60rem_40rem_at_center,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <Container variant="wide" className="my-6">
        <Header
          credits={credits}
          loggedIn={loggedIn}
          avatarUrl={avatarUrl}
          onSimLogin={() => { setLoggedIn(true); setAvatarUrl('https://cdn.discordapp.com/embed/avatars/1.png') }}
          onLogout={() => { setLoggedIn(false); setAvatarUrl(null) }}
        />

        <main className="space-y-10">
          <Routes>
            <Route path="/" element={
              <Home
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoMsg={promoMsg}
                onRedeem={handleRedeem}
              />
            } />
            <Route path="/how" element={<HowItWorks />} />
            <Route path="/raffles" element={<Raffles raffles={raffles} />} />
            <Route path="/winners" element={<Winners winners={winners} />} />
            <Route path="/seasonal" element={<Seasonal />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <DevTests
            setPromoCode={setPromoCode}
            setPromoMsg={setPromoMsg}
            runRedeem={handleRedeem}
            setLoggedIn={setLoggedIn}
            setAvatarUrl={setAvatarUrl}
          />
        </main>

        <footer className="mt-12 border-t border-white/10 py-8 text-center text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Blackbox — Unofficial, community-run. Not affiliated with Torn LTD.</p>
        </footer>
      </Container>
    </div>
  )
}

function NotFound() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p className="text-sm text-zinc-400">The page you’re looking for doesn’t exist.</p>
    </div>
  )
}

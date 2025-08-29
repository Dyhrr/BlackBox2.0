//
// BlackBox2.0 Casino Platform
// Crafted by Dyhr (https://github.com/Dyhrr)
//
import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '@/components/NavBar.jsx'
import Home from '@/pages/Home.jsx'
import Raffles from '@/pages/Raffles.jsx'
import Winners from '@/pages/Winners.jsx'
import About from '@/pages/About.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import DevPanel from '@/components/DevPanel.jsx'
import Games from '@/pages/Games.jsx'
import { DEV_ADMIN, ALLOWED_ADMIN_IDS } from '@/constants/admin.js'

export default function App() {
  useEffect(() => {
    console.log('%cBlackBox2.0 Casino Platform\nCrafted by Dyhr (https://github.com/Dyhrr)', 'color: #7CF0BD; font-size: 1.2em; font-weight: bold; background: #111114; padding: 8px; border-radius: 8px;');
  }, []);

  const [credits, setCredits] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [discordId, setDiscordId] = useState(null) // Discord user ID

  const [promoMsg, setPromoMsg] = useState('')
  const [promoCode, setPromoCode] = useState('')

  let Admin = null
  if (DEV_ADMIN) {
    Admin = lazy(() => import('@/pages/Admin.jsx'))
  }

  const raffles = [
    { id: 'raff-1', kind: 'Raffle',      title: '$100,000 Ticket — Big Pot',           badge: '$100k / ticket', max: 1000, value: 412 },
    { id: 'raff-2', kind: 'Instant Win', title: 'Scratch — up to $50,000,000',        badge: '$250k / play',  max: 100,  value: 72 },
    { id: 'raff-3', kind: 'Raffle',      title: 'Bond Stack — High Roller',            badge: '$1m / ticket',  max: 500,  value: 120 },
    { id: 'raff-4', kind: 'Instant Win', title: 'Spin — Win up to $5m',                badge: '$50k / spin',   max: 100,  value: 54 },
  ]

  const winners = [
    { when: 'Today, 18:42', name: 'Minty_Minxy', xid: '1927218', prize: '$5,000,000',      raffle: 'Spin — up to $5m' },
    { when: 'Yesterday',    name: 'Shmichael',   xid: '3461692', prize: 'Faction Honour Crown', raffle: 'Seasonal — Item Raffle' },
    { when: '2d ago',       name: 'kaiLin',      xid: '3320707', prize: '$100,000,000',    raffle: 'Big Pot' },
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
    } catch (err) {
      // In dev, allow friendly error messages for test codes; never mint credits client-side
      const offline = import.meta.env.VITE_ENABLE_DEV_REDEEM_OFFLINE === 'true'
      if (offline) {
        const key = code.toUpperCase()
        if (key === 'INVALID') return setPromoMsg('Code not found.')
        if (key === 'USED') return setPromoMsg('This code was already redeemed.')
        if (key === 'EXPIRED') return setPromoMsg('This code has expired.')
        if (key === 'NOTELIGIBLE') return setPromoMsg("Your Discord account isn't eligible for this code.")
      }
      setPromoMsg('Network error. Please try again.')
    }
  }

  return (
    <>
      <div className="side-banner left-banner">
        {/* Partner Ad - Left */}
        <a href="#" target="_blank" rel="noopener noreferrer">Partner Ad</a>
      </div>
      <div className="side-banner right-banner">
        {/* Partner Ad - Right */}
        <a href="#" target="_blank" rel="noopener noreferrer">Partner Ad</a>
      </div>
      <main>
        <NavBar
          credits={credits}
          loggedIn={loggedIn}
          avatarUrl={avatarUrl}
          onSimLogin={() => {
            setLoggedIn(true);
            setAvatarUrl('https://cdn.discordapp.com/embed/avatars/1.png');
            // Cycle through allowed Discord IDs for dev testing
            const allowed = ['344538646457876481','720053524620378134','303898072860065792'];
            const nextId = allowed[(allowed.indexOf(discordId) + 1) % allowed.length];
            setDiscordId(nextId || allowed[0]);
          }}
          onLogout={() => { setLoggedIn(false); setAvatarUrl(null); setDiscordId(null); }}
          discordId={discordId}
        />
        <Routes>
          <Route path="/" element={
            <Home
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              promoMsg={promoMsg}
              onRedeem={handleRedeem}
              winners={winners}
            />
          } />
          {/* <Route path="/how" element={<HowItWorks />} /> removed: now part of Home */}
          {DEV_ADMIN && (
            <Route path="/admin" element={
              loggedIn && ALLOWED_ADMIN_IDS.includes(discordId)
                ? (
                  <Suspense fallback={<div />}>{Admin ? <Admin discordId={discordId} /> : null}</Suspense>
                )
                : <NotFound />
            } />
          )}
          <Route path="/raffles" element={<Raffles raffles={raffles} />} />
          <Route path="/winners" element={<Winners winners={winners} />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div className="container" aria-live="polite">
          <DevPanel
            setPromoCode={setPromoCode}
            setPromoMsg={setPromoMsg}
            runRedeem={handleRedeem}
            setLoggedIn={setLoggedIn}
            setAvatarUrl={setAvatarUrl}
          />
        </div>
      </main>
      <footer className="section" role="contentinfo">
        <div className="container text-center text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} BlackBox &mdash; Unofficial, community-run. Not affiliated with Torn LTD.</p>
        </div>
      </footer>
    </>
  )
}

function NotFound() {
  return (
    <section className="card p-6 text-center" aria-labelledby="notfound-title">
      <h2 id="notfound-title" className="text-xl font-semibold">Page not found</h2>
      <p className="text-sm text-zinc-400">The page you're looking for doesn't exist.</p>
    </section>
  )
}

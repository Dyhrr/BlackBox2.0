import React from 'react'
import PromoCode from '@/components/PromoCode.jsx'
import { Link } from 'react-router-dom'

export default function Home({ promoCode, setPromoCode, promoMsg, onRedeem }) {
  return (
    <>
      <section className="relative">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-tight">
              Torn-only raffles, instant wins, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-white">zero fluff</span>.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-300">Community-run. Fast credits. Draws you can verify. We never ask for your Torn API key.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href="https://www.torn.com/profiles.php?XID=2277924" className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black hover:opacity-90">Open Crikelz [2277924]</a>
              <Link to="/how" className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5">How It Works</Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['No API Keys', 'Discord OAuth Only'],
                ['1–2 min', 'Fast Credit Top-ups'],
                ['Transparent', 'Verifiable Draws'],
                ['Torn-Only', 'Unofficial & Community-run'],
              ].map(([small, big]) => (
                <div key={small} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
                  <p className="text-[11px] tracking-wide text-zinc-400">{small}</p>
                  <p className="text-sm font-semibold">{big}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 grid place-items-center">
            <p className="text-sm text-zinc-400">AI banner placeholder (casino vibe, no Torn IP)</p>
          </div>
        </div>
      </section>

      <PromoCode
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        promoMsg={promoMsg}
        onRedeem={onRedeem}
      />
    </>
  )
}

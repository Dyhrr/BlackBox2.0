import React from 'react'
import PromoCode from '@/components/PromoCode.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button.jsx'
import WinnersTicker from '@/components/WinnersTicker.jsx'

export default function Home({ promoCode, setPromoCode, promoMsg, onRedeem, winners = [] }) {
  return (
    <>
      <section className="section">
        <div className="container relative">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h1 className="text-[clamp(2.25rem,6vw,3.875rem)] font-black leading-[1.05] tracking-tight">
                BlackBox Casino and Raffles
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-300">Community-run. Fast credits. Draws you can verify. We never ask for your Torn API key.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button as="a" href="https://www.torn.com/profiles.php?XID=2277924" variant="primary">Open Crikelz [2277924]</Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  ['Discord OAuth Only'],
                  ['Fast Credit Top-ups'],
                  ['Verifiable Draws'],
                  ['Unofficial & Community-run'],
                ].map((label) => (
                  <Button key={label} variant="ghost" className="text-xs px-3 py-1">
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 grid place-items-center">
              <p className="text-sm text-zinc-400">AI banner placeholder (casino vibe, no Torn IP)</p>
            </div>
          </div>
          <div className="mt-6">
            <WinnersTicker items={winners} />
          </div>
        </div>
      </section>

      <HowItWorks />
      <PromoCode
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        promoMsg={promoMsg}
        onRedeem={onRedeem}
      />
    </>
  )
}

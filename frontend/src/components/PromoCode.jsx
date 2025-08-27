import React from 'react'

export default function PromoCode({ promoCode, setPromoCode, promoMsg, onRedeem }) {
  return (
    <section id="promo" className="section">
      <div className="container">
        <div className="card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Have a code?</h3>
              <p className="text-xs sm:text-sm text-zinc-300">Enter a promo code from Discord to claim free tickets. One per user. Abuse = ban.</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm placeholder:text-zinc-500"
                placeholder="Enter code e.g. KAILIN-IS-A-NERD"
              />
              <button onClick={onRedeem} className="btn btn--accent w-full sm:w-auto">Redeem</button>
            </div>
          </div>
          <p className="mt-2 text-sm text-zinc-400" role="status">{promoMsg}</p>
        </div>
      </div>
    </section>
  )
}

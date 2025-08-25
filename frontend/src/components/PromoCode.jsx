import React from 'react'

export default function PromoCode({ promoCode, setPromoCode, promoMsg, onRedeem }) {
  return (
    <section id="promo" className="mt-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">Have a code?</h3>
            <p className="text-xs sm:text-sm text-zinc-300">Enter a promo code from Discord to claim free tickets. One per user. Abuse = ban.</p>
          </div>
          <div className="flex w-full max-w-md gap-2">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500"
              placeholder="Enter code e.g. KAILIN-IS-A-NERD"
            />
            <button onClick={onRedeem} className="w-full sm:w-auto rounded-xl bg-white px-4 py-2 text-sm font-bold text-black">Redeem</button>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-400" role="status">{promoMsg}</p>
      </div>
    </section>
  )
}

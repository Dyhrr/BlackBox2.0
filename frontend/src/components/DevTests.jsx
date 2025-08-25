import React from 'react'

export default function DevTests({ setPromoCode, setPromoMsg, runRedeem, setLoggedIn, setAvatarUrl }) {
  return (
    <section id="dev-tests" className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
      <h3 className="text-sm font-semibold text-emerald-300">Dev / Test Cases</h3>
      <ul className="mt-2 list-disc pl-5 text-xs text-emerald-200">
        <li>Promo code empty → click Redeem → shows "Enter a code from Discord."</li>
        <li>Promo code set → click Redeem → shows submission confirmation.</li>
        <li>Progress bars render the correct % based on value/max.</li>
        <li>Code = "INVALID" → shows "Code not found."</li>
        <li>Code = "USED" → shows "This code was already redeemed."</li>
        <li>Code = "EXPIRED" → shows "This code has expired."</li>
        <li>Code = "NOTELIGIBLE" → shows "Your Discord account isn’t eligible for this code."</li>
        <li>Success adds +10 to Credits badge and shows "+10 tickets added."</li>
        <li>Simulate Login → shows avatar in header; Logout hides it.</li>
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => { setPromoCode(''); setPromoMsg(''); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Reset Promo</button>
        <button onClick={() => setPromoCode('FREE10')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Fill Success (FREE10)</button>
        <button onClick={() => setPromoCode('INVALID')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Fill INVALID</button>
        <button onClick={() => setPromoCode('USED')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Fill USED</button>
        <button onClick={() => setPromoCode('EXPIRED')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Fill EXPIRED</button>
        <button onClick={() => setPromoCode('NOTELIGIBLE')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Fill NOTELIGIBLE</button>
        <button onClick={runRedeem} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Run Redeem</button>
        <button onClick={() => { setLoggedIn(true); setAvatarUrl('https://cdn.discordapp.com/embed/avatars/1.png'); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Simulate Login</button>
        <button onClick={() => { setLoggedIn(false); setAvatarUrl(null); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-400/10">Logout</button>
      </div>
    </section>
  )
}

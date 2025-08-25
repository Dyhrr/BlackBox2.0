export default function DevPanel({ setPromoCode, setPromoMsg, runRedeem, setLoggedIn, setAvatarUrl }) {
  if (!import.meta.env.VITE_SHOW_DEV_PANEL) return null;
  return (
    <div className="mt-8 rounded-2xl border border-emerald-800/50 bg-emerald-900/30 p-6 text-emerald-200">
      <h3 className="text-sm font-semibold">Dev / Test Cases</h3>
      <ul className="mt-2 list-disc pl-5 text-xs">
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
        <button onClick={() => { setPromoCode(''); setPromoMsg(''); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Reset Promo</button>
        <button onClick={() => setPromoCode('FREE10')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Fill FREE10</button>
        <button onClick={() => setPromoCode('INVALID')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Fill INVALID</button>
        <button onClick={() => setPromoCode('USED')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Fill USED</button>
        <button onClick={() => setPromoCode('EXPIRED')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Fill EXPIRED</button>
        <button onClick={() => setPromoCode('NOTELIGIBLE')} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Fill NOTELIGIBLE</button>
        <button onClick={runRedeem} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Run Redeem</button>
        <button onClick={() => { setLoggedIn(true); setAvatarUrl('https://cdn.discordapp.com/embed/avatars/1.png'); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Simulate Login</button>
        <button onClick={() => { setLoggedIn(false); setAvatarUrl(null); }} className="rounded-lg border border-emerald-400/40 px-3 py-1 text-xs hover:bg-emerald-400/10">Logout</button>
      </div>
    </div>
  );
}

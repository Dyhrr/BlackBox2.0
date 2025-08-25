import React from 'react'

export default function FAQ() {
  return (
    <section id="faq" className="mt-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Security</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Discord OAuth login only. We never ask for your Torn API key or password.</li>
            <li>Credits handled via in-game item transfers (Xanax → credits).</li>
            <li>Promo codes are single-use per Discord ID and rate-limited (server-side).</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Good to know</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Unofficial fan project. Not affiliated with Torn LTD; no Torn logos used.</li>
            <li>All currency amounts are Torn dollars ($).</li>
            <li>Questions? Ping a mod in Discord — we answer fast.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

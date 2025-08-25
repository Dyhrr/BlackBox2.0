import React from 'react'

export default function Seasonal() {
  return (
    <section id="seasonal" className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">Seasonal winning items</h2>
      <p className="mt-1 text-sm text-zinc-400">Rotating high-demand items featured in raffles.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['Featured', 'Faction Honour Crown', 'Limited seasonal. Watch Discord for drop times.'],
          ['Consumable', 'Xanax Bundle', 'Bulk raffles with multiple winners.'],
          ['Luxury', 'Donator Pack', 'Premium prize pool for big spenders.'],
        ].map(([cat, title, desc]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-400">{cat}</p>
            <p className="mt-1 text-sm font-semibold">{title}</p>
            <p className="text-sm text-zinc-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

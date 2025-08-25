import React from 'react'
import { Link } from 'react-router-dom'

export default function Raffles({ raffles = [] }) {
  return (
    <section id="raffles" className="mt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Live raffles (mock)</h2>
          <p className="text-zinc-400">UI only — wired to backend later.</p>
        </div>
        <Link to="/winners" className="text-sm text-zinc-300 hover:text-white">View winners →</Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {raffles.map((r) => (
          <article key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10">
            <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-12 w-12 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7l9 5 9-5" />
                <path d="M21 17l-9 5-9-5" />
                <path d="M3 7l9-5 9 5-9 5-9-5z" />
                <path d="M3 7v10l9 5 9-5V7" />
              </svg>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-400">{r.kind}</p>
                <h3 className="mt-1 text-base font-semibold leading-tight">{r.title}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{r.badge}</span>
            </div>
            <div className="mt-4">
              <progress max={r.max} value={r.value} />
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                <span>{r.value} sold</span>
                <span>{Math.round((r.value / r.max) * 100)}%</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black">{r.kind === 'Raffle' ? 'Join' : 'Play'}</button>
              <button className="rounded-xl border border-white/20 px-3 py-2 text-xs text-zinc-200 hover:bg-white/5">Details</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

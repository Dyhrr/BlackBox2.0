import React from 'react'

export default function Winners({ winners = [] }) {
  return (
    <section id="winners" className="mt-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Recent winners</h2>
        <a href="#" className="hidden sm:inline text-sm text-zinc-300 hover:text-white">Full history →</a>
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden space-y-3">
        {winners.map((w, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-zinc-400">{w.when}</p>
            <a className="mt-1 block text-sm underline hover:text-white" target="_blank" rel="noopener noreferrer" href={`https://www.torn.com/profiles.php?XID=${w.xid}`}>
              {`${w.name} [${w.xid}]`}
            </a>
            <p className="text-sm">{w.prize}</p>
            <p className="text-xs text-zinc-400">{w.raffle}</p>
          </article>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-zinc-300">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Prize</th>
              <th className="px-4 py-3">Raffle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {winners.map((w, i) => (
              <tr key={i}>
                <td className="px-4 py-3">{w.when}</td>
                <td className="px-4 py-3">
                  <a className="underline hover:text-white" target="_blank" rel="noopener noreferrer" href={`https://www.torn.com/profiles.php?XID=${w.xid}`}>
                    {`${w.name} [${w.xid}]`}
                  </a>
                </td>
                <td className="px-4 py-3">{w.prize}</td>
                <td className="px-4 py-3">{w.raffle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

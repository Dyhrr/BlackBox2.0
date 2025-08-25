import React from 'react'

export default function Team() {
  return (
    <section id="team" className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">Team</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Founder</p>
          <h3 className="mt-1 text-sm font-semibold">Crikelz <span className="text-zinc-400">[2277924]</span></h3>
          <p className="mt-1 text-sm text-zinc-300">Runs the pots, handles payouts, rarely gets a full nights sleep.</p>
          <a className="mt-2 inline-block text-xs underline text-zinc-300 hover:text-white" href="https://www.torn.com/profiles.php?XID=2277924">Open profile</a>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Dev</p>
          <h3 className="mt-1 text-sm font-semibold">Dyhr <span className="text-zinc-400">[3120841]</span></h3>
          <p className="mt-1 text-sm text-zinc-300">Breaks things so you don’t have to. Builds fast.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Helpers</p>
          <p className="mt-1 text-sm text-zinc-300">Dyhr - Service Desk agent, helps people for a living Stixer - Loves to help people, helpful dude</p>
          <a className="mt-2 inline-block text-xs underline text-zinc-300 hover:text-white" href="https://www.torn.com/profiles.php?XID=3120841">Open Dyhrs profile</a>
          <br />
          <a className="mt-2 inline-block text-xs underline text-zinc-300 hover:text-white" href="https://www.torn.com/profiles.php?XID=3381390">Open Stixers profile</a>
        </article>
      </div>
    </section>
  )
}

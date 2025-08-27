import Card from '@/components/ui/Card.jsx';

export default function About() {
  const team = [
    { role: 'Founder', name: 'Crikelz', xid: '2277924', desc: 'Runs the pots, handles payouts, rarely gets a full nights sleep.' },
    { role: 'Dev', name: 'Dyhr', xid: '3120841', desc: 'Breaks things so you don’t have to. Builds fast.' },
    { role: 'Helpers', name: 'Dyhr & Stixer', xid: null, desc: 'Dyhr - Service Desk agent, helps people for a living. Stixer - Loves to help people, helpful dude.' },
  ];
  const faqs = [
    { q: 'Do I need my Torn API key?', a: 'No. Login uses Discord OAuth only.' },
    { q: 'How are credits added?', a: 'Credits are handled via in-game item transfers (e.g., Xanax for credits).' },
    { q: 'Are draws fair?', a: 'Yes, all draws are logged and verifiable in our Discord.' },
    { q: 'Is this affiliated with Torn?', a: 'No. BlackBox is a fan project and not affiliated with Torn LTD.' },
    { q: 'Where can I ask more questions?', a: 'Join our Discord server and ping a mod — we answer fast.' },
  ];
  return (
    <section className="section">
      <div className="container space-y-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">About BlackBox Casino</h1>
          <Card className="p-6 md:p-8 space-y-4 text-sm">
            <p>BlackBox Casino was created by Torn players, for Torn players. Our goal has always been simple: run a fair, transparent casino that people can trust.</p>
            <p>Every raffle, giveaway, and payout is logged publicly on the Torn forums and in our Discord. If you win, you’ll see it announced, verified, and paid in full.</p>
            <p>Since opening, we’ve delivered prizes ranging from Donator Packs and rare collectibles to Private Islands and billions in Torn cash. Our track record speaks for itself: no missed payouts, no excuses, no scams.</p>
            <p>At BlackBox Casino, you’re part of a community that values fairness and integrity. That’s what sets us apart.</p>
          </Card>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {team.map((m) => (
              <Card key={m.role} className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-wider text-zinc-400">{m.role}</p>
                <h3 className="mt-1 text-sm font-semibold">{m.name}{m.xid && <span className="text-zinc-400"> [{m.xid}]</span>}</h3>
                <p className="mt-1 text-sm text-zinc-300">{m.desc}</p>
                {m.xid && (
                  <a className="mt-2 inline-block text-xs underline text-zinc-300" href={`https://www.torn.com/profiles.php?XID=${m.xid}`}>Open profile</a>
                )}
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-2">
            {faqs.map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="card p-4">
      <summary className="flex w-full items-center justify-between text-left text-sm font-medium cursor-pointer list-none">
        <span>{q}</span>
        <span className="accordion__chev" aria-hidden>⌄</span>
      </summary>
      <p className="mt-2 text-sm text-zinc-300">{a}</p>
    </details>
  );
}

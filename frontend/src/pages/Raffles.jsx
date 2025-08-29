import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';

// #TODO
// - Add backend integration for creating raffles
// - Implement raffle ticket purchase flow
// - Display live raffle countdowns
// - Add admin controls for managing raffles

export default function Raffles({ raffles = [] }) {
  const seasonal = [
    ['Featured', 'Faction Honour Crown', 'Limited seasonal. Watch Discord for drop times.'],
    ['Consumable', 'Xanax Bundle', 'Bulk raffles with multiple winners.'],
    ['Luxury', 'Donator Pack', 'Premium prize pool for big spenders.'],
  ];
  return (
    <section className="section">
      <div className="container space-y-12">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Live raffles (mock)</h1>
            <p className="text-zinc-400">UI only — wired to backend later.</p>
          </div>
        </div>
        {raffles.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <svg className="h-12 w-12 text-white/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M9 12h6"/><path d="M12 9v6"/></svg>
            <p className="mt-4 text-sm text-zinc-300">No raffles live right now.</p>
            <Button as="a" href="https://discord.gg" className="mt-4" variant="primary">Join our Discord</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {raffles.map((r) => {
              const pct = Math.round((r.value / r.max) * 100);
              return (
                <Card key={r.id} className="p-6 md:p-8">
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
                      <h3 className="mt-1 text-lg font-semibold leading-tight">{r.title}</h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{r.badge}</span>
                  </div>
                  <div className="mt-4">
                    <div className="progress" aria-label="progress">
                      <div className="progress__bar" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                      <span>{r.value} sold</span>
                      <span>{pct}%</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <Button className="flex-1" variant="primary">{r.kind === 'Raffle' ? 'Join' : 'Play'}</Button>
                    <Button variant="secondary">Details</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Seasonal items</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seasonal.map(([cat, title, desc]) => (
              <Card key={title} className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-wider text-zinc-400">{cat}</p>
                <p className="mt-1 text-sm font-semibold">{title}</p>
                <p className="mt-1 text-sm text-zinc-300">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

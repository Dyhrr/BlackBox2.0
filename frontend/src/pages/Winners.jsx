import Card from '@/components/ui/Card.jsx';

export default function Winners({ winners = [] }) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recent winners</h1>
        <a href="#" className="hidden md:inline text-sm text-zinc-300 hover:text-white">Full history →</a>
      </div>
      <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10">
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
            {winners.map((w) => (
              <WinnerRow key={w.xid} {...w} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {winners.map((w) => (
          <WinnerRow key={w.xid + '-m'} {...w} />
        ))}
      </div>
    </section>
  );
}

function WinnerRow({ when, name, xid, prize, raffle }) {
  return (
    <>
      <tr className="hidden md:table-row">
        <td className="px-4 py-3">{when}</td>
        <td className="px-4 py-3">
          <a className="underline hover:text-white" target="_blank" rel="noopener noreferrer" href={`https://www.torn.com/profiles.php?XID=${xid}`}>
            {`${name} [${xid}]`}
          </a>
        </td>
        <td className="px-4 py-3">{prize}</td>
        <td className="px-4 py-3">{raffle}</td>
      </tr>
      <Card className="p-4 md:hidden">
        <div className="text-white/70 text-xs">{when}</div>
        <a className="block mt-1 underline" target="_blank" rel="noopener noreferrer" href={`https://www.torn.com/profiles.php?XID=${xid}`}>
          {`${name} [${xid}]`}
        </a>
        <div className="mt-1">{prize}</div>
        <div className="mt-1 text-white/80">{raffle}</div>
      </Card>
    </>
  );
}

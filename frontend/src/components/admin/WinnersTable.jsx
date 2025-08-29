import { mockWinners } from '@/data/mockData.js';

/**
 * WinnersTable Component - Displays recent winners
 * @param {Object} props
 * @param {Array} [props.winners] - Array of winner objects
 * @param {number} [props.limit] - Maximum number of winners to display
 * @param {Function} [props.onWinnerClick] - Callback when winner is clicked
 */
export default function WinnersTable({ winners = mockWinners, limit, onWinnerClick }) {
  const displayWinners = limit ? winners.slice(0, limit) : winners;

  const formatPrize = (prize) => {
    // Check if it's a monetary prize
    if (prize.startsWith('$')) {
      const amount = parseFloat(prize.replace(/[$,]/g, ''));
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
      }
    }
    return prize;
  };

  const getPrizeColor = (prize) => {
    if (prize.startsWith('$')) {
      const amount = parseFloat(prize.replace(/[$,]/g, ''));
      if (amount >= 1000000) return 'text-yellow-400'; // Gold for millions
      if (amount >= 100000) return 'text-green-400';   // Green for 100K+
      if (amount >= 10000) return 'text-blue-400';     // Blue for 10K+
      return 'text-white';                             // White for smaller amounts
    }
    return 'text-purple-400'; // Purple for items
  };

  const handleWinnerClick = (winner) => {
    if (onWinnerClick) {
      onWinnerClick(winner);
    } else {
      // Default behavior: open Torn profile
      window.open(`https://www.torn.com/profiles.php?XID=${winner.xid}`, '_blank');
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Winners</h3>
        {limit && winners.length > limit && (
          <span className="text-xs text-zinc-400">
            Showing {limit} of {winners.length}
          </span>
        )}
      </div>

      {displayWinners.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          <svg className="mx-auto h-12 w-12 text-zinc-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
          </svg>
          No winners to display yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-2 text-left text-zinc-300">When</th>
                <th className="py-2 text-left text-zinc-300">Winner</th>
                <th className="py-2 text-left text-zinc-300">Prize</th>
                <th className="py-2 text-left text-zinc-300">Raffle</th>
              </tr>
            </thead>
            <tbody>
              {displayWinners.map(winner => (
                <tr 
                  key={winner.id} 
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  onClick={() => handleWinnerClick(winner)}
                >
                  <td className="py-3 text-zinc-400 text-xs">
                    {winner.when}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-white hover:text-emerald-400 transition-colors">
                          {winner.name}
                        </div>
                        <div className="text-xs text-zinc-500">
                          ID: {winner.xid}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`font-semibold ${getPrizeColor(winner.prize)}`}>
                      {formatPrize(winner.prize)}
                    </span>
                  </td>
                  <td className="py-3 text-zinc-300 text-xs">
                    {winner.raffle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {displayWinners.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
          <span>Click on a winner to view their Torn profile</span>
          <span>{displayWinners.length} winner{displayWinners.length !== 1 ? 's' : ''} shown</span>
        </div>
      )}
    </div>
  );
}
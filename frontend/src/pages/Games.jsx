import Card from '../components/ui/Card';
import { mockWinners } from '@/data/mockData.js';
import React, { useMemo } from 'react';

// #TODO
// - Add new casino games (slots, blackjack, etc.)
// - Integrate game results with backend
// - Show user game history
// - Add leaderboard for top winners

const games = [
  { title: 'Blackjack', description: 'Try your luck against the dealer in classic Blackjack.' },
  { title: 'Roulette', description: 'Place your bets and spin the wheel in Roulette.' },
  { title: 'Wheel of Fortune', description: 'Spin for big prizes on the Wheel of Fortune.' },
  { title: 'Horse Racing', description: 'Bet on your favorite horse and win big.' },
  { title: 'Slots', description: 'Pull the lever and hit the jackpot in Slots.' },
  { title: 'High-Low', description: 'Guess if the next card is higher or lower.' },
  { title: 'Mystery Box', description: 'Open a box and reveal your surprise.' },
  { title: 'Baccarat', description: 'Play the elegant game of Baccarat.' },
  { title: 'Weekly Lottery', description: 'Enter the lottery for a chance to win weekly prizes.' },
];

export default function Games() {
  const leaderboard = useMemo(() => {
    const counts = new Map()
    for (const w of mockWinners) {
      counts.set(w.name, (counts.get(w.name) || 0) + 1)
    }
    return Array.from(counts.entries())
      .map(([name, wins]) => ({ name, wins }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 5)
  }, [])
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <Card key={game.title} className="p-6 shadow-lg hover:scale-105 transition">
                <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
                <p className="text-gray-600">{game.description}</p>
              </Card>
            ))}
          </div>
        </div>
        <aside>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Winners</h2>
            {leaderboard.length === 0 ? (
              <p className="text-sm text-gray-500">No winners yet.</p>
            ) : (
              <ol className="space-y-2">
                {leaderboard.map((row, idx) => (
                  <li key={row.name} className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-zinc-200">
                      {idx + 1}. {row.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-zinc-400">{row.wins} win{row.wins !== 1 ? 's' : ''}</span>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}

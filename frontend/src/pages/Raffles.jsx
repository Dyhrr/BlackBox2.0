import { useState } from 'react';
import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import { mockRaffles } from '@/data/mockData.js';

/**
 * Raffles Page - Enhanced with better mock data and improved UI
 * Features:
 * - Live raffle display with progress bars
 * - Countdown timers for ending raffles
 * - Improved mobile responsiveness
 * - Better loading and error states
 */
export default function Raffles({ raffles = mockRaffles, credits = 0, onSpend }) {
  const [loading, setLoading] = useState(false);
  const [joinError, setJoinError] = useState("");

  const seasonal = [
    ['Featured', 'Faction Honour Crown', 'Limited seasonal. Watch Discord for drop times.'],
    ['Consumable', 'Xanax Bundle', 'Bulk raffles with multiple winners.'],
    ['Luxury', 'Donator Pack', 'Premium prize pool for big spenders.'],
  ];

  const handleJoinRaffle = async (raffle) => {
    setLoading(true);
    setJoinError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const cost = Number(raffle.ticketPrice ?? 100000)
      if (typeof onSpend === 'function') {
        const ok = onSpend(cost)
        if (!ok) {
          setJoinError('Insufficient credits to join this raffle.');
          return;
        }
      }
      console.log(`Joined raffle ${raffle.id} for ${cost} credits`);
      // In real app, success would return updated balances
    } catch (error) {
      setJoinError(`Failed to join raffle: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getRaffleStatus = (raffle) => {
    const timeRemaining = formatTimeRemaining(raffle.endDate);
    if (timeRemaining === "Ended") return { text: "Ended", color: "text-red-400" };
    if (raffle.status === "ending_soon") return { text: "Ending Soon", color: "text-yellow-400" };
    return { text: timeRemaining, color: "text-green-400" };
  };

  return (
    <section className="section">
      <div className="container space-y-8 md:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Live Raffles</h1>
            <p className="text-zinc-400 mt-1">Join active raffles and win amazing prizes!</p>
          </div>
          <div className="text-sm text-zinc-500">
            {raffles.length} active raffle{raffles.length !== 1 ? 's' : ''}
          </div>
        </div>

        {joinError && (
          <div className="p-4 bg-red-900/30 border border-red-800/50 text-red-200 rounded-lg">
            {joinError}
          </div>
        )}

        {raffles.length === 0 ? (
          <div className="flex flex-col items-center py-16 md:py-20 text-center">
            <svg className="h-16 w-16 text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
            </svg>
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">No active raffles</h3>
            <p className="text-zinc-500 max-w-md">
              Check back soon for new raffles, or follow our Discord for announcements about upcoming draws.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {raffles.map((raffle) => {
              const pct = Math.round((raffle.value / raffle.max) * 100);
              const status = getRaffleStatus(raffle);
              const isEnded = status.text === "Ended";
              const cost = Number(raffle.ticketPrice ?? 100000);
              const insufficient = credits < cost;
              
              return (
                <Card key={raffle.id} className="p-4 md:p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">
                        {raffle.kind}
                      </p>
                      <h3 className="text-base md:text-lg font-semibold leading-tight text-white mb-1">
                        {raffle.title}
                      </h3>
                      {raffle.description && (
                        <p className="text-xs text-zinc-400 line-clamp-2">
                          {raffle.description}
                        </p>
                      )}
                    </div>
                    <span className="ml-2 rounded-full bg-white/10 px-2 md:px-3 py-1 text-xs whitespace-nowrap">
                      {raffle.badge}
                    </span>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="progress" aria-label="raffle progress">
                        <div className="progress__bar" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                        <span>{raffle.value} / {raffle.max} tickets</span>
                        <span>{pct}%</span>
                      </div>
                    </div>

                    {/* Status and Timer */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Ticket Cost: <span className="font-bold">100k</span> (fixed)
                      </span>
                      <span className={status.color}>
                        {status.text}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button 
                        className="flex-1 text-sm" 
                        variant="primary"
                        disabled={isEnded || loading || insufficient}
                        onClick={() => handleJoinRaffle(raffle)}
                      >
                        {loading ? (
                          <LoadingSpinner size="sm" />
                        ) : isEnded ? (
                          'Ended'
                        ) : insufficient ? (
                          'Insufficient'
                        ) : raffle.kind === 'Raffle' ? (
                          'Join'
                        ) : (
                          'Play'
                        )}
                      </Button>
                      <Button variant="secondary" className="text-sm">
                        Details
                      </Button>
                    </div>

                    {/* Prizes Preview */}
                    {raffle.prizes && raffle.prizes.length > 0 && (
                      <div className="pt-2 border-t border-zinc-800">
                        <p className="text-xs text-zinc-500 mb-1">Prizes:</p>
                        <p className="text-xs text-zinc-400">
                          {raffle.prizes[0]}{raffle.prizes.length > 1 ? ` +${raffle.prizes.length - 1} more` : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Seasonal Items Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Seasonal Items</h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seasonal.map(([cat, title, desc]) => (
              <Card key={title} className="p-4 md:p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">{cat}</p>
                <p className="text-sm font-semibold text-white mb-2">{title}</p>
                <p className="text-sm text-zinc-300">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

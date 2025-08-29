import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card.jsx'
import Button from '@/components/ui/Button.jsx'
import { shuffle } from '@/utils/rand.js'

function makeDeck() {
  const suits = ['♠', '♥', '♦', '♣']
  const values = [2,3,4,5,6,7,8,9,10,11,12,13,14]
  const deck = []
  for (const s of suits) {
    for (const v of values) deck.push({ v, s })
  }
  return shuffle(deck)
}

function label(v) {
  if (v === 14) return 'A'
  if (v === 13) return 'K'
  if (v === 12) return 'Q'
  if (v === 11) return 'J'
  return String(v)
}

function suitClass(s) {
  return s === '♥' || s === '♦' ? 'text-red-400' : 'text-zinc-100'
}

export default function HighLow() {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(50)
  const BET_OPTIONS = [10, 25, 50, 100, 250]
  // House edge via payout multiplier (< 1.0 keeps RNG unbiased)
  const PAYOUT_MULTIPLIER = 0.98 // 2% edge target on wins
  const [deck, setDeck] = useState(() => makeDeck())
  const [idx, setIdx] = useState(0)
  const [message, setMessage] = useState('Make a guess!')
  const [history, setHistory] = useState([])

  const current = deck[idx]
  const nextCard = deck[idx + 1]

  useEffect(() => {
    if (!current || !nextCard) {
      const d = makeDeck()
      setDeck(d)
      setIdx(0)
      setMessage('New deck shuffled. Make a guess!')
    }
  }, [current, nextCard])

  const canPlay = !!current && !!nextCard && bet > 0 && balance >= bet

  // Ensure bet never exceeds balance; clamp to the largest available option
  useEffect(() => {
    if (bet > balance) {
      const allowed = BET_OPTIONS.filter(x => x <= balance).sort((a,b) => b - a)
      setBet(allowed[0] || 0)
    }
  }, [balance])

  function play(guess) {
    if (!canPlay) return
    const a = current.v
    const b = nextCard.v
    let result = 'push'
    if (guess === 'higher') result = b > a ? 'win' : (b === a ? 'push' : 'lose')
    if (guess === 'lower') result = b < a ? 'win' : (b === a ? 'push' : 'lose')
    let delta = 0
    if (result === 'win') {
      const payout = Math.floor(bet * PAYOUT_MULTIPLIER)
      delta = payout
    }
    if (result === 'lose') delta = -bet
    const newBal = Math.max(0, balance + delta)
    setBalance(newBal)
    setMessage(
      result === 'win'
        ? `You win +${Math.floor(bet * PAYOUT_MULTIPLIER)} (payout ${PAYOUT_MULTIPLIER}x)`
        : result === 'lose'
          ? `You lose -${bet}`
          : 'Push'
    )
    setHistory(h => [{
      cur: current, next: nextCard, guess, result, delta, bal: newBal
    }, ...h].slice(0, 8))
    setIdx(i => i + 1)
  }

  function reset() {
    setDeck(makeDeck())
    setIdx(0)
    setMessage('New game. Make a guess!')
    setHistory([])
  }

  return (
    <section className="section">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">High-Low</h1>
          <p className="text-zinc-400 text-sm">Demo mode. No real credits are used.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-zinc-400 text-xs">Balance</p>
                <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
                <p className="text-xs text-zinc-500">Payout on win: {Math.round(PAYOUT_MULTIPLIER*100)}% of bet</p>
              </div>
              <div className="flex items-center gap-2">
                {BET_OPTIONS.map(x => (
                  <Button
                    key={x}
                    variant={x === bet ? 'primary' : 'secondary'}
                    className="text-xs px-3 py-1"
                    onClick={() => setBet(x)}
                    disabled={x > balance}
                  >
                    Bet {x}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 flex flex-col items-center justify-center">
                <p className="text-xs text-zinc-400 mb-2">Current Card</p>
                {current && (
                  <div className={`text-6xl font-bold ${suitClass(current.s)}`} aria-live="polite">
                    {label(current.v)}{current.s}
                  </div>
                )}
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 flex flex-col items-center justify-center">
                <p className="text-xs text-zinc-400 mb-2">Next Card</p>
                <div className="text-6xl font-bold text-zinc-700 select-none">??</div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button className="flex-1" variant="primary" onClick={() => play('higher')} disabled={!canPlay}>Higher</Button>
              <Button className="flex-1" variant="secondary" onClick={() => play('lower')} disabled={!canPlay}>Lower</Button>
              <Button className="" variant="secondary" onClick={reset}>Reset</Button>
            </div>

            <p className="mt-3 text-sm text-zinc-300" role="status">{message}</p>
            <p className="text-xs text-zinc-500">Equal cards are a push.</p>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-3">Recent Rounds</h3>
            {history.length === 0 ? (
              <p className="text-sm text-zinc-400">No rounds yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {history.map((h, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      {label(h.cur.v)}{h.cur.s} → {label(h.next.v)}{h.next.s} · {h.guess}
                    </span>
                    <span className={h.delta > 0 ? 'text-emerald-400' : h.delta < 0 ? 'text-red-400' : 'text-zinc-400'}>
                      {h.delta > 0 ? `+${h.delta}` : h.delta < 0 ? h.delta : '0'} · {h.result}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="mt-6 text-xs text-zinc-500">
          <p>RNG source: Web Crypto API (CSPRNG). Fisher–Yates shuffle without modulo bias. House edge applied via payout multiplier; randomness remains unbiased.</p>
        </div>
      </div>
    </section>
  )
}

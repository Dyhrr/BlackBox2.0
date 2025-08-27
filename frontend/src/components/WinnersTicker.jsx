import React from 'react'

const defaultItems = [
  { name: 'Minty_Minxy', prize: '$5m' },
  { name: 'Shmichael', prize: 'Faction Honour Crown' },
  { name: 'kaiLin', prize: '$100m' },
  { name: 'SomePlayer', prize: 'Donator Pack' },
  { name: 'AnotherOne', prize: '$50m' },
]

export default function WinnersTicker({ items = defaultItems }) {
  const list = [...items, ...items]
  return (
    <div className="ticker" aria-label="recent winners">
      <div className="ticker__row">
        {list.map((w, i) => (
          <span key={i} className="whitespace-nowrap">
            {w.name} won {w.prize}
          </span>
        ))}
      </div>
    </div>
  )
}

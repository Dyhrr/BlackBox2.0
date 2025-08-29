import React, { useMemo } from 'react'

export default function PromoHistory() {
  const history = useMemo(() => {
    try {
      const raw = localStorage.getItem('bb_promo_history')
      const parsed = raw ? JSON.parse(raw) : []
      if (!Array.isArray(parsed)) return []
      return parsed
        .slice()
        .sort((a, b) => (new Date(b.date)) - (new Date(a.date)))
        .slice(0, 5)
    } catch {
      return []
    }
  }, [])

  if (history.length === 0) return null

  return (
    <section className="section">
      <div className="container">
        <div className="card p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Recent Promo Redemptions</h3>
          <ul className="space-y-2 text-sm">
            {history.map((h, idx) => (
              <li key={`${h.code}-${idx}`} className="flex items-center justify-between">
                <span className="text-zinc-300">{h.code}</span>
                <span className="text-zinc-500">
                  {new Date(h.date).toLocaleString()} {h.added ? `· +${h.added} tickets` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}


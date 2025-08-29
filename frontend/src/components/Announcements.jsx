import React from 'react'

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

export default function Announcements({ items = [] }) {
  if (!items || items.length === 0) return null
  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Announcements</h2>
        </div>
        <div className="grid gap-3 md:gap-4 md:grid-cols-2">
          {items.slice(0, 4).map(a => (
            <article key={a.id} className="card p-4">
              <header className="mb-1">
                <h3 className="font-semibold text-white leading-tight">{a.title}</h3>
                <p className="text-xs text-zinc-500">{formatDate(a.date)}</p>
              </header>
              <p className="text-sm text-zinc-300">{a.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


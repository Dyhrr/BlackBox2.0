import React from 'react'

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ['1. Send Xanax', 'Send 1x Xanax to Crikelz [2277924].', 'https://www.torn.com/profiles.php?XID=2277924'],
            ['2. Wait a minute', 'Credits appear in your Blackbox balance automatically.', null],
            ['3. Play', 'Join raffles or try Instant Wins. Payouts are instant.', null],
          ].map(([h, s, link]) => (
            <div key={h} className="card p-4">
              <p className="text-sm font-semibold">{h}</p>
              <p className="text-sm text-zinc-300">
                {link ? (
                  <>
                    Send 1x Xanax to{' '}
                    <a className="underline" href={link} target="_blank" rel="noreferrer">
                      Crikelz [2277924]
                    </a>
                    .
                  </>
                ) : s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

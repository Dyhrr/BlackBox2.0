import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { DEV_ADMIN, ALLOWED_ADMIN_IDS } from '@/constants/admin.js'

export default function NavBar({ credits, loggedIn, avatarUrl, onSimLogin, onLogout, discordId }) {
  const [open, setOpen] = useState(false)

  // Desktop NavItem
  const NavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={() => { setOpen(false); onClick?.() }}
      className={({ isActive }) =>
        'underline px-3 py-2 ' +
        (isActive ? 'text-white' : 'text-zinc-300 hover:text-white')
      }
    >
      {label}
    </NavLink>
  );

  // Mobile NavItem (for drawer only)
  const MobileNavItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={() => { setOpen(false); onClick?.() }}
      className={({ isActive }) =>
        'block rounded-lg px-4 py-2 font-medium transition-colors ' +
        (isActive ? 'bg-emerald-700 text-white' : 'text-zinc-100 hover:bg-zinc-700 hover:text-white')
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="nav">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="M3.27 6.96 12 12l8.73-5.04M12 22V12" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-lg font-black tracking-tight">BLACKBOX</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Torn Casino & Raffles</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {/* <NavItem to="/how" label="How it works" /> removed: now part of Home */}
          <NavItem to="/raffles" label="Raffles" />
          <NavItem to="/games" label="Games" />
          <NavItem to="/winners" label="Winners" />
          <NavItem to="/about" label="About" />
          {DEV_ADMIN && loggedIn && ALLOWED_ADMIN_IDS.includes(discordId) && (
            <NavItem to="/admin" label="Admin" />
          )}
        </nav>

        {/* Right controls */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-zinc-200">Credits: {credits}</span>
          {loggedIn ? (
            <div className="flex items-center gap-2">
              <img
                src={avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                alt="Discord avatar"
                className="h-8 w-8 rounded-full ring-1 ring-white/10"
              />
              <button onClick={onLogout} className="btn btn--ghost text-xs px-3 py-1.5">Logout</button>
            </div>
          ) : (
            DEV_ADMIN ? (
              <button onClick={onSimLogin} className="btn btn--accent flex items-center gap-2 text-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.36-.43.85-.59 1.23a18.27 18.27 0 0 0-5.936 0A7.26 7.26 0 0 0 9.44 3a19.736 19.736 0 0 0-3.76 1.369C2.409 8.205 1.563 11.94 1.875 15.63A19.9 19.9 0 0 0 7.2 18c.42-.57.8-1.18 1.13-1.82-.62-.24-1.21-.54-1.77-.9.15-.11.3-.22.44-.33 3.36 1.57 7.01 1.57 10.34 0 .15.11.3.22.45.33-.56.36-1.15.66-1.77.9.33.64.71 1.25 1.13 1.82a19.84 19.84 0 0 0 5.33-2.37c.44-4.94-.75-8.63-2.79-11.26ZM9.86 13.5c-.8 0-1.46-.73-1.46-1.62s.64-1.63 1.46-1.63c.82 0 1.48.73 1.46 1.63 0 .89-.64 1.62-1.46 1.62Zm4.29 0c-.8 0-1.46-.73-1.46-1.62s.66-1.63 1.46-1.63c.82 0 1.48.73 1.46 1.63 0 .89-.64 1.62-1.46 1.62Z" />
                </svg>
                Login (Discord)
              </button>
            ) : null
          )}
        </div>

        {/* Mobile: credits + burger */}
        <div className="sm:hidden flex items-center gap-2">
          <span className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-zinc-200">Cr: {credits}</span>
          <button
            aria-label="Open menu"
            className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-end" onClick={() => setOpen(false)}>
            <div
              className="h-full min-h-[400px] w-72 bg-zinc-800 border-l border-white/10 p-4 rounded-l-2xl shadow-2xl overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog" aria-modal="true"
            >
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-300">Menu</p>
              <button aria-label="Close" onClick={() => setOpen(false)} className="rounded-md border border-white/10 p-1.5 hover:bg-white/5">
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6l6.3-6.3z"/></svg>
              </button>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              {/* <MobileNavItem to="/how" label="How it works" /> removed: now part of Home */}
              <MobileNavItem to="/raffles" label="Raffles" />
              <MobileNavItem to="/games" label="Games" />
              <MobileNavItem to="/winners" label="Winners" />
              <MobileNavItem to="/about" label="About" />
              {DEV_ADMIN && loggedIn && ALLOWED_ADMIN_IDS.includes(discordId) && (
                <MobileNavItem to="/admin" label="Admin" />
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs text-zinc-400">Credits: <span className="text-zinc-200">{credits}</span></p>
              <div className="mt-3">
                {loggedIn ? (
                  <button onClick={() => { onLogout(); setOpen(false) }} className="btn btn--ghost w-full text-xs">Logout</button>
                ) : (
                  DEV_ADMIN ? (
                    <button onClick={() => { onSimLogin(); setOpen(false) }} className="btn btn--accent w-full text-sm">Login (Discord)</button>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

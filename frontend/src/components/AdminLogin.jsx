import React, { useState } from 'react';

const DEV_ADMIN = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEV_ADMIN === 'true'

// Allow overriding dev test users via env JSON: VITE_ADMIN_USERS='[{"username":"u","password":"p"}]'
function loadAdminUsers() {
  const raw = import.meta.env.VITE_ADMIN_USERS
  if (raw) {
    try { return JSON.parse(raw) } catch (_) { /* ignore invalid */ }
  }
  if (DEV_ADMIN) {
    return [
      { username: 'admin1', password: 'password1' },
      { username: 'admin2', password: 'password2' },
      { username: 'owner', password: 'supersecret' },
      { username: 'dyhr', password: 'test123' }, // test user
    ]
  }
  return []
}

const ADMIN_USERS = loadAdminUsers()

export default function AdminLogin({ onLogin, isAllowed }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!isAllowed) { setError('Not authorized for admin login.'); return }
    const found = ADMIN_USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setError('');
      onLogin(username);
    } else {
      setError('Invalid credentials');
    }
  }

  if (!DEV_ADMIN) {
    return (
      <section className="section min-h-[60vh] flex items-center justify-center bg-black/90">
        <div className="container max-w-md mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800 text-center">
          <h2 className="text-2xl font-black mb-2 text-white">Admin Access</h2>
          <p className="text-zinc-300 text-sm">Admin login is disabled in this build.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section min-h-[60vh] flex items-center justify-center bg-black/90">
      <div className="container max-w-md mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800">
        <h2 className="text-3xl font-black mb-6 text-center text-white">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-zinc-700 bg-zinc-950 text-white rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-zinc-700 bg-zinc-950 text-white rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button type="submit" className="btn btn--primary w-full py-3 text-lg font-bold">Login</button>
          {error && <p className="text-red-500 text-center text-base mt-2">{error}</p>}
        </form>
        {DEV_ADMIN && ADMIN_USERS.length > 0 && (
          <div className="mt-6 text-center text-xs text-zinc-400">
            <p>Dev test user: <span className="font-bold text-emerald-400">{ADMIN_USERS[ADMIN_USERS.length-1]?.username}</span> / <span className="font-bold text-emerald-400">{ADMIN_USERS[ADMIN_USERS.length-1]?.password}</span></p>
          </div>
        )}
      </div>
    </section>
  );
}

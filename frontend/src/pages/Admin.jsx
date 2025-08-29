import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import { ALLOWED_ADMIN_IDS } from '@/constants/admin.js'

// #TODO
// - Connect user search to backend
// - Add user credit adjustment controls
// - Implement broadcast to all users
// - Add raffle management (edit/delete)

export default function Admin({ discordId }) {
  const isAllowed = !!discordId && ALLOWED_ADMIN_IDS.includes(discordId)
  const [adminUser, setAdminUser] = useState(() => localStorage.getItem('bb_adminUser') || null);
  const [message, setMessage] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const winners = [
    { when: 'Today, 18:42', name: 'Minty_Minxy', xid: '1927218', prize: '$5,000,000', raffle: 'Spin — up to $5m' },
    { when: 'Yesterday', name: 'Shmichael', xid: '3461692', prize: 'Faction Honour Crown', raffle: 'Seasonal — Item Raffle' },
    { when: '2d ago', name: 'kaiLin', xid: '3320707', prize: '$100,000,000', raffle: 'Big Pot' },
  ];

  function handleBroadcast(e) {
    e.preventDefault();
    setBroadcastMsg(message);
    setMessage("");
    setTimeout(() => setBroadcastMsg(""), 4000);
  }

  if (!isAllowed) return <NotAuthorized />
  if (!adminUser) {
    return <AdminLogin isAllowed={isAllowed} onLogin={user => {
      setAdminUser(user);
      localStorage.setItem('bb_adminUser', user);
    }} />;
  }

  function handleLogout() {
    setAdminUser(null);
    localStorage.removeItem('bb_adminUser');
  }

  // Dummy user data for search
  const [userSearch, setUserSearch] = useState("");
  const users = [
    { username: "dyhr", credits: 100, discordId: "344538646457876481" },
    { username: "admin1", credits: 50, discordId: "720053524620378134" },
    { username: "minty", credits: 200, discordId: "303898072860065792" },
  ];
  const filteredUsers = users.filter(u => u.username.includes(userSearch));

  // Dummy raffle data for management
  const [raffleTitle, setRaffleTitle] = useState("");
  const [rafflePot, setRafflePot] = useState("");
  function handleCreateRaffle(e) {
    e.preventDefault();
    alert(`Created raffle: ${raffleTitle} with pot ${rafflePot}`);
    setRaffleTitle("");
    setRafflePot("");
  }

  return (
    <>
        {broadcastMsg && (
          <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
            <div className="mt-4 px-6 py-3 rounded-lg bg-emerald-700 text-white text-lg font-bold shadow-lg animate-fade-in">
              Broadcast from <span className="font-semibold">{adminUser}</span>: {broadcastMsg}
            </div>
          </div>
        )}
      <section className="section flex items-center justify-center">
        <div className="container max-w-3xl mx-auto px-4 py-8 bg-zinc-950 rounded-2xl shadow-xl border border-zinc-900">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <p className="text-zinc-300 mb-6">Welcome, <span className="font-semibold">{adminUser}</span>! <button onClick={handleLogout} className="ml-4 btn btn--ghost text-xs">Logout</button></p>

          {/* User Search */}
          <div className="mb-10 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-semibold mb-3">User Search</h3>
            <input
              type="text"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              placeholder="Search by username"
              className="border border-zinc-700 rounded px-3 py-2 mb-3 w-full bg-zinc-950 text-white"
            />
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-1 text-left">Username</th>
                  <th className="py-1 text-left">Credits</th>
                  <th className="py-1 text-left">Discord ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.username} className="border-b border-zinc-800">
                    <td className="py-1 text-left">{u.username}</td>
                    <td className="py-1 text-left">{u.credits}</td>
                    <td className="py-1 text-left">{u.discordId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Raffle Management */}
          <div className="mb-10 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-semibold mb-3">Create Raffle</h3>
            <form onSubmit={handleCreateRaffle} className="flex gap-2 mb-2">
              <input
                type="text"
                value={raffleTitle}
                onChange={e => setRaffleTitle(e.target.value)}
                placeholder="Raffle Title"
                className="border border-zinc-700 rounded px-3 py-2 w-1/2 bg-zinc-950 text-white"
                required
              />
              <input
                type="number"
                value={rafflePot}
                onChange={e => setRafflePot(e.target.value)}
                placeholder="Pot Amount"
                className="border border-zinc-700 rounded px-3 py-2 w-1/2 bg-zinc-950 text-white"
                required
              />
              <button type="submit" className="btn btn--primary">Create</button>
            </form>
          </div>

          {/* Recent Winners */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Recent Winners</h3>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-1 text-left">When</th>
                  <th className="py-1 text-left">Name</th>
                  <th className="py-1 text-left">Prize</th>
                  <th className="py-1 text-left">Raffle</th>
                </tr>
              </thead>
              <tbody>
                {winners.map(w => (
                  <tr key={w.name + w.when} className="border-b border-zinc-800">
                    <td className="py-1 text-left">{w.when}</td>
                    <td className="py-1 text-left">{w.name}</td>
                    <td className="py-1 text-left">{w.prize}</td>
                    <td className="py-1 text-left">{w.raffle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Site Announcement Broadcast */}
          <div className="mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-semibold mb-2">Broadcast Site Announcement</h3>
            <form onSubmit={handleBroadcast} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter announcement message"
                className="border border-zinc-700 rounded px-3 py-2 w-full bg-zinc-950 text-white"
                required
              />
              <button type="submit" className="btn btn--primary">Send</button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}

function NotAuthorized() {
  return (
    <section className="section flex items-center justify-center">
      <div className="container max-w-md text-center card p-8">
        <h2 className="text-xl font-semibold mb-2">Not authorized</h2>
        <p className="text-sm text-zinc-400">Your Discord account is not whitelisted for admin access.</p>
      </div>
    </section>
  )
}

import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import UserSearchTable from '@/components/admin/UserSearchTable.jsx';
import RaffleManagement from '@/components/admin/RaffleManagement.jsx';
import WinnersTable from '@/components/admin/WinnersTable.jsx';
import BroadcastForm from '@/components/admin/BroadcastForm.jsx';
import Modal from '@/components/ui/Modal.jsx';
import Tooltip from '@/components/ui/Tooltip.jsx';
import { ALLOWED_ADMIN_IDS } from '@/constants/admin.js';

/**
 * Admin Panel - Refactored into smaller, focused components
 * Features:
 * - User management with search and credit adjustments
 * - Raffle creation and management
 * - Recent winners display
 * - Site-wide broadcast system
 * - Improved mobile responsiveness and accessibility
 */
export default function Admin({ discordId }) {
  const isAllowed = !!discordId && ALLOWED_ADMIN_IDS.includes(discordId);
  const [adminUser, setAdminUser] = useState(() => localStorage.getItem('bb_adminUser') || null);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Handle broadcast display
  const handleBroadcast = (broadcastData) => {
    setBroadcastMsg(`${broadcastData.message}`);
    setTimeout(() => setBroadcastMsg(""), 5000);
  };

  // Handle user selection from search table
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  // Handle credit adjustments
  const handleCreditAdjust = (userId, amount, operation) => {
    console.log(`Admin action: ${operation} ${amount} credits for user ${userId}`);
    // In a real app, this would make an API call to adjust credits
  };

  // Handle raffle operations
  const handleRaffleCreate = (newRaffle) => {
    console.log('Admin created raffle:', newRaffle);
    // In a real app, this would save to backend
  };

  const handleRaffleEdit = (raffleId) => {
    console.log('Admin editing raffle:', raffleId);
    // In a real app, this would open edit modal or navigate to edit page
  };

  const handleRaffleDelete = (raffleId) => {
    console.log('Admin deleted raffle:', raffleId);
    // In a real app, this would delete from backend
  };

  if (!isAllowed) return <NotAuthorized />;
  
  if (!adminUser) {
    return <AdminLogin isAllowed={isAllowed} onLogin={user => {
      setAdminUser(user);
      localStorage.setItem('bb_adminUser', user);
    }} />;
  }

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('bb_adminUser');
  };

  return (
    <>
      {/* Broadcast Banner */}
      {broadcastMsg && (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4">
          <div className="mt-4 px-6 py-3 rounded-lg bg-emerald-700 text-white text-sm md:text-lg font-bold shadow-xl animate-fade-in max-w-4xl">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="flex-1">
                <strong>Broadcast from {adminUser}:</strong> {broadcastMsg}
              </span>
            </div>
          </div>
        </div>
      )}

      <section className="section min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 p-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Panel</h1>
                <p className="text-zinc-300">
                  Welcome back, <span className="font-semibold text-emerald-400">{adminUser}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip content="View admin documentation">
                  <button className="btn btn--ghost text-xs px-3 py-2">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help
                  </button>
                </Tooltip>
                <button 
                  onClick={handleLogout} 
                  className="btn btn--ghost text-xs px-3 py-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <UserSearchTable 
                onUserSelect={handleUserSelect}
                onCreditAdjust={handleCreditAdjust}
              />
              
              <BroadcastForm 
                onBroadcast={handleBroadcast}
                adminUser={adminUser}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <RaffleManagement 
                onRaffleCreate={handleRaffleCreate}
                onRaffleEdit={handleRaffleEdit}
                onRaffleDelete={handleRaffleDelete}
              />
              
              <WinnersTable limit={10} />
            </div>
          </div>
        </div>
      </section>

      {/* User Details Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Details"
        size="lg"
      >
        {selectedUser && <UserDetailsModal user={selectedUser} />}
      </Modal>
    </>
  );
}

/**
 * UserDetailsModal - Displays detailed user information
 */
function UserDetailsModal({ user }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUserTier = (totalSpent) => {
    if (totalSpent >= 15000) return { name: 'Diamond', color: 'text-blue-400', bg: 'bg-blue-500/10' };
    if (totalSpent >= 5000) return { name: 'Gold', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    if (totalSpent >= 1000) return { name: 'Silver', color: 'text-gray-400', bg: 'bg-gray-500/10' };
    return { name: 'Bronze', color: 'text-amber-600', bg: 'bg-amber-500/10' };
  };

  const tier = getUserTier(user.totalSpent);

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{user.username}</h3>
          <p className="text-sm text-zinc-400">Discord ID: {user.discordId}</p>
          <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium mt-2 ${tier.bg} ${tier.color}`}>
            {tier.name} Member
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-2xl font-bold text-white">{user.credits.toLocaleString()}</div>
          <div className="text-xs text-zinc-400">Current Credits</div>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-2xl font-bold text-green-400">${user.totalWon.toLocaleString()}</div>
          <div className="text-xs text-zinc-400">Total Won</div>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-2xl font-bold text-red-400">${user.totalSpent.toLocaleString()}</div>
          <div className="text-xs text-zinc-400">Total Spent</div>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">${(user.totalWon - user.totalSpent).toLocaleString()}</div>
          <div className="text-xs text-zinc-400">Net Profit</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-zinc-700">
          <span className="text-zinc-400">Join Date</span>
          <span className="text-white">{formatDate(user.joinDate)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-700">
          <span className="text-zinc-400">Last Active</span>
          <span className="text-white">{formatDate(user.lastActive)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button className="btn btn--accent flex-1">Adjust Credits</button>
        <button className="btn btn--ghost">View History</button>
        <button className="btn btn--ghost">Send Message</button>
      </div>
    </div>
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

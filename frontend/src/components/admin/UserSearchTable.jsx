import { useState } from 'react';
import Input from '@/components/ui/Input.jsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import ErrorMessage from '@/components/ui/ErrorMessage.jsx';
import { mockUsers } from '@/data/mockData.js';

/**
 * UserSearchTable Component - Handles user search and display
 * @param {Object} props
 * @param {Function} [props.onUserSelect] - Callback when user is selected
 * @param {Function} [props.onCreditAdjust] - Callback for credit adjustments
 */
export default function UserSearchTable({ onUserSelect, onCreditAdjust }) {
  const [userSearch, setUserSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adjustingCredits, setAdjustingCredits] = useState({});

  // Filter users based on search
  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.discordId.includes(userSearch)
  );

  const handleCreditAdjustment = async (userId, amount, operation) => {
    setAdjustingCredits(prev => ({ ...prev, [userId]: true }));
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be an API call
      if (onCreditAdjust) {
        onCreditAdjust(userId, amount, operation);
      }
      
      console.log(`${operation} ${amount} credits for user ${userId}`);
    } catch (err) {
      setError(`Failed to adjust credits: ${err.message}`);
    } finally {
      setAdjustingCredits(prev => ({ ...prev, [userId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getUserTier = (totalSpent) => {
    if (totalSpent >= 15000) return { name: 'Diamond', color: 'text-blue-400' };
    if (totalSpent >= 5000) return { name: 'Gold', color: 'text-yellow-400' };
    if (totalSpent >= 1000) return { name: 'Silver', color: 'text-gray-400' };
    return { name: 'Bronze', color: 'text-amber-600' };
  };

  return (
  <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-white">User Management</h3>
      
      <div className="mb-4">
        <Input
          value={userSearch}
          onChange={e => setUserSearch(e.target.value)}
          placeholder="Search by username or Discord ID..."
          className="mb-3"
        />
        
        {loading && <LoadingSpinner text="Searching users..." />}
        {error && <ErrorMessage message={error} onDismiss={() => setError("")} />}
      </div>

      <div className="overflow-x-auto">
  <table className="min-w-full w-full text-sm align-middle table-fixed">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="py-2 px-2 text-left text-zinc-300 w-1/5">Username</th>
              <th className="py-2 px-2 text-left text-zinc-300 w-1/6">Credits</th>
              <th className="py-2 px-2 text-left text-zinc-300 w-1/6">Tier</th>
              <th className="py-2 px-2 text-left text-zinc-300 w-1/6">Total Spent</th>
              <th className="py-2 px-2 text-left text-zinc-300 w-1/6">Last Active</th>
              <th className="py-2 px-2 text-left text-zinc-300 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-zinc-500">
                  {userSearch ? 'No users found matching your search.' : 'No users to display.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => {
                const tier = getUserTier(user.totalSpent);
                const isAdjusting = adjustingCredits[user.id];
                
                return (
                  <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 align-middle">
                    <td className="py-2 px-3 align-middle">
                      <div className="flex flex-col gap-0.5 break-words">
                        <span className="font-medium text-white leading-tight">{user.username}</span>
                        <span className="text-xs text-zinc-400 leading-tight">{user.discordId}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 align-middle text-zinc-300 text-right font-normal whitespace-nowrap" style={{verticalAlign: 'middle'}}>{user.credits.toLocaleString()}</td>
                    {/* ...existing code... */}
                    <td className="py-2 px-3 align-middle">
                      <span className={`text-xs font-medium ${tier.color}`}>{tier.name}</span>
                    </td>
                    <td className="py-2 px-2 align-middle text-zinc-300 text-right font-normal whitespace-nowrap" style={{verticalAlign: 'middle'}}>${user.totalSpent.toLocaleString()}</td>
                    {/* ...existing code... */}
                    <td className="py-2 px-3 align-middle text-zinc-400 text-xs text-center">{formatDate(user.lastActive)}</td>
                    {/* ...existing code... */}
                    <td className="py-2 px-3 align-middle">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2 justify-center items-center">
                        {isAdjusting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <button
                              onClick={() => handleCreditAdjustment(user.id, 100, 'add')}
                              className="px-2 py-1 text-xs bg-green-700 hover:bg-green-600 rounded text-white transition-colors min-w-[48px]"
                              title="Add 100 credits"
                            >
                              +100
                            </button>
                            <button
                              onClick={() => handleCreditAdjustment(user.id, 100, 'subtract')}
                              className="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded text-white transition-colors min-w-[48px]"
                              title="Remove 100 credits"
                            >
                              -100
                            </button>
                            {onUserSelect && (
                              <button
                                onClick={() => onUserSelect(user)}
                                className="px-2 py-1 text-xs bg-blue-700 hover:bg-blue-600 rounded text-white transition-colors min-w-[48px]"
                                title="View details"
                              >
                                View
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length > 0 && (
        <div className="mt-4 text-xs text-zinc-400">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </div>
      )}
    </div>
  );
}
/**
 * Mock data for the application
 * This file contains expanded dummy data for development and testing
 */

export const mockUsers = [
  { 
    id: 1,
    username: "dyhr", 
    credits: 1250, 
    discordId: "344538646457876481",
    lastActive: "2024-01-15T10:30:00Z",
    totalSpent: 5400,
    totalWon: 8200,
    joinDate: "2023-06-15"
  },
  { 
    id: 2,
    username: "admin1", 
    credits: 750, 
    discordId: "720053524620378134",
    lastActive: "2024-01-14T15:45:00Z",
    totalSpent: 2100,
    totalWon: 1800,
    joinDate: "2023-08-22"
  },
  { 
    id: 3,
    username: "minty_player", 
    credits: 2100, 
    discordId: "303898072860065792",
    lastActive: "2024-01-15T09:15:00Z",
    totalSpent: 8900,
    totalWon: 12400,
    joinDate: "2023-05-10"
  },
  { 
    id: 4,
    username: "luckystriker", 
    credits: 450, 
    discordId: "445512378903456789",
    lastActive: "2024-01-13T18:20:00Z",
    totalSpent: 1200,
    totalWon: 3400,
    joinDate: "2023-11-03"
  },
  { 
    id: 5,
    username: "casino_king", 
    credits: 3200, 
    discordId: "556789012345678901",
    lastActive: "2024-01-15T11:45:00Z",
    totalSpent: 15600,
    totalWon: 18200,
    joinDate: "2023-04-18"
  },
  { 
    id: 6,
    username: "newbie123", 
    credits: 100, 
    discordId: "667890123456789012",
    lastActive: "2024-01-12T14:30:00Z",
    totalSpent: 200,
    totalWon: 150,
    joinDate: "2024-01-10"
  }
];

export const mockRaffles = [
  {
    id: 'raff-1',
    kind: 'Raffle',
    title: '$100,000 Ticket — Big Pot',
    description: 'Weekly big pot raffle with massive payout',
    badge: '$100k / ticket',
    max: 1000,
    value: 412,
    ticketPrice: 50,
    endDate: '2024-01-20T18:00:00Z',
    status: 'active',
    createdBy: 'admin1',
    prizes: ['$100,000 Cash', '$25,000 Bonus', '$10,000 Credits']
  },
  {
    id: 'raff-2',
    kind: 'Spin',
    title: 'Daily Spin — up to $5m',
    description: 'Instant win wheel with varying payouts',
    badge: 'up to $5m',
    max: 500,
    value: 127,
    ticketPrice: 25,
    endDate: '2024-01-16T23:59:59Z',
    status: 'active',
    createdBy: 'dyhr',
    prizes: ['$5,000,000 Jackpot', '$1,000,000', '$500,000', '$100,000']
  },
  {
    id: 'raff-3',
    kind: 'Raffle',
    title: 'Items Bundle — Rare Collectibles',
    description: 'Exclusive items not available in regular shops',
    badge: 'Rare Items',
    max: 200,
    value: 89,
    ticketPrice: 15,
    endDate: '2024-01-25T12:00:00Z',
    status: 'active',
    createdBy: 'admin1',
    prizes: ['Golden Plushie', 'Faction Honour Crown', 'Special Medal']
  },
  {
    id: 'raff-4',
    kind: 'Flash',
    title: 'Flash Sale — Quick Win',
    description: 'Limited time flash raffle ending soon',
    badge: 'Ending Soon',
    max: 100,
    value: 78,
    ticketPrice: 10,
    endDate: '2024-01-16T15:30:00Z',
    status: 'ending_soon',
    createdBy: 'casino_king',
    prizes: ['$50,000 Cash', '$20,000 Bonus']
  }
];

export const mockWinners = [
  { 
    id: 1,
    when: 'Today, 18:42', 
    name: 'Minty_Minxy', 
    xid: '1927218', 
    prize: '$5,000,000', 
    raffle: 'Spin — up to $5m',
    raffleId: 'raff-2',
    timestamp: '2024-01-15T18:42:00Z'
  },
  { 
    id: 2,
    when: 'Today, 16:15', 
    name: 'luckystriker', 
    xid: '3461692', 
    prize: 'Faction Honour Crown', 
    raffle: 'Items Bundle — Rare Collectibles',
    raffleId: 'raff-3',
    timestamp: '2024-01-15T16:15:00Z'
  },
  { 
    id: 3,
    when: 'Yesterday, 22:30', 
    name: 'casino_king', 
    xid: '3320707', 
    prize: '$100,000', 
    raffle: '$100,000 Ticket — Big Pot',
    raffleId: 'raff-1',
    timestamp: '2024-01-14T22:30:00Z'
  },
  { 
    id: 4,
    when: 'Yesterday, 14:45', 
    name: 'dyhr', 
    xid: '2277924', 
    prize: '$25,000', 
    raffle: 'Flash Sale — Quick Win',
    raffleId: 'raff-4',
    timestamp: '2024-01-14T14:45:00Z'
  },
  { 
    id: 5,
    when: '2 days ago', 
    name: 'newbie123', 
    xid: '4567890', 
    prize: 'Golden Plushie', 
    raffle: 'Items Bundle — Rare Collectibles',
    raffleId: 'raff-3',
    timestamp: '2024-01-13T11:20:00Z'
  },
  { 
    id: 6,
    when: '3 days ago', 
    name: 'minty_player', 
    xid: '5678901', 
    prize: '$500,000', 
    raffle: 'Spin — up to $5m',
    raffleId: 'raff-2',
    timestamp: '2024-01-12T19:05:00Z'
  }
];

export const mockTransactions = [
  {
    id: 1,
    userId: 1,
    username: 'dyhr',
    type: 'raffle_entry',
    amount: -50,
    description: 'Entered Big Pot Raffle',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    userId: 3,
    username: 'minty_player',
    type: 'win',
    amount: +5000000,
    description: 'Won Daily Spin Jackpot',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    userId: 2,
    username: 'admin1',
    type: 'promo_redeem',
    amount: +100,
    description: 'Redeemed promo code FREE100',
    timestamp: '2024-01-14T15:45:00Z'
  }
];

export const raffleTiers = [
  { name: 'Bronze', minSpent: 0, maxSpent: 1000, color: 'bg-amber-600' },
  { name: 'Silver', minSpent: 1000, maxSpent: 5000, color: 'bg-gray-400' },
  { name: 'Gold', minSpent: 5000, maxSpent: 15000, color: 'bg-yellow-500' },
  { name: 'Diamond', minSpent: 15000, maxSpent: Infinity, color: 'bg-blue-400' }
];
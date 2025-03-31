import React, { useState } from 'react';
import { BarChart, Users, FileText, AlertTriangle, TrendingUp, CheckCircle2, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, BellRing, Shield, LineChart, PieChart, Activity, Calendar, Settings, ChevronRight } from 'lucide-react';
import { WalletConnect } from '../components/walletConnect';
import { Chat } from '../components/Chat';

const stats = [
  { name: 'Credit Score', value: '750', icon: BarChart, change: '+5', changeType: 'increase', color: 'blue', trend: [65, 70, 72, 68, 74, 75] },
  { name: 'Documents Verified', value: '8/10', icon: FileText, change: '2 pending', changeType: 'neutral', color: 'purple', trend: [5, 6, 7, 7, 8, 8] },
  { name: 'Risk Profile', value: 'Moderate', icon: AlertTriangle, change: 'Updated', changeType: 'neutral', color: 'amber', trend: [3, 2, 3, 2, 2, 2] },
  { name: 'Connected Advisors', value: '2', icon: Users, change: '+1', changeType: 'increase', color: 'green', trend: [1, 1, 1, 2, 2, 2] },
];

const portfolioData = {
  totalValue: '$125,000',
  monthlyChange: '+5.2%',
  isPositive: true,
  allocation: [
    { name: 'Stocks', value: 60, color: 'bg-blue-500' },
    { name: 'Bonds', value: 25, color: 'bg-green-500' },
    { name: 'Cash', value: 10, color: 'bg-yellow-500' },
    { name: 'Other', value: 5, color: 'bg-purple-500' },
  ],
  performance: [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 105 },
    { month: 'Mar', value: 102 },
    { month: 'Apr', value: 108 },
    { month: 'May', value: 115 },
    { month: 'Jun', value: 120 },
  ],
};

const recentActivity = [
  { id: 1, type: 'Document Upload', status: 'pending', date: '2024-03-10', icon: FileText, description: 'Income verification documents uploaded' },
  { id: 2, type: 'KYC Verification', status: 'completed', date: '2024-03-09', icon: CheckCircle2, description: 'Identity verification completed successfully' },
  { id: 3, type: 'Advisor Connection', status: 'completed', date: '2024-03-08', icon: Users, description: 'Connected with Financial Advisor Sarah Smith' },
  { id: 4, type: 'Portfolio Update', status: 'completed', date: '2024-03-07', icon: LineChart, description: 'Portfolio rebalancing completed' },
];

const upcomingTasks = [
  { id: 1, task: 'Quarterly Portfolio Review', date: '2024-03-20', priority: 'high' },
  { id: 2, task: 'Tax Document Submission', date: '2024-03-25', priority: 'medium' },
  { id: 3, task: 'Risk Assessment Update', date: '2024-04-01', priority: 'low' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getIconColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'text-blue-500';
    case 'purple':
      return 'text-purple-500';
    case 'amber':
      return 'text-amber-500';
    case 'green':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const MiniChart: React.FC<{ data: number[], height: number, color: string }> = ({ data, height, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  return (
    <div className="flex items-end space-x-1" style={{ height: `${height}px` }}>
      {data.map((value, index) => {
        const heightPercent = ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className={`w-1 ${color} opacity-75`}
            style={{ height: `${heightPercent}%` }}
          />
        );
      })}
    </div>
  );
};

// Mock data for portfolio performance
const portfolioPerformance = [
  { date: '2024-01', value: 10000 },
  { date: '2024-02', value: 10500 },
  { date: '2024-03', value: 10800 },
  { date: '2024-04', value: 11200 },
  { date: '2024-05', value: 11500 },
  { date: '2024-06', value: 12000 },
];

// Mock data for asset allocation
const assetAllocation = [
  { name: 'Stellar (XLM)', value: 40, color: '#4C4C9D' },
  { name: 'USDC', value: 30, color: '#2774AE' },
  { name: 'Other Assets', value: 30, color: '#6B7280' },
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 1,
    type: 'Deposit',
    amount: '+1,000 XLM',
    date: '2024-06-15',
    status: 'completed',
    icon: ArrowUpRight,
  },
  {
    id: 2,
    type: 'Withdrawal',
    amount: '-500 USDC',
    date: '2024-06-14',
    status: 'completed',
    icon: ArrowDownRight,
  },
  {
    id: 3,
    type: 'Swap',
    amount: '100 XLM → 25 USDC',
    date: '2024-06-13',
    status: 'completed',
    icon: TrendingUp,
  },
];

// Mock data for market overview
const marketOverview = [
  {
    name: 'XLM/USD',
    price: '$0.12',
    change: '+2.5%',
    trend: 'up',
  },
  {
    name: 'USDC/USD',
    price: '$1.00',
    change: '0%',
    trend: 'neutral',
  },
  {
    name: 'BTC/USD',
    price: '$65,000',
    change: '+1.2%',
    trend: 'up',
  },
];

export const Dashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [connectedAddress, setConnectedAddress] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState<{
    id: string;
    name: string;
    role: 'advisor';
  } | null>(null);

  const handleAddressChange = (address: string) => {
    setConnectedAddress(address);
    console.log('Wallet address changed:', address);
  };

  // Mock data for connected advisors
  const connectedAdvisors = [
    { id: '1', name: 'Sarah Smith', role: 'advisor' as const },
    { id: '2', name: 'John Doe', role: 'advisor' as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Stellar Finance</h1>
            </div>
            <div className="flex items-center space-x-4">
              <WalletConnect onAddressChange={handleAddressChange} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="mt-2 text-blue-100">
              Here's an overview of your financial passport. Your portfolio is performing well!
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                View Portfolio Details
              </button>
              <button className="bg-white/10 hover:bg-white/20 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                Schedule Review
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Value */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Portfolio Value</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedTimeframe('1M')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTimeframe === '1M'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  1M
                </button>
                <button
                  onClick={() => setSelectedTimeframe('3M')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTimeframe === '3M'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  3M
                </button>
                <button
                  onClick={() => setSelectedTimeframe('6M')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTimeframe === '6M'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  6M
                </button>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">$12,000</span>
              <span className="ml-2 text-green-600 text-sm font-medium">+5.2%</span>
            </div>
            <div className="mt-4 h-32">
              {/* Add portfolio chart here */}
              <div className="w-full h-full bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h2>
            <div className="space-y-4">
              {assetAllocation.map((asset) => (
                <div key={asset.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{asset.name}</span>
                    <span className="text-sm font-medium text-gray-900">{asset.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${asset.value}%`, backgroundColor: asset.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Overview */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h2>
            <div className="space-y-4">
              {marketOverview.map((market) => (
                <div key={market.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{market.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{market.price}</span>
                    <span
                      className={`text-sm font-medium ${
                        market.trend === 'up'
                          ? 'text-green-600'
                          : market.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {market.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <transaction.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Transactions
              </button>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        task.priority === 'high' ? 'bg-red-100' :
                        task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <BellRing className={`h-5 w-5 ${
                          task.priority === 'high' ? 'text-red-600' :
                          task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {new Date(task.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Tasks
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Advisors List */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Connected Advisors</h3>
                <p className="text-sm text-gray-500">Chat with your financial advisors</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedAdvisor(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                selectedAdvisor ? 'rotate-90' : ''
              }`} />
            </button>
          </div>
          
          <div className="space-y-3">
            {connectedAdvisors.map((advisor) => (
              <button
                key={advisor.id}
                onClick={() => setSelectedAdvisor(advisor)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  selectedAdvisor?.id === advisor.id
                    ? 'bg-blue-50 border border-blue-100'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${
                      selectedAdvisor?.id === advisor.id ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {advisor.name}
                    </p>
                    <p className="text-sm text-gray-500">Financial Advisor</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 ${
                  selectedAdvisor?.id === advisor.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <span className="text-xs font-medium">Chat</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <Users className="h-4 w-4" />
              <span>Find More Advisors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      {selectedAdvisor && (
        <Chat
          currentUser={{
            id: 'user-1',
            name: 'Current User',
            role: 'user',
          }}
          otherUser={selectedAdvisor}
        />
      )}
    </div>
  );
};
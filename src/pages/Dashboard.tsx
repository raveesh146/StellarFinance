import React, { useState } from 'react';
import { BarChart, Users, FileText, AlertTriangle, TrendingUp, CheckCircle2, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, BellRing, Shield, LineChart } from 'lucide-react';
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${getIconColor(stat.color)}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'increase'
                              ? 'text-green-600'
                              : stat.changeType === 'decrease'
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {stat.changeType === 'increase' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : stat.changeType === 'decrease' ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : null}
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <MiniChart
                    data={stat.trend}
                    height={40}
                    color={getIconColor(stat.color)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Section */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Portfolio Overview</h2>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {portfolioData.totalValue}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly Change</p>
                <p
                  className={`text-2xl font-semibold ${
                    portfolioData.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {portfolioData.monthlyChange}
                </p>
              </div>
            </div>
            {/* Add portfolio chart here */}
          </div>
        </div>

        {/* Recent Activity and Upcoming Tasks */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, index) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {index !== recentActivity.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                getStatusColor(activity.status)
                              }`}
                            >
                              <activity.icon className="h-5 w-5" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {activity.type}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activity.date}>
                                {new Date(activity.date).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Tasks</h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {upcomingTasks.map((task) => (
                    <li key={task.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {task.task}
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: {new Date(task.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Component */}
      {selectedAdvisor && (
        <Chat
          currentUser={{
            id: 'user-1', // Replace with actual user ID
            name: 'Current User', // Replace with actual user name
            role: 'user',
          }}
          otherUser={selectedAdvisor}
        />
      )}

      {/* Advisors List */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Connected Advisors</h3>
          <div className="space-y-2">
            {connectedAdvisors.map((advisor) => (
              <button
                key={advisor.id}
                onClick={() => setSelectedAdvisor(advisor)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  selectedAdvisor?.id === advisor.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                {advisor.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
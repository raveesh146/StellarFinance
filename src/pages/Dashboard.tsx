import React, { useState } from 'react';
import { BarChart, Users, FileText, AlertTriangle, TrendingUp, CheckCircle2, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, BellRing, Shield, LineChart } from 'lucide-react';
import { WalletConnect } from '../components/walletConnect';

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

  const handleAddressChange = (address: string) => {
    setConnectedAddress(address);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Wallet Connect - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <WalletConnect onAddressChange={handleAddressChange} />
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Total Assets Under Management</p>
            </div>
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
              <button
                onClick={() => setSelectedTimeframe('1Y')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedTimeframe === '1Y'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                1Y
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <h3 className="text-2xl font-bold text-gray-900">{portfolioData.totalValue}</h3>
                </div>
                <div className={`flex items-center ${portfolioData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {portfolioData.isPositive ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  <span className="ml-1 text-sm font-medium">{portfolioData.monthlyChange}</span>
                </div>
              </div>
            </div>
            {portfolioData.allocation.map((item, index) => (
              <div key={item.name} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">{item.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{item.value}%</h3>
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${getIconColor(stat.color)} bg-opacity-10`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="h-16">
                  <MiniChart data={stat.trend} height={16} color={getIconColor(stat.color)} />
                </div>
              </div>
              <div className="mt-4">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="mt-1 flex items-baseline justify-between">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-gray-50">
                        <activity.icon className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.date}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusColor(activity.status)
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-lg ${
                        task.priority === 'high' ? 'bg-red-50' :
                        task.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                      }`}>
                        <BellRing className={`h-5 w-5 ${
                          task.priority === 'high' ? 'text-red-500' :
                          task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {task.date}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getPriorityColor(task.priority)
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 py-4 bg-gray-50">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2" />
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
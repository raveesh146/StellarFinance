import React from 'react';
import { BarChart, Users, FileText, AlertTriangle, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  { name: 'Credit Score', value: '750', icon: BarChart, change: '+5', changeType: 'increase', color: 'blue' },
  { name: 'Documents Verified', value: '8/10', icon: FileText, change: '2 pending', changeType: 'neutral', color: 'purple' },
  { name: 'Risk Profile', value: 'Moderate', icon: AlertTriangle, change: 'Updated', changeType: 'neutral', color: 'amber' },
  { name: 'Connected Advisors', value: '2', icon: Users, change: '+1', changeType: 'increase', color: 'green' },
];

const recentActivity = [
  { id: 1, type: 'Document Upload', status: 'pending', date: '2024-03-10', icon: FileText },
  { id: 2, type: 'KYC Verification', status: 'completed', date: '2024-03-09', icon: CheckCircle2 },
  { id: 3, type: 'Advisor Connection', status: 'completed', date: '2024-03-08', icon: Users },
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

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-blue-100">
          Here's an overview of your financial passport.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${getIconColor(stat.color)} bg-opacity-10`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
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
          </div>
        ))}
      </div>

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
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
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
    </div>
  );
};
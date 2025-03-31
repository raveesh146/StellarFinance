import React, { useState } from 'react';
import { 
  Users, 
  LineChart, 
  DollarSign, 
  Calendar, 
  BellRing, 
  ChevronRight,
  MessageSquare,
  UserPlus,
  BarChart,
  PieChart,
  Activity,
  Settings,
  Search,
  Filter,
  Star,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { WalletConnect } from '../components/walletConnect';
import { Chat } from '../components/Chat';

// Mock data for advisor stats
const advisorStats = [
  { name: 'Total Clients', value: '24', change: '+3', changeType: 'increase', icon: Users, color: 'blue' },
  { name: 'Active Portfolios', value: '18', change: '2 pending', changeType: 'neutral', icon: PieChart, color: 'purple' },
  { name: 'AUM', value: '$2.4M', change: '+12.5%', changeType: 'increase', icon: DollarSign, color: 'green' },
  { name: 'Client Satisfaction', value: '4.8/5', change: '+0.2', changeType: 'increase', icon: Star, color: 'amber' },
];

// Mock data for recent client activities
const recentActivities = [
  {
    id: 1,
    client: 'John Smith',
    type: 'Portfolio Review',
    date: '2024-03-15',
    status: 'completed',
    icon: LineChart,
  },
  {
    id: 2,
    client: 'Sarah Johnson',
    type: 'Risk Assessment',
    date: '2024-03-14',
    status: 'pending',
    icon: Activity,
  },
  {
    id: 3,
    client: 'Michael Brown',
    type: 'Investment Plan',
    date: '2024-03-13',
    status: 'completed',
    icon: PieChart,
  },
];

// Mock data for upcoming meetings
const upcomingMeetings = [
  {
    id: 1,
    client: 'John Smith',
    type: 'Quarterly Review',
    date: '2024-03-20',
    time: '10:00 AM',
    priority: 'high',
  },
  {
    id: 2,
    client: 'Sarah Johnson',
    type: 'Initial Consultation',
    date: '2024-03-22',
    time: '2:30 PM',
    priority: 'medium',
  },
  {
    id: 3,
    client: 'Michael Brown',
    type: 'Portfolio Update',
    date: '2024-03-25',
    time: '11:00 AM',
    priority: 'low',
  },
];

// Mock data for connected clients
const connectedClients = [
  { 
    id: '1', 
    name: 'John Smith', 
    role: 'client',
    portfolioValue: '$250,000',
    lastContact: '2 days ago',
    status: 'active',
    avatar: 'JS'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    role: 'client',
    portfolioValue: '$180,000',
    lastContact: '1 week ago',
    status: 'active',
    avatar: 'SJ'
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    role: 'client',
    portfolioValue: '$320,000',
    lastContact: '3 days ago',
    status: 'pending',
    avatar: 'MB'
  },
];

export const AdvisorDashboard: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<{
    id: string;
    name: string;
    role: 'client';
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddressChange = (address: string) => {
    console.log('Wallet address changed:', address);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Advisor Dashboard</h1>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
                <p className="mt-2 text-blue-100">
                  Here's an overview of your client portfolio and upcoming activities.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-white/20 hover:bg-white/30 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Add New Client</span>
                </button>
                <button className="bg-white/10 hover:bg-white/20 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {advisorStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-2xl p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' :
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <activity.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.client}</p>
                          <p className="text-sm text-gray-500">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          meeting.priority === 'high' ? 'bg-red-100' :
                          meeting.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          <Calendar className={`h-5 w-5 ${
                            meeting.priority === 'high' ? 'text-red-600' :
                            meeting.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{meeting.client}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {meeting.time}
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(meeting.priority)}`}>
                        {meeting.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clients List */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-96 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Connected Clients</h3>
                <p className="text-sm text-gray-500">Chat with your clients</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedClient(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                selectedClient ? 'rotate-90' : ''
              }`} />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-4 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  filterStatus === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  filterStatus === 'active'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  filterStatus === 'pending'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {connectedClients.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient({
                  id: client.id,
                  name: client.name,
                  role: "client"
                })}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  selectedClient?.id === client.id
                    ? 'bg-blue-50 border border-blue-100'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {client.avatar}
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${
                      selectedClient?.id === client.id ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {client.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{client.portfolioValue}</span>
                      <span>•</span>
                      <span>{client.lastContact}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                  <ChevronRight className={`h-4 w-4 ${
                    selectedClient?.id === client.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <UserPlus className="h-4 w-4" />
              <span>Add New Client</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      {selectedClient && (
        <Chat
          currentUser={{
            id: 'advisor-1',
            name: 'Sarah Smith',
            role: 'user',
          }}
          otherUser={selectedClient}
        />
      )}
    </div>
  );
};
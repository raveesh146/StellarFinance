import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  BarChart, 
  Settings, 
  Search, 
  Filter,
  Star,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronRight,
  Building2,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Activity,
  PieChart,
  DollarSign,
  Calendar,
  BellRing
} from 'lucide-react';
import { WalletConnect } from '../components/walletConnect';

// Mock data for admin stats
const adminStats = [
  { name: 'Total Users', value: '156', change: '+12', changeType: 'increase', icon: Users, color: 'blue' },
  { name: 'Active Advisors', value: '24', change: '+3', changeType: 'increase', icon: Shield, color: 'green' },
  { name: 'Total AUM', value: '$12.4M', change: '+8.5%', changeType: 'increase', icon: DollarSign, color: 'purple' },
  { name: 'Platform Revenue', value: '$124K', change: '+15.2%', changeType: 'increase', icon: CreditCard, color: 'amber' },
];

// Mock data for advisors
const advisors = [
  {
    id: '1',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    experience: '8 years',
    clients: 24,
    aum: '$2.4M',
    rating: 4.8,
    status: 'active',
    specialization: ['Wealth Management', 'Retirement Planning'],
    education: 'MBA in Finance',
    certifications: ['CFA', 'CFP'],
    avatar: 'SS'
  },
  {
    id: '2',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    experience: '12 years',
    clients: 32,
    aum: '$3.2M',
    rating: 4.9,
    status: 'active',
    specialization: ['Investment Management', 'Tax Planning'],
    education: 'MS in Financial Engineering',
    certifications: ['CFA', 'CPA'],
    avatar: 'MJ'
  },
  {
    id: '3',
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    experience: '5 years',
    clients: 18,
    aum: '$1.8M',
    rating: 4.7,
    status: 'pending',
    specialization: ['Estate Planning', 'Risk Management'],
    education: 'BS in Finance',
    certifications: ['CFP'],
    avatar: 'EB'
  },
];

// Mock data for users
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    portfolioValue: '$250,000',
    advisor: 'Sarah Smith',
    status: 'active',
    lastLogin: '2 hours ago',
    accountType: 'Premium',
    avatar: 'JD'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    portfolioValue: '$180,000',
    advisor: 'Michael Johnson',
    status: 'active',
    lastLogin: '1 day ago',
    accountType: 'Standard',
    avatar: 'JS'
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    portfolioValue: '$320,000',
    advisor: 'Emily Brown',
    status: 'inactive',
    lastLogin: '2 weeks ago',
    accountType: 'Premium',
    avatar: 'RW'
  },
];

export const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'advisors' | 'users'>('advisors');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
                <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
                <p className="mt-2 text-blue-100">
                  Manage your platform's advisors and users
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-white/20 hover:bg-white/30 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Add New {selectedTab === 'advisors' ? 'Advisor' : 'User'}</span>
                </button>
                <button className="bg-white/10 hover:bg-white/20 transition-colors duration-200 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Platform Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {adminStats.map((stat) => (
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

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setSelectedTab('advisors')}
                className={`${
                  selectedTab === 'advisors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Financial Advisors
              </button>
              <button
                onClick={() => setSelectedTab('users')}
                className={`${
                  selectedTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Users
              </button>
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${selectedTab}...`}
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
          </div>

          {/* Content */}
          <div className="divide-y divide-gray-200">
            {selectedTab === 'advisors' ? (
              advisors.map((advisor) => (
                <div key={advisor.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                        {advisor.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{advisor.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {advisor.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {advisor.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {advisor.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium">{advisor.rating}</span>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(advisor.status)}`}>
                          {advisor.status}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{advisor.clients} Clients</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{advisor.aum} AUM</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{advisor.experience} Experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{advisor.education}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{advisor.certifications.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              users.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                        {user.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {user.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{user.accountType}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{user.portfolioValue} Portfolio Value</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Advisor: {user.advisor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Last Login: {user.lastLogin}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
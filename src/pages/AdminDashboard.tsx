import React, { useState } from 'react';
import { Users, Shield, Settings, AlertTriangle, CheckCircle, XCircle, X, Trash2, Edit } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  role: 'user' | 'advisor';
  kycStatus: 'verified' | 'pending' | 'rejected';
}

interface NewUser {
  name: string;
  email: string;
  role: 'user' | 'advisor';
}

export const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('users');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    role: 'user'
  });

  // Move users to state
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'user', kycStatus: 'verified' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending', role: 'advisor', kycStatus: 'pending' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', role: 'user', kycStatus: 'rejected' },
  ]);

  const systemStats = {
    totalUsers: users.length, // Update to use actual users length
    pendingKYC: users.filter(u => u.kycStatus === 'pending').length, // Calculate from users
    activeAdvisors: users.filter(u => u.role === 'advisor' && u.status === 'active').length, // Calculate from users
    systemHealth: 'Optimal',
  };

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'High system load detected', timestamp: '2024-03-15 14:30' },
    { id: 2, type: 'error', message: 'Failed login attempts from IP 192.168.1.1', timestamp: '2024-03-15 13:45' },
    { id: 3, type: 'success', message: 'System backup completed successfully', timestamp: '2024-03-15 12:00' },
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new user object with default values
    const newUserData: User = {
      id: users.length + 1, // Simple ID generation
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'pending', // Default status
      kycStatus: 'pending', // Default KYC status
    };

    // Update users list
    setUsers(prevUsers => [...prevUsers, newUserData]);
    
    // Close modal and reset form
    setIsAddUserModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user'
    });
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === selectedUser.id
          ? {
              ...selectedUser,
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role,
            }
          : user
      )
    );

    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage system settings, users, and monitor platform activity
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{systemStats.totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Pending KYC</p>
                <p className="text-2xl font-semibold text-gray-900">{systemStats.pendingKYC}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Active Advisors</p>
                <p className="text-2xl font-semibold text-gray-900">{systemStats.activeAdvisors}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">System Health</p>
                <p className="text-2xl font-semibold text-gray-900">{systemStats.systemHealth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setSelectedTab('users')}
              className={`${
                selectedTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Users Management
            </button>
            <button
              onClick={() => setSelectedTab('alerts')}
              className={`${
                selectedTab === 'alerts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              System Alerts
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Users</h2>
                <button 
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add New User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        KYC Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.kycStatus === 'verified'
                              ? 'bg-green-100 text-green-800'
                              : user.kycStatus === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.kycStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <span className="mx-2">|</span>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add User Modal */}
              <Dialog
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                className="relative z-50"
              >
                {/* Background overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Modal position */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Add New User
                      </Dialog.Title>
                      <button
                        onClick={() => setIsAddUserModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddUser} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <select
                          id="role"
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'user' | 'advisor' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="user">User</option>
                          <option value="advisor">Advisor</option>
                        </select>
                      </div>

                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddUserModalOpen(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add User
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </div>
              </Dialog>

              {/* Edit User Modal */}
              <Dialog
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Edit User
                      </Dialog.Title>
                      <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {selectedUser && (
                      <form onSubmit={handleEditUser} className="space-y-4">
                        <div>
                          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="edit-name"
                            value={selectedUser.name}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            id="edit-email"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700">
                            Role
                          </label>
                          <select
                            id="edit-role"
                            value={selectedUser.role}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as 'user' | 'advisor' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="user">User</option>
                            <option value="advisor">Advisor</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <select
                            id="edit-status"
                            value={selectedUser.status}
                            onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as 'active' | 'pending' | 'inactive' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="edit-kyc" className="block text-sm font-medium text-gray-700">
                            KYC Status
                          </label>
                          <select
                            id="edit-kyc"
                            value={selectedUser.kycStatus}
                            onChange={(e) => setSelectedUser({ ...selectedUser, kycStatus: e.target.value as 'verified' | 'pending' | 'rejected' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    )}
                  </Dialog.Panel>
                </div>
              </Dialog>

              {/* Delete Confirmation Modal */}
              <Dialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Confirm Delete
                      </Dialog.Title>
                      <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteUser}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete User
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </div>
          )}

          {selectedTab === 'alerts' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h2>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    {alert.type === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                    {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-500">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
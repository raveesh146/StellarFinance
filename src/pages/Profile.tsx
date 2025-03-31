import React from 'react';
import { User, Mail, Phone, MapPin, Building } from 'lucide-react';

export const Profile: React.FC = () => {
  // Dummy profile data
  const profile = {
    name: 'Raveesh',
    email: 'raveesh.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    company: 'Tech Solutions Inc.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <img
              src={profile.avatar}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-500">Personal Account</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 flex items-center">
                <dt className="flex items-center w-1/4 text-sm font-medium text-gray-500">
                  <User className="h-5 w-5 mr-2" />
                  Full Name
                </dt>
                <dd className="text-sm text-gray-900">{profile.name}</dd>
              </div>

              <div className="py-4 flex items-center">
                <dt className="flex items-center w-1/4 text-sm font-medium text-gray-500">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </dt>
                <dd className="text-sm text-gray-900">{profile.email}</dd>
              </div>

              <div className="py-4 flex items-center">
                <dt className="flex items-center w-1/4 text-sm font-medium text-gray-500">
                  <Phone className="h-5 w-5 mr-2" />
                  Phone
                </dt>
                <dd className="text-sm text-gray-900">{profile.phone}</dd>
              </div>

              <div className="py-4 flex items-center">
                <dt className="flex items-center w-1/4 text-sm font-medium text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address
                </dt>
                <dd className="text-sm text-gray-900">{profile.address}</dd>
              </div>

              <div className="py-4 flex items-center">
                <dt className="flex items-center w-1/4 text-sm font-medium text-gray-500">
                  <Building className="h-5 w-5 mr-2" />
                  Company
                </dt>
                <dd className="text-sm text-gray-900">{profile.company}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
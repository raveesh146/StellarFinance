import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, User, Settings, LogOut, BarChart } from 'lucide-react';
import clsx from 'clsx';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={clsx(
      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
      active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50'
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Wallet className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold">Financial Passport</h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem
            to="/dashboard"
            icon={<BarChart className="h-5 w-5" />}
            label="Dashboard"
            active={location.pathname === '/dashboard'}
          />
          <NavItem
            to="/profile"
            icon={<User className="h-5 w-5" />}
            label="Profile"
            active={location.pathname === '/profile'}
          />
          <NavItem
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={location.pathname === '/settings'}
          />
        </nav>

        <div className="absolute bottom-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};
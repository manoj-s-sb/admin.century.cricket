'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Bell, User, LogOut, Menu, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogout = async () => {
    try {
      // Clear user data immediately for smoother UX
      localStorage.removeItem('user');
      // Redirect immediately without waiting for logout API
      window.location.href = '/login';
    } catch (error) {
      // Fallback: still redirect even if there's an error
      window.location.href = '/login';
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50 h-20">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left side - Mobile menu button and search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Search */}
          {/* <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members, workers, or lanes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-72 lg:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
            />
          </div> */}
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          {/* <button className="relative p-2.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button> */}

          {/* User menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-gray-900">{user?.username}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200",
                showUserMenu && "rotate-180"
              )} />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                {/* User info section */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{user?.username}</div>
                      <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Administrator</div>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 group"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors duration-150" />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 
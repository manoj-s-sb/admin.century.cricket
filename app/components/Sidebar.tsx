'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  UserCheck,
  X,
  Building2,
  CreditCard,
  FolderOpen
} from 'lucide-react';
import brand from '../../public/brand.svg';import Image from 'next/image';
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  // {
  //   title: 'Home',
  //   href: '/home',
  //   icon: LayoutDashboard,
  // },
  {
    title: 'Induction Bookings',
    href: '/inductions',
    icon: Users,
  },
  // {
  //   title: 'Lanes',
  //   href: '/lanes',
  //   icon: MapPin,
  // },
  // {
  //   title: 'Staff',
  //   href: '/staff',
  //   icon: UserCheck,
  // },
  // {
  //   title: 'Client Management',
  //   href: '/client-management',
  //   icon: Building2,
  // },
  // {
  //   title: 'Membership',
  //   href: '/membership',
  //   icon: CreditCard,
  // },
  // {
  //   title: 'Resource',
  //   href: '/resource',
  //   icon: FolderOpen,
  // },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-xl transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none lg:h-full",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200 ">
            <div className="flex-1 flex justify-center">
              <Image 
                src={brand} 
                alt="Admin Portal" 
                className="h-15 w-auto object-contain"
                width={96}
                height={96}
              />
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Close mobile sidebar when clicking a link
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600" 
                      : "bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100"
                  )} />
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 relative z-10 transition-transform duration-200",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700 group-hover:scale-110"
                  )} />
                  <span className="relative z-10 font-medium">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500 text-center">
              © 2025 Century Portal
            </div>
          </div>
      </div>
    </div>
  </>
);
}
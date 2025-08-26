import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Menu', path: '/menu' },
    { name: 'Profile', path: '/profile' },
    { name: 'Preview', path: '/preview' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded ${
                location.pathname === item.path
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>

          {/* Sidebar panel */}
          <div className="relative w-64 bg-gray-800 text-white p-4 z-50">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`px-3 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

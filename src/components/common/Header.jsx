import React from 'react';
import Button from './Button';

const Header = ({ title, showLogout = false, onLogout, onMenuClick }) => {
  return (
    <header className="bg-white shadow-md py-3 px-4 flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-3">
        {/* Hamburger only on mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={onMenuClick}
        >
          ☰
        </button>
        {/* <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1> */}
        <h1 className="text-xl md:text-2xl font-bold whitespace-normal break-words">
          {title}
        </h1>

      </div>

      {showLogout && (
        <div className="shrink-0">
          <Button variant="secondary" onClick={onLogout} className="text-sm px-3 py-1">
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;


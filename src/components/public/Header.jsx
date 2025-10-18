import React from 'react';

const Header = () => {
  return (
    <header className="pt-16 md:pt-24 pb-8 md:pb-10 text-center bg-brand-bg">
      <div className="max-w-4xl mx-auto px-8 sm:px-10">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-brand-text tracking-wider">
          The Zabbie
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-brand-accent tracking-widest uppercase font-sans">
          An Exquisite Culinary Experience
        </p>
        <div className="mt-8 md:mt-12 w-24 h-px bg-brand-accent mx-auto"></div>
      </div>
    </header>
  );
};

export default Header;
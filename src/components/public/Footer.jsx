import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-secondary-bg mt-16 py-12">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 text-center text-brand-text/70">
        <div className="w-20 h-px bg-brand-accent/50 mx-auto mb-8"></div>
        <p className="font-serif text-xl sm:text-2xl text-brand-text mb-3">The Zabbie</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} The Zabbie Restaurant. All Rights Reserved.</p>
        <p className="text-xs mt-2">Experience elegance, taste perfection.</p>
      </div>
    </footer>
  );
};

export default Footer;
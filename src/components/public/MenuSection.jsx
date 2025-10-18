import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ id, title, items }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-brand-text mb-7 md:mb-7">
        {title}
      </h2>
      <div className="max-w-3xl mx-auto">
        {items.map((item, index) => (
          <MenuItemCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
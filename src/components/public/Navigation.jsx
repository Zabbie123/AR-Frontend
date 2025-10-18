import React from 'react';

const Navigation = ({ categories }) => {
  console.log("catogroy", categories)
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80; // height of the sticky nav bar on larger screens
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-lg shadow-md shadow-brand-text/10">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        <div className="flex items-center justify-center h-16 sm:h-20">
          <div className="flex space-x-4 sm:space-x-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                onClick={(e) => scrollToSection(e, category.id)}
                className="font-sans text-brand-text hover:text-brand-accent transition-colors duration-300 text-sm sm:text-lg tracking-wider uppercase"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
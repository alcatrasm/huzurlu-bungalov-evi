
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-quicksand font-bold text-nature-500">
            <span className="text-earth-600">Huzurlu</span> Bungalov
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/bungalovlar">Bungalovlar</NavLink>
          <NavLink to="/hakkimizda">Hakkımızda</NavLink>
          <NavLink to="/galeri">Galeri</NavLink>
          <NavLink to="/iletisim">İletişim</NavLink>
        </nav>

        {/* Mobile navigation toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-nature-500 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white shadow-lg rounded-b-lg">
            <MobileNavLink to="/" onClick={toggleMenu}>Ana Sayfa</MobileNavLink>
            <MobileNavLink to="/bungalovlar" onClick={toggleMenu}>Bungalovlar</MobileNavLink>
            <MobileNavLink to="/hakkimizda" onClick={toggleMenu}>Hakkımızda</MobileNavLink>
            <MobileNavLink to="/galeri" onClick={toggleMenu}>Galeri</MobileNavLink>
            <MobileNavLink to="/iletisim" onClick={toggleMenu}>İletişim</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop navigation link
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="relative inline-block px-2 py-1 font-medium text-gray-800 hover:text-nature-500 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-nature-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left"
  >
    {children}
  </Link>
);

// Mobile navigation link
const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    to={to}
    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-nature-50 hover:text-nature-500 rounded-md"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;

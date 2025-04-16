
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

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

        {/* User menu for desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-nature-100 text-nature-800">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profil">Profilim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profil/rezervasyonlarim">Rezervasyonlarım</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/yonetim">Yönetim Paneli</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/giris">Giriş Yap</Link>
              </Button>
              <Button asChild className="bg-nature-500 hover:bg-nature-600">
                <Link to="/kayit">Kayıt Ol</Link>
              </Button>
            </>
          )}
        </div>

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
            
            <div className="border-t border-gray-200 my-2"></div>
            
            {user ? (
              <>
                <MobileNavLink to="/profil" onClick={toggleMenu}>
                  <User className="h-4 w-4 mr-2" />
                  Profilim
                </MobileNavLink>
                <MobileNavLink to="/profil/rezervasyonlarim" onClick={toggleMenu}>
                  Rezervasyonlarım
                </MobileNavLink>
                {isAdmin && (
                  <MobileNavLink to="/yonetim" onClick={toggleMenu}>
                    Yönetim Paneli
                  </MobileNavLink>
                )}
                <button 
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }} 
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/giris" onClick={toggleMenu}>Giriş Yap</MobileNavLink>
                <MobileNavLink to="/kayit" onClick={toggleMenu}>Kayıt Ol</MobileNavLink>
              </>
            )}
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
    className="flex items-center px-3 py-2 text-base font-medium text-gray-800 hover:bg-nature-50 hover:text-nature-500 rounded-md"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;

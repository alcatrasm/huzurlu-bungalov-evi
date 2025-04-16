
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Users, 
  CalendarRange,
  Settings,
  BedDouble
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 inset-x-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="p-6 border-b">
                  <Link to="/" className="flex items-center">
                    <span className="text-xl font-quicksand font-bold text-nature-500">
                      <span className="text-earth-600">Huzurlu</span> Bungalov
                    </span>
                  </Link>
                </div>
                
                <nav className="px-2 py-4">
                  <SidebarLink 
                    to="/yonetim" 
                    icon={<LayoutDashboard size={20} />} 
                    label="Dashboard" 
                    active={location.pathname === '/yonetim'} 
                    onClick={() => setOpen(false)}
                  />
                  <SidebarLink 
                    to="/yonetim/bungalovlar" 
                    icon={<BedDouble size={20} />} 
                    label="Bungalovlar" 
                    active={location.pathname.includes('/yonetim/bungalovlar')} 
                    onClick={() => setOpen(false)}
                  />
                  <SidebarLink 
                    to="/yonetim/rezervasyonlar" 
                    icon={<CalendarRange size={20} />} 
                    label="Rezervasyonlar" 
                    active={location.pathname.includes('/yonetim/rezervasyonlar')} 
                    onClick={() => setOpen(false)}
                  />
                  <SidebarLink 
                    to="/yonetim/kullanicilar" 
                    icon={<Users size={20} />} 
                    label="Kullanıcılar" 
                    active={location.pathname.includes('/yonetim/kullanicilar')} 
                    onClick={() => setOpen(false)}
                  />
                  <SidebarLink 
                    to="/yonetim/istatistikler" 
                    icon={<BarChart3 size={20} />} 
                    label="İstatistikler" 
                    active={location.pathname.includes('/yonetim/istatistikler')} 
                    onClick={() => setOpen(false)}
                  />
                  <SidebarLink 
                    to="/yonetim/ayarlar" 
                    icon={<Settings size={20} />} 
                    label="Ayarlar" 
                    active={location.pathname.includes('/yonetim/ayarlar')} 
                    onClick={() => setOpen(false)}
                  />
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <SidebarLink 
                      to="/" 
                      icon={<Home size={20} />} 
                      label="Siteye Dön" 
                      active={false} 
                      onClick={() => setOpen(false)}
                    />
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left rounded-md text-gray-700 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut size={20} className="mr-2 text-red-500" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <Link to="/" className="hidden md:flex items-center ml-4">
              <span className="text-xl font-quicksand font-bold text-nature-500">
                <span className="text-earth-600">Huzurlu</span> Bungalov
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-nature-600 mr-4">
              <Home className="h-5 w-5" />
            </Link>
            <Button variant="ghost" onClick={signOut} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white fixed left-0 top-16 bottom-0 z-20">
        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink 
            to="/yonetim" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={location.pathname === '/yonetim'} 
          />
          <SidebarLink 
            to="/yonetim/bungalovlar" 
            icon={<BedDouble size={20} />} 
            label="Bungalovlar" 
            active={location.pathname.includes('/yonetim/bungalovlar')} 
          />
          <SidebarLink 
            to="/yonetim/rezervasyonlar" 
            icon={<CalendarRange size={20} />} 
            label="Rezervasyonlar" 
            active={location.pathname.includes('/yonetim/rezervasyonlar')} 
          />
          <SidebarLink 
            to="/yonetim/kullanicilar" 
            icon={<Users size={20} />} 
            label="Kullanıcılar" 
            active={location.pathname.includes('/yonetim/kullanicilar')} 
          />
          <SidebarLink 
            to="/yonetim/istatistikler" 
            icon={<BarChart3 size={20} />} 
            label="İstatistikler" 
            active={location.pathname.includes('/yonetim/istatistikler')} 
          />
          <SidebarLink 
            to="/yonetim/ayarlar" 
            icon={<Settings size={20} />} 
            label="Ayarlar" 
            active={location.pathname.includes('/yonetim/ayarlar')} 
          />
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md ${
        active
          ? 'bg-nature-50 text-nature-600'
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className={`mr-3 ${active ? 'text-nature-500' : 'text-gray-500'}`}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default AdminLayout;


import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and brief description */}
          <div>
            <Link to="/" className="text-xl font-quicksand font-bold text-white">
              <span className="text-earth-300">Huzurlu</span> Bungalov
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Doğa ile iç içe, huzur dolu bir tatil deneyimi yaşamak için sizleri bungalovlarımıza bekliyoruz.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-earth-300 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-earth-300 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-earth-300 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-earth-300 transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/bungalovlar" className="text-gray-300 hover:text-earth-300 transition-colors">Bungalovlar</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-gray-300 hover:text-earth-300 transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/galeri" className="text-gray-300 hover:text-earth-300 transition-colors">Galeri</Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-300 hover:text-earth-300 transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-earth-300" />
                <span className="text-gray-300">Doğa Yolu Cad. No:42, Fethiye, Muğla</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-earth-300" />
                <a href="tel:+902526001234" className="text-gray-300 hover:text-earth-300 transition-colors">
                  +90 252 600 12 34
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-earth-300" />
                <a href="mailto:info@huzurlubungalov.com" className="text-gray-300 hover:text-earth-300 transition-colors">
                  info@huzurlubungalov.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bülten</h3>
            <p className="text-sm text-gray-300 mb-4">
              Kampanyalardan ve yeniliklerden haberdar olmak için bültenimize abone olun.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="px-3 py-2 bg-nature-700 text-white placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-earth-300 w-full"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 bg-earth-500 hover:bg-earth-600 text-white rounded-r-md transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-nature-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Huzurlu Bungalov. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatePicker from '../common/DatePicker';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState('2 Kişi');
  
  const handleSearch = () => {
    navigate('/bungalovlar');
  };
  
  return (
    <section className="relative h-[85vh] lg:h-[90vh] flex items-center">
      {/* Background image with modern overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
          alt="Doğa içinde bungalov" 
          className="w-full h-full object-cover object-center"
        />
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md animate-fade-in">
            Doğanın Kalbinde <br className="hidden md:block" />
            <span className="text-nature-300">Huzurlu</span> Bir Kaçamak
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90 animate-fade-in delay-100">
            Şehrin karmaşasından uzaklaşıp, doğanın sesini dinlemenin tam zamanı. Bungalovlarımızda tüm yorgunluğunuzu geride bırakın.
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-nature-500 hover:bg-nature-600 text-white transition-all shadow-lg hover:shadow-xl"
              onClick={() => navigate('/bungalovlar')}
            >
              Bungalovları Keşfet
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
              onClick={() => navigate('/hakkimizda')}
            >
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search form with glass effect */}
      <div className="absolute bottom-0 left-0 right-0 mx-auto transform translate-y-1/2 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giriş Tarihi</label>
                <div className="flex items-center border rounded-md border-gray-300 p-2 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 bg-white">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <DatePicker 
                    placeholder="Giriş Tarihi" 
                    value={checkInDate}
                    onChange={setCheckInDate}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kişi Sayısı</label>
                <div className="flex items-center border rounded-md border-gray-300 p-2 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 bg-white">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <select 
                    className="w-full bg-transparent appearance-none focus:outline-none"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option>1 Kişi</option>
                    <option>2 Kişi</option>
                    <option>3 Kişi</option>
                    <option>4 Kişi</option>
                    <option>5+ Kişi</option>
                  </select>
                </div>
              </div>
              
              <Button 
                className="w-full bg-nature-500 hover:bg-nature-600 text-white md:h-[42px] shadow-md hover:shadow-lg transition-all"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Bungalov Ara
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

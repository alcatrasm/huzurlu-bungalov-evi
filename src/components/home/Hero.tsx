
import React, { useState } from 'react';
import { Search, Calendar, Users, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DateRangePicker from '../common/DateRangePicker';
import NightSelector from '../common/NightSelector';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Tarih aralığı ve gece sayısı için state tanımlamaları
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2)
  });
  
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState('2 Kişi');
  
  // Tarih aralığı değiştiğinde gece sayısını güncelle
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      const days = differenceInDays(range.to, range.from);
      if (days > 0) setNights(days);
    }
  };
  
  // Gece sayısı değiştiğinde tarih aralığını güncelle
  const handleNightsChange = (value: number) => {
    setNights(value);
    if (dateRange?.from) {
      const newEndDate = addDays(dateRange.from, value);
      setDateRange({
        from: dateRange.from,
        to: newEndDate
      });
    }
  };
  
  const handleSearch = () => {
    navigate('/bungalovlar');
  };
  
  return (
    <section className="relative">
      {/* Hero section with full height */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Background image with modern overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
            alt="Doğa içinde bungalov" 
            className="w-full h-full object-cover object-center"
          />
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
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
      </div>
      
      {/* Search form positioned between hero and featured sections */}
      <div className="container mx-auto px-4 relative z-20 -mt-8 md:-mt-16 lg:-mt-24 mb-16">
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-4 md:p-6 max-w-4xl mx-auto transition-all hover:bg-white/80">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tarih Aralığı</label>
              <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kalınacak Gece Sayısı</label>
              <div className="flex items-center border rounded-md border-gray-300 p-2 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 bg-white">
                <Moon className="h-5 w-5 text-gray-500 mr-2" />
                <NightSelector value={nights} onChange={handleNightsChange} min={1} max={30} />
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
            
            <div className={isMobile ? '' : 'md:col-span-3'}>
              <Button 
                className="w-full bg-nature-500 hover:bg-nature-600 text-white shadow-md hover:shadow-lg transition-all"
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

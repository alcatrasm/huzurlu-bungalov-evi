
import React from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatePicker from '../common/DatePicker';

const Hero = () => {
  return (
    <section className="relative h-[80vh] lg:h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
          alt="Doğa içinde bungalov" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-slide-in">
            Doğanın Kalbinde Huzurlu Bir Kaçamak
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in">
            Şehrin karmaşasından uzaklaşıp, doğanın sesini dinlemenin tam zamanı. Bungalovlarımızda tüm yorgunluğunuzu geride bırakın.
          </p>
          <Button className="btn-primary text-lg px-6 py-4">Keşfedin</Button>
        </div>
      </div>
      
      {/* Search form */}
      <div className="absolute bottom-0 left-0 right-0 mx-auto transform translate-y-1/2 z-20">
        <div className="container mx-auto px-4">
          <form className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-4xl mx-auto wood-bg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih Seçin</label>
                <div className="flex items-center border rounded-md border-gray-300 p-2 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 bg-white">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <DatePicker placeholder="Giriş - Çıkış" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kişi Sayısı</label>
                <div className="flex items-center border rounded-md border-gray-300 p-2 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 bg-white">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <select className="w-full bg-transparent appearance-none focus:outline-none">
                    <option>1 Kişi</option>
                    <option>2 Kişi</option>
                    <option>3 Kişi</option>
                    <option>4 Kişi</option>
                    <option>5+ Kişi</option>
                  </select>
                </div>
              </div>
              
              <Button className="btn-secondary w-full md:h-[42px]">
                <Search className="h-4 w-4 mr-2" />
                Bungalov Ara
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
          alt="Doğa manzarası" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Huzurlu Bir Kaçamağa Hazır Mısınız?</h2>
          <p className="text-lg mb-8">
            Şehrin stresinden kaçıp doğanın dinginliğine sığının. Sizi ve sevdiklerinizi mutlu bir tatil bekliyor.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="btn-secondary">
              <Link to="/rezervasyon">Hemen Rezervasyon Yapın</Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-nature-700">
              <Link to="/iletisim">Bize Ulaşın</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

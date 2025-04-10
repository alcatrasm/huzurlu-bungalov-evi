
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-nature-600 text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Doğanın Güncellemelerini Kaçırmayın</h2>
          <p className="text-lg mb-8">
            Yeni bungalovlar, mevsimsel indirimler ve özel teklifler için bültenimize abone olun
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-nature-300 text-gray-800"
              required
            />
            <Button className="btn-secondary whitespace-nowrap">
              Abone Ol
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-nature-200">
            Gizliliğinize saygı duyuyoruz. E-postanız sadece bültenlerimiz için kullanılacaktır.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

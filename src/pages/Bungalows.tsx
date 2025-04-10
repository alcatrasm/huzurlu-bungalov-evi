
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bungalows } from '../data/bungalows';

const Bungalows = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tüm Bungalovlarımız</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Doğanın kalbinde, her bütçeye uygun konforlu bungalov seçeneklerimiz arasından size en uygun olanı seçin ve unutulmaz bir tatil deneyimi yaşayın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bungalows.map((bungalow) => (
            <Card key={bungalow.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <img 
                  src={bungalow.images[0].url} 
                  alt={bungalow.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{bungalow.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {bungalow.capacity.adults + bungalow.capacity.children} Kişi
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Maximize className="h-4 w-4 mr-1" />
                      {bungalow.size} m²
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-gray-600 mb-4 line-clamp-3">{bungalow.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold text-nature-600">{bungalow.pricePerNight} ₺</span>
                    <span className="text-gray-500 text-sm"> / gece</span>
                  </div>
                  <Button asChild variant="outline">
                    <Link to={`/bungalovlar/${bungalow.slug}`}>
                      Detaylar <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Bungalows;

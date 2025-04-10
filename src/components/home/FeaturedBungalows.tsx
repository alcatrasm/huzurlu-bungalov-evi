
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Sample bungalow data
const bungalows = [
  {
    id: 1,
    name: 'Orman Manzaralı Bungalov',
    description: 'Çam ağaçları arasında huzurlu bir kaçamak.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    location: 'Fethiye, Muğla',
    rating: 4.8,
    available: true
  },
  {
    id: 2,
    name: 'Göl Kenarı Bungalov',
    description: 'Göl manzarası eşliğinde doğa yürüyüşleri.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    location: 'Sapanca, Sakarya',
    rating: 4.9,
    available: true
  },
  {
    id: 3,
    name: 'Dağ Evi Bungalov',
    description: 'Dağların arasında sessiz ve konforlu bir konaklama.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    location: 'Bolu, Abant',
    rating: 4.7,
    available: false
  }
];

const FeaturedBungalows = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Öne Çıkan Bungalovlarımız</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Misafirlerimiz tarafından en çok tercih edilen, doğanın kalbinde konumlanmış özel bungalovlarımız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bungalows.map((bungalow) => (
            <BungalowCard key={bungalow.id} bungalow={bungalow} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-outline text-lg">
            <Link to="/bungalovlar">Tüm Bungalovlar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface BungalowCardProps {
  bungalow: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    location: string;
    rating: number;
    available: boolean;
  };
}

const BungalowCard: React.FC<BungalowCardProps> = ({ bungalow }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-56">
        <img 
          src={bungalow.image} 
          alt={bungalow.name} 
          className="w-full h-full object-cover object-center"
        />
        {!bungalow.available && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
            Rezerve
          </div>
        )}
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-20"></div>
        <div className="absolute bottom-2 left-3 text-white flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{bungalow.location}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{bungalow.name}</h3>
          <div className="flex items-center bg-amber-50 text-amber-600 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 fill-amber-500 stroke-amber-500 mr-1" />
            <span className="text-sm font-medium">{bungalow.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{bungalow.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="font-semibold text-nature-600">
            <span className="text-lg">{bungalow.price} ₺</span>
            <span className="text-sm text-gray-500"> / gece</span>
          </div>

          <Link to={`/bungalovlar/${bungalow.id}`}>
            <Button className="btn-primary">
              {bungalow.available ? 'Rezervasyon' : 'İncele'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBungalows;

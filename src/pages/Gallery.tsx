
import React from 'react';
import Layout from '../components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Galeri resimleri için demo veriler
const galleryImages = {
  bungalow: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      alt: 'Orman Bungalovlar',
      caption: 'Orman Manzaralı Lüks Bungalov'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      alt: 'Göl Kenarı Bungalov',
      caption: 'Göl Kenarında Romantik Konaklama'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      alt: 'Dağ Evi Bungalov',
      caption: 'Dağların Arasında Huzurlu Bungalov'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      alt: 'Kır Evi Bungalov',
      caption: 'Doğayla İç İçe Bungalov Deneyimi'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      alt: 'Çiftlik Evi Bungalov',
      caption: 'Çiftlik Hayatını Deneyimleyin'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      alt: 'Orman Evi Bungalov',
      caption: 'Ormanın Sesini Dinleyin'
    },
  ],
  nature: [
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
      alt: 'Doğa Manzarası - Göl',
      caption: 'Tesisimiz Yakınındaki Göl Manzarası'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      alt: 'Doğa Manzarası - Şelale',
      caption: 'Bungalovlarımızdan 10 Dakika Yürüme Mesafesindeki Şelale'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      alt: 'Doğa Manzarası - Dağ',
      caption: 'Nefes Kesen Dağ Manzarası'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      alt: 'Doğa Manzarası - Orman',
      caption: 'Tesisimizi Çevreleyen Orman'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      alt: 'Doğa Manzarası - Çayır',
      caption: 'Yeşilin Her Tonunu Görebileceğiniz Çayırlarımız'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
      alt: 'Doğa Manzarası - Ağaçlar',
      caption: 'Yüzyıllık Ağaçlar Arasında Huzur'
    }
  ],
  activities: [
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
      alt: 'Kamp Ateşi',
      caption: 'Akşam Kamp Ateşi Etkinliğimiz'
    },
    {
      id: 14,
      url: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225',
      alt: 'Kano Turu',
      caption: 'Göl Üzerinde Kano Turu'
    },
    {
      id: 15,
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
      alt: 'Doğa Yürüyüşü',
      caption: 'Rehberli Doğa Yürüyüşü'
    },
    {
      id: 16,
      url: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9',
      alt: 'Dağ Bisikleti',
      caption: 'Dağ Bisikleti Parkurlarımız'
    },
    {
      id: 17,
      url: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf',
      alt: 'Yoga Dersleri',
      caption: 'Açık Havada Yoga Derslerimiz'
    },
    {
      id: 18,
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      alt: 'Piknik Alanı',
      caption: 'Ailece Vakit Geçirebileceğiniz Piknik Alanlarımız'
    }
  ]
};

const Gallery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Galeri</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Doğanın kalbinde yer alan tesisimize ait fotoğrafları inceleyebilir, bungalovlarımızın konforunu, doğanın güzelliğini ve etkinliklerimizi görebilirsiniz.
        </p>

        <Tabs defaultValue="bungalow" className="mb-10">
          <TabsList className="mb-8 flex flex-wrap gap-2">
            <TabsTrigger value="bungalow">Bungalovlar</TabsTrigger>
            <TabsTrigger value="nature">Doğa</TabsTrigger>
            <TabsTrigger value="activities">Etkinlikler</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bungalow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.bungalow.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nature">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.nature.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.activities.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface GalleryItemProps {
  image: {
    id: number;
    url: string;
    alt: string;
    caption: string;
  };
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative aspect-square">
        <img 
          src={image.url} 
          alt={image.alt} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <p className="text-white text-lg font-medium">{image.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;


import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Demo galeri görselleri
const galleryImages = [
  {
    id: 1,
    title: "Orman Bungalov Dış Görünüm",
    category: "dış",
    url: "https://images.unsplash.com/photo-1510598125064-a9d7a4d09059"
  },
  {
    id: 2,
    title: "Göl Kenarı Bungalov",
    category: "dış",
    url: "https://images.unsplash.com/photo-1561963706-5e4d2532dbec"
  },
  {
    id: 3,
    title: "Lüks İç Tasarım",
    category: "iç",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
  },
  {
    id: 4,
    title: "Modern Yatak Odası",
    category: "iç",
    url: "https://images.unsplash.com/photo-1594563703937-c6dc11f5ba82"
  },
  {
    id: 5,
    title: "Doğa Manzarası",
    category: "doğa",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
  },
  {
    id: 6,
    title: "Kahvaltı Sunumu",
    category: "yeme-içme",
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
  },
  {
    id: 7,
    title: "Romantik Akşam Yemeği",
    category: "yeme-içme",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
  },
  {
    id: 8,
    title: "Şömine Başında",
    category: "iç",
    url: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79"
  },
  {
    id: 9,
    title: "Bungalov Havuz Başı",
    category: "dış",
    url: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570"
  },
  {
    id: 10,
    title: "Orman Yürüyüşü",
    category: "aktivite",
    url: "https://images.unsplash.com/photo-1501554728187-ce583db33af7"
  },
  {
    id: 11,
    title: "Gün Batımı Teras",
    category: "dış",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
  },
  {
    id: 12,
    title: "Lüks Banyo",
    category: "iç",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
  },
  {
    id: 13,
    title: "Jakuzili Suite",
    category: "iç",
    url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
  },
  {
    id: 14,
    title: "Yoga Platformu",
    category: "aktivite",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
  },
  {
    id: 15,
    title: "Rustik İç Mekan",
    category: "iç",
    url: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7"
  },
  {
    id: 16,
    title: "Nehir Manzarası",
    category: "doğa",
    url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e"
  },
  {
    id: 17,
    title: "Açık Hava Duşu",
    category: "dış",
    url: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1"
  },
  {
    id: 18,
    title: "Gece Manzarası",
    category: "dış",
    url: "https://images.unsplash.com/photo-1518946222227-364f22132616"
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState("hepsi");
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const filteredImages = filter === "hepsi" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);
  
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setOpen(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16" onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Galeri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bungalovlarımızın içi, dışı, çevresi ve sunduğumuz hizmetlerden görüntüler.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            variant={filter === "hepsi" ? "default" : "outline"}
            onClick={() => setFilter("hepsi")}
            className={filter === "hepsi" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            Tümü
          </Button>
          <Button 
            variant={filter === "dış" ? "default" : "outline"}
            onClick={() => setFilter("dış")}
            className={filter === "dış" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            Dış Mekan
          </Button>
          <Button 
            variant={filter === "iç" ? "default" : "outline"}
            onClick={() => setFilter("iç")}
            className={filter === "iç" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            İç Mekan
          </Button>
          <Button 
            variant={filter === "doğa" ? "default" : "outline"}
            onClick={() => setFilter("doğa")}
            className={filter === "doğa" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            Doğa
          </Button>
          <Button 
            variant={filter === "yeme-içme" ? "default" : "outline"}
            onClick={() => setFilter("yeme-içme")}
            className={filter === "yeme-içme" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            Yeme & İçme
          </Button>
          <Button 
            variant={filter === "aktivite" ? "default" : "outline"}
            onClick={() => setFilter("aktivite")}
            className={filter === "aktivite" ? "bg-nature-500 hover:bg-nature-600" : ""}
          >
            Aktiviteler
          </Button>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative group overflow-hidden rounded-lg cursor-pointer h-64"
              onClick={() => handleImageClick(index)}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
          
          {filteredImages.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">Bu kategoride henüz görsel bulunmamaktadır.</p>
            </div>
          )}
        </div>
        
        {/* Lightbox */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl bg-black/95 border-0 text-white p-0">
            <div className="relative w-full h-[80vh]">
              <button 
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={filteredImages[currentImageIndex]?.url} 
                  alt={filteredImages[currentImageIndex]?.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h3 className="text-lg font-medium px-4 py-2 bg-black/70 inline-block rounded-lg">
                  {filteredImages[currentImageIndex]?.title}
                </h3>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-16 left-0 right-0 text-center">
                <div className="inline-flex gap-1 px-2 py-1 bg-black/70 rounded-lg">
                  {filteredImages.map((_, index) => (
                    <button 
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;

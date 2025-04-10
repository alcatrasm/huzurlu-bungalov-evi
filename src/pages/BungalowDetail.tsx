
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Maximize, CheckCircle2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBungalowBySlug } from '../data/bungalows';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DateRangePicker from '../components/common/DateRangePicker';
import NightSelector from '../components/common/NightSelector';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

const BungalowDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const bungalow = getBungalowBySlug(slug || '');
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 2))
  });
  
  const [nights, setNights] = useState(2);
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (!bungalow) return 0;
    return bungalow.pricePerNight * nights;
  };
  
  // Update nights when date range changes
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      const days = differenceInDays(range.to, range.from);
      setNights(days);
    }
  };
  
  // Update date range when nights changes
  const handleNightsChange = (value: number) => {
    setNights(value);
    if (dateRange?.from) {
      const newEndDate = new Date(dateRange.from);
      newEndDate.setDate(dateRange.from.getDate() + value);
      setDateRange({
        from: dateRange.from,
        to: newEndDate
      });
    }
  };
  
  const handleReservation = () => {
    if (!bungalow || !dateRange?.from || !dateRange?.to) return;
    
    // Navigate to reservation page with bungalow and date information
    navigate(`/rezervasyon?bungalowId=${bungalow.id}&checkIn=${dateRange.from.toISOString()}&checkOut=${dateRange.to.toISOString()}&nights=${nights}`);
  };
  
  if (!bungalow) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Bungalov Bulunamadı</h1>
          <p className="text-gray-600 mb-8">
            Aradığınız bungalov mevcut değil. Lütfen <Link to="/bungalovlar" className="text-nature-500 hover:underline">tüm bungalovlarımıza</Link> göz atın.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Bungalow Info */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{bungalow.name}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <Users className="h-5 w-5 mr-2" />
                <span>{bungalow.capacity.adults} Yetişkin, {bungalow.capacity.children} Çocuk</span>
                <span className="mx-4">•</span>
                <Maximize className="h-5 w-5 mr-2" />
                <span>{bungalow.size} m²</span>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {bungalow.images.map((image) => (
                    <CarouselItem key={image.id}>
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Bungalov Hakkında</h2>
              <p className="text-gray-700">{bungalow.description}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bungalow.features.map(feature => (
                  <div key={feature.id} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-nature-500 mr-2" />
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Booking Card */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24 shadow-lg border-nature-100">
              <CardContent className="p-6">
                <div className="text-xl font-semibold mb-2">
                  <span className="text-2xl text-nature-600">{bungalow.pricePerNight} ₺</span> / gece
                </div>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarih Seçin</label>
                    <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kaç Gece?</label>
                    <NightSelector value={nights} onChange={handleNightsChange} min={1} max={30} />
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Gecelik Ücret</span>
                      <span>{bungalow.pricePerNight} ₺</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Konaklama Süresi</span>
                      <span>{nights} Gece</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Toplam</span>
                      <span>{calculateTotalPrice()} ₺</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleReservation}
                  >
                    Rezervasyon Yap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BungalowDetail;

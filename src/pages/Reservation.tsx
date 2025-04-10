
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getBungalowById } from '../data/bungalows';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar, Users, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define form schema
const reservationFormSchema = z.object({
  firstName: z.string().min(1, { message: 'İsim gereklidir' }),
  lastName: z.string().min(1, { message: 'Soyisim gereklidir' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  phone: z.string().min(10, { message: 'Geçerli bir telefon numarası giriniz' }),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

const Reservation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get query parameters
  const bungalowId = searchParams.get('bungalowId');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const nightsParam = searchParams.get('nights');

  // Parse dates and nights
  const checkIn = checkInParam ? new Date(checkInParam) : undefined;
  const checkOut = checkOutParam ? new Date(checkOutParam) : undefined;
  const nights = nightsParam ? parseInt(nightsParam) : 1;

  // Get bungalow data
  const bungalow = bungalowId ? getBungalowById(bungalowId) : undefined;
  const totalPrice = bungalow ? bungalow.pricePerNight * nights : 0;

  // Form handling
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  });

  // If no bungalow selected or dates, redirect to bungalows page
  useEffect(() => {
    if (!bungalow || !checkIn || !checkOut) {
      navigate('/bungalovlar');
    }
  }, [bungalow, checkIn, checkOut, navigate]);

  // Handle form submission
  const onSubmit = (values: ReservationFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Rezervasyonunuz başarıyla alınmıştır!', {
        description: 'Detaylar e-posta adresinize gönderilecektir.',
      });
      setIsSubmitting(false);
      
      // Navigate to success page or home
      navigate('/');
    }, 1500);
  };

  if (!bungalow || !checkIn || !checkOut) {
    return null; // Will redirect via useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Rezervasyon</h1>
          <p className="text-gray-600 mb-8">
            Rezervasyon bilgilerinizi girerek işleminizi tamamlayabilirsiniz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reservation Form */}
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input placeholder="Adınız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Soyadınız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta</FormLabel>
                          <FormControl>
                            <Input placeholder="E-posta adresiniz" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="Telefon numaranız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özel İstekler (Opsiyonel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Özel isteklerinizi belirtebilirsiniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <h3 className="text-lg font-medium pt-4">Ödeme Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                      <Input placeholder="Kart sahibinin adı" id="cardName" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Kart Numarası</Label>
                      <Input placeholder="0000 0000 0000 0000" id="cardNumber" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                      <Input placeholder="AA/YY" id="expiryDate" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input placeholder="123" id="cvv" type="password" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'İşleniyor...' : 'Rezervasyonu Tamamla'}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Reservation Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Rezervasyon Özeti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-nature-100">
                        <Clock className="h-5 w-5 text-nature-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Konaklama Detayları</div>
                        <div className="text-sm text-gray-500">
                          {checkIn && format(checkIn, 'dd MMM yyyy')} - {checkOut && format(checkOut, 'dd MMM yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">{nights} gece</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-nature-100">
                        <Users className="h-5 w-5 text-nature-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Kapasite</div>
                        <div className="text-sm text-gray-500">
                          {bungalow.capacity.adults} Yetişkin, {bungalow.capacity.children} Çocuk
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Gecelik Fiyat</span>
                      <span>{bungalow.pricePerNight} ₺</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Konaklama Süresi</span>
                      <span>{nights} gece</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Temizlik Ücreti</span>
                      <span>150 ₺</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                      <span>Toplam</span>
                      <span>{totalPrice + 150} ₺</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;


import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

// Form şeması
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  phone: z.string().min(10, { message: 'Geçerli bir telefon numarası giriniz' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    // Normalde burada form bilgilerini backend'e göndeririz
    toast.success('Mesajınız başarıyla gönderildi', {
      description: 'En kısa sürede size dönüş yapacağız',
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">İletişim</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Sorularınız için bize ulaşabilir, rezervasyon taleplerinizi iletebilir veya bungalovlarımız hakkında daha fazla bilgi alabilirsiniz.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-nature-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adres</h3>
                  <p className="text-gray-600">
                    Doğa Bungalovları<br />
                    Çamlık Mahallesi, Orman Sk. No:42<br />
                    Fethiye, Muğla, 48300
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-nature-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                  <p className="text-gray-600 mb-2">Rezervasyon: +90 (252) 123 45 67</p>
                  <p className="text-gray-600">Genel Bilgi: +90 (252) 123 45 68</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-nature-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-posta</h3>
                  <p className="text-gray-600 mb-2">info@dogabungalov.com</p>
                  <p className="text-gray-600">rezervasyon@dogabungalov.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Alanı */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Bize Ulaşın</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adınız Soyadınız</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınız Soyadınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesajınız</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mesajınızı buraya yazabilirsiniz..." 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Mesaj Gönder
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Harita ve Çalışma Saatleri */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Çalışma Saatleri</h2>
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-nature-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Resepsiyon</h4>
                      <p className="text-gray-600">Hergün: 08:00 - 22:00</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Restoran</h4>
                      <p className="text-gray-600">Hergün: 07:30 - 22:30</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Aktiviteler</h4>
                      <p className="text-gray-600">Hergün: 09:00 - 18:00</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Spa & Wellness</h4>
                      <p className="text-gray-600">Hergün: 10:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Konum</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12754.089033882476!2d29.148854755809974!3d36.655158623938365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c041b11953a93b%3A0xde2cbf7c703e4bdd!2sFethiye%2C+Mu%C4%9Fla!5e0!3m2!1str!2str!4v1524255869442" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

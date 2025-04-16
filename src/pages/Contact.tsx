
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Mesajınız alındı",
        description: "En kısa sürede size dönüş yapacağız.",
      });
      
      // Reset form after a short delay
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişim</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sorularınız veya özel istekleriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
        
        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <ul className="space-y-6">
                  <li className="flex">
                    <MapPin className="h-6 w-6 text-nature-600 mr-3 shrink-0" />
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-gray-600 mt-1">
                        Doğa Mahallesi, Orman Caddesi No:123<br />
                        Çamköy / Muğla
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Phone className="h-6 w-6 text-nature-600 mr-3 shrink-0" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-gray-600 mt-1">
                        +90 (252) 123 45 67
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Mail className="h-6 w-6 text-nature-600 mr-3 shrink-0" />
                    <div>
                      <p className="font-medium">E-posta</p>
                      <p className="text-gray-600 mt-1">
                        info@huzurlubungalov.com
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <Clock className="h-6 w-6 text-nature-600 mr-3 shrink-0" />
                    <div>
                      <p className="font-medium">Çalışma Saatleri</p>
                      <p className="text-gray-600 mt-1">
                        Pazartesi - Pazar: 08:00 - 20:00
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Sosyal Medya</h2>
                <div className="flex space-x-4 mt-4">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-gray-200 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-gray-200 hover:bg-pink-600 hover:text-white p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-gray-200 hover:bg-blue-400 hover:text-white p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="bg-gray-200 hover:bg-red-600 hover:text-white p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Teşekkürler!</h3>
                    <p className="text-gray-600 text-center">
                      Mesajınız iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Adınız Soyadınız</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Adınız Soyadınız"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta Adresiniz</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="adiniz@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon Nu
                        maranız</Label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="(5XX) XXX XX XX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Konu</Label>
                        <Input 
                          id="subject" 
                          value={subject} 
                          onChange={(e) => setSubject(e.target.value)} 
                          placeholder="Mesajınızın konusu"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajınız</Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Mesajınızı buraya yazın..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-nature-500 hover:bg-nature-600 w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Mesaj Gönder
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Konum</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            {/* Embed a placeholder map image for demo purposes */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-nature-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Harita Görünümü</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Burada gerçek bir harita görünümü olacaktır. Gerçek hizmete geçildiğinde Google Maps, Yandex.Maps veya benzer bir harita servisinden harita gösterimi eklenecektir.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Sık Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Check-in ve check-out saatleri nedir?</h3>
                <p className="text-gray-600">
                  Check-in saat 14:00'den itibaren, check-out ise en geç saat 12:00'ye kadardır. Erken giriş veya geç çıkış için lütfen önceden bizimle iletişime geçin.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Evcil hayvan kabul ediyor musunuz?</h3>
                <p className="text-gray-600">
                  Evet, belirli bungalovlarımızda evcil hayvanlar kabul edilmektedir. Rezervasyon yaparken lütfen evcil hayvanınızı da bildirin.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Tesise ulaşım nasıl sağlanır?</h3>
                <p className="text-gray-600">
                  Tesisimize özel aracınızla veya Muğla merkezdeki otobüs terminalinden kalkan servislerimizle ulaşabilirsiniz. Havaalanından transfer hizmeti de sunmaktayız.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">İptal politikanız nedir?</h3>
                <p className="text-gray-600">
                  Giriş tarihinden 7 gün öncesine kadar yapılan iptallerde ücret iadesi yapılmaktadır. Daha sonraki iptallerde bir gecelik konaklama bedeli tahsil edilir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

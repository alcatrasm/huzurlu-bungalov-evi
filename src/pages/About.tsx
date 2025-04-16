
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Clock, Star, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Doğanın kalbinde huzurlu bir kaçamak arayanlar için tasarlanmış, benzersiz bungalov deneyimi sunuyoruz.
          </p>
        </div>
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
            <p className="text-gray-600 mb-4">
              Huzurlu Bungalov, 2015 yılında doğaya olan tutkumuzu ve misafirperverliğimizi birleştirmek amacıyla kuruldu. Şehir hayatının karmaşasından uzakta, doğanın sakinliğinde konforlu bir konaklama deneyimi sunma hayalimizle yola çıktık.
            </p>
            <p className="text-gray-600 mb-4">
              Başlangıçta sadece 5 bungalovla hizmet vermeye başladık ve yıllar içinde hem kapasitemizi hem de hizmet kalitemizi artırdık. Bugün, her biri özenle tasarlanmış 15 bungalovla misafirlerimize unutulmaz deneyimler yaşatmaya devam ediyoruz.
            </p>
            <p className="text-gray-600">
              Misyonumuz, misafirlerimizin doğayla iç içe olurken modern konforu da yaşayabilecekleri, kendilerini evlerinde hissedecekleri bir ortam sunmaktır. Vizyonumuz ise, Türkiye'nin en kaliteli ve doğa dostu bungalov işletmesi olmaktır.
            </p>
          </div>
          <div className="order-1 md:order-2 relative">
            <img 
              src="https://images.unsplash.com/photo-1510798831971-661eb04b3739" 
              alt="Huzurlu Bungalov'un hikayesi" 
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-4 hidden md:block">
              <p className="text-lg font-semibold">2015'ten beri</p>
              <p className="text-sm text-gray-600">10 yıllık deneyim</p>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-nature-100 text-nature-600 mb-4">
                  <Heart />
                </div>
                <h3 className="text-xl font-semibold mb-2">Misafir Memnuniyeti</h3>
                <p className="text-gray-600">
                  Misafirlerimize kendilerini özel hissettirmek için elimizden gelenin en iyisini yapıyoruz. Onların konforu ve mutluluğu her zaman önceliğimizdir.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-nature-100 text-nature-600 mb-4">
                  <Shield />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sürdürülebilirlik</h3>
                <p className="text-gray-600">
                  Doğaya saygılı, çevre dostu uygulamaları benimsiyor, karbon ayak izimizi azaltmak için sürekli çalışıyoruz. Güneş enerjisi kullanımı önceliklerimiz arasında.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-nature-100 text-nature-600 mb-4">
                  <Users />
                </div>
                <h3 className="text-xl font-semibold mb-2">Toplum Katkısı</h3>
                <p className="text-gray-600">
                  Yerel halkla işbirliği yaparak bölge ekonomisine katkıda bulunuyor, kültürel değerleri yaşatmaya özen gösteriyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Ekibimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ahmet Yılmaz",
                role: "Kurucu & CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                name: "Zeynep Aydın",
                role: "Operasyon Müdürü",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              },
              {
                name: "Mehmet Demir",
                role: "Şef",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
              },
              {
                name: "Ayşe Kaya",
                role: "Misafir İlişkileri",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="mb-24 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Başarılarımız ve Ödüllerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <Star className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2023 - En İyi Ekolojik Konaklama Tesisi</h3>
                <p className="text-gray-600">
                  Sürdürülebilir turizm uygulamalarımız ve ekolojik yaklaşımımızla Turizm Bakanlığı tarafından ödüle layık görüldük.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <Award className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2022 - Misafir Memnuniyeti Ödülü</h3>
                <p className="text-gray-600">
                  Booking.com platformunda 9.8/10 puan alarak bölgemizdeki en yüksek misafir memnuniyetine sahip tesis seçildik.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <CheckCircle className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2020 - "Green Key" Sertifikası</h3>
                <p className="text-gray-600">
                  Çevre dostu uygulamalarımızla uluslararası "Green Key" (Yeşil Anahtar) sertifikasını almaya hak kazandık.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <Clock className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2018 - 1000+ Mutlu Misafir</h3>
                <p className="text-gray-600">
                  Açılışımızdan sadece 3 yıl sonra, 1000'den fazla misafire hizmet verme başarısını gösterdik.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Rakamlarla Biz</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-nature-50 rounded-lg p-6">
              <p className="text-4xl font-bold text-nature-600">15</p>
              <p className="text-gray-600 mt-2">Bungalov</p>
            </div>
            <div className="bg-nature-50 rounded-lg p-6">
              <p className="text-4xl font-bold text-nature-600">10+</p>
              <p className="text-gray-600 mt-2">Yıllık Deneyim</p>
            </div>
            <div className="bg-nature-50 rounded-lg p-6">
              <p className="text-4xl font-bold text-nature-600">5000+</p>
              <p className="text-gray-600 mt-2">Misafir</p>
            </div>
            <div className="bg-nature-50 rounded-lg p-6">
              <p className="text-4xl font-bold text-nature-600">4.9/5</p>
              <p className="text-gray-600 mt-2">Misafir Puanı</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="rounded-lg overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d" 
            alt="Huzurlu Bungalov" 
            className="w-full h-80 object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Siz de Huzurlu Bir Tatil İster misiniz?</h2>
              <p className="text-lg mb-6">
                Doğanın kalbinde, konforlu ve huzurlu bir tatil için hemen rezervasyon yapın.
              </p>
              <a 
                href="/bungalovlar" 
                className="inline-block bg-white text-nature-600 px-6 py-3 rounded-full font-medium hover:bg-nature-50 transition-colors"
              >
                Bungalovları Keşfet
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

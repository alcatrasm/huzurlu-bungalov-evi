
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Hakkımızda</h1>
        
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
            alt="Doğa Bungalovları" 
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">Doğanın Kalbinde Huzurlu Bir Kaçamak</h2>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-nature-600">Hikayemiz</h3>
            <p className="text-gray-700 mb-4">
              2010 yılında, doğa tutkunları olan Ali ve Ayşe Yılmaz çifti tarafından kuruldu. Şehir hayatının stresinden uzaklaşmak isteyen misafirlerimize huzurlu bir ortam sunma hayaliyle yola çıktık.
            </p>
            <p className="text-gray-700 mb-4">
              Başlangıçta sadece 3 bungalovla hizmet vermeye başladık. Misafirlerimizden aldığımız olumlu geri dönüşler ve doğaya olan saygımızı koruyan sürdürülebilir yaklaşımımız sayesinde yıllar içinde büyüdük ve bugün 15 farklı bungalovla hizmet veriyoruz.
            </p>
            <p className="text-gray-700">
              Her bungalovumuz, doğayla uyum içinde tasarlanmış, konforlu ve modern olanaklarla donatılmıştır. Misafirlerimize unutulmaz bir tatil deneyimi sunmak için sürekli kendimizi geliştiriyor ve yeniliyoruz.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Doğa Bungalovları" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-nature-600 text-center">Değerlerimiz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-nature-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nature-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Doğaya Saygı</h4>
              <p className="text-gray-600">Tüm faaliyetlerimizde çevreyi korumayı ve doğal yaşama saygı göstermeyi temel prensip edindik.</p>
            </div>
            <div className="bg-nature-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nature-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Misafirperverlik</h4>
              <p className="text-gray-600">Misafirlerimizi ailemizin bir parçası olarak görüyor, onların konforu ve memnuniyeti için çalışıyoruz.</p>
            </div>
            <div className="bg-nature-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nature-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium mb-2">Sürdürülebilirlik</h4>
              <p className="text-gray-600">Geri dönüşüm, yenilenebilir enerji kullanımı ve su tasarrufu gibi sürdürülebilir uygulamaları destekliyoruz.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-nature-600 text-center">Ekibimiz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-32 h-32">
                <img src="https://i.pravatar.cc/150?img=12" alt="Ali Yılmaz" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-medium">Ali Yılmaz</h4>
              <p className="text-gray-600">Kurucu & Yönetici</p>
            </div>
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-32 h-32">
                <img src="https://i.pravatar.cc/150?img=25" alt="Ayşe Yılmaz" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-medium">Ayşe Yılmaz</h4>
              <p className="text-gray-600">Kurucu & Operasyon Müdürü</p>
            </div>
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-32 h-32">
                <img src="https://i.pravatar.cc/150?img=32" alt="Mehmet Kaya" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-medium">Mehmet Kaya</h4>
              <p className="text-gray-600">Şef</p>
            </div>
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-32 h-32">
                <img src="https://i.pravatar.cc/150?img=45" alt="Zeynep Demir" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-medium">Zeynep Demir</h4>
              <p className="text-gray-600">Etkinlik Koordinatörü</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-nature-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Doğanın kalbinde huzurlu bir tatil sizi bekliyor</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Şehir hayatının stresinden uzaklaşmak ve doğayla iç içe bir tatil yapmak için sizleri bungalovlarımıza bekliyoruz.
          </p>
          <Button asChild size="lg" className="bg-nature-600 hover:bg-nature-700">
            <Link to="/bungalovlar">Bungalovları Keşfedin</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;

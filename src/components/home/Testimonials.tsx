
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayşe Yılmaz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    date: '25 Haziran 2024',
    rating: 5,
    text: 'Harika bir deneyimdi! Doğayla iç içe olmak, şehrin gürültüsünden uzakta huzurlu bir tatil geçirmek isteyen herkese tavsiye ederim. Tesisler temiz ve konforluydu.'
  },
  {
    name: 'Mehmet Kaya',
    avatar: 'https://i.pravatar.cc/150?img=3',
    date: '12 Temmuz 2024',
    rating: 5,
    text: 'Ormanın içinde konforlu bir konaklama. Sabah kuş sesleriyle uyanmak ve kahvaltımızı doğayla iç içe yapmak muhteşemdi. Kesinlikle tekrar geleceğiz.'
  },
  {
    name: 'Zeynep Demir',
    avatar: 'https://i.pravatar.cc/150?img=5',
    date: '3 Ağustos 2024',
    rating: 4,
    text: 'Çocuklarımızla birlikte doğada güzel vakit geçirdik. Bungalovlar çok rahat ve temizdi. Personel çok yardımsever. Tek eksik internet bağlantısının bazen zayıflamasıydı.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Misafirlerimiz Ne Diyor?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Doğa deneyiminizi unutulmaz kılan anların paylaşımları ve misafir yorumlarımız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative wood-bg"
            >
              <div className="absolute -top-4 -left-4 bg-nature-500 rounded-full w-8 h-8 flex items-center justify-center">
                <Quote className="h-4 w-4 text-white" />
              </div>

              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.date}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-amber-400 stroke-amber-400' : 'stroke-gray-300'}`} 
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

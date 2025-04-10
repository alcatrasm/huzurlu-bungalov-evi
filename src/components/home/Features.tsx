
import React from 'react';
import { Trees, Wind, Coffee, Sun, Mountain, Wifi } from 'lucide-react';

const features = [
  {
    icon: <Trees className="h-10 w-10 text-nature-500" />,
    title: 'Doğayla İç İçe',
    description: 'Ağaçların arasında, kuş sesleri eşliğinde, şehirden uzak bir konaklama.'
  },
  {
    icon: <Wind className="h-10 w-10 text-nature-500" />,
    title: 'Temiz Hava',
    description: 'Şehrin kirli havasından kurtulun, ormanın temiz oksijenini içinize çekin.'
  },
  {
    icon: <Coffee className="h-10 w-10 text-nature-500" />,
    title: 'Ev Konforu',
    description: 'Doğanın ortasında olsanız da modern yaşamın konforundan vazgeçmeyin.'
  },
  {
    icon: <Sun className="h-10 w-10 text-nature-500" />,
    title: 'Güneşin Tadını Çıkarın',
    description: 'Büyük pencerelerden içeri dolan doğal ışık ve güneş ışınları.'
  },
  {
    icon: <Mountain className="h-10 w-10 text-nature-500" />,
    title: 'Doğa Aktiviteleri',
    description: 'Yürüyüş rotaları, bisiklet parkurları ve daha fazlası.'
  },
  {
    icon: <Wifi className="h-10 w-10 text-nature-500" />,
    title: 'Kesintisiz İnternet',
    description: 'Uzakta olsanız da sevdiklerinizle iletişimde kalın.'
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-nature-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Neden Biz?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Huzurlu Bungalov'da konaklayarak doğanın tadını çıkarırken tüm modern konfora da sahip olacaksınız
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

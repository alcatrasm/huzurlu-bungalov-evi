
import { Bungalow, BungalowFeature, BungalowImage } from '../models/Bungalow';

export const bungalows: Bungalow[] = [
  {
    id: "1",
    name: "Orman Manzaralı Bungalov",
    slug: "orman-manzarali",
    description: "Doğanın kalbinde konumlanmış bu özel bungalovumuz, ormanın derinliklerinden gelen taze havayı ve kuş seslerini doğrudan odanıza taşıyor. Geniş pencerelerinden ormanın muhteşem manzarasını seyrederken, şehir hayatının stresini geride bırakacaksınız. Modern konforlarla donatılmış bu bungalovda kendinizi evinizde hissederken doğayla iç içe olmanın huzurunu yaşayacaksınız. Yeşillikler içindeki özel terasında kahvaltı yapabilir, akşamları ise gökyüzündeki yıldızları sayabilirsiniz.",
    shortDescription: "Ormanın içinde huzurlu bir kaçamak için ideal bungalov",
    pricePerNight: 750,
    capacity: {
      adults: 2,
      children: 2
    },
    size: 45,
    images: [
      {
        id: "1-1",
        url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
        alt: "Orman Manzaralı Bungalov dış görünüm"
      },
      {
        id: "1-2",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        alt: "Orman Manzaralı Bungalov iç mekan"
      },
      {
        id: "1-3",
        url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
        alt: "Orman Manzaralı Bungalov yatak odası"
      }
    ],
    features: [
      { id: "f1", name: "Özel Teras", icon: "home" },
      { id: "f2", name: "Şömine", icon: "flame" },
      { id: "f3", name: "Mini Mutfak", icon: "utensils" },
      { id: "f4", name: "Ücretsiz Wi-Fi", icon: "wifi" },
      { id: "f5", name: "Doğa Manzarası", icon: "tree" }
    ],
    available: true
  },
  {
    id: "2",
    name: "Göl Kenarı Bungalov",
    slug: "gol-kenari",
    description: "Sakin göl manzarası eşliğinde huzurlu bir tatil sizi bekliyor. Bu özel bungalovumuz, göl kenarında konumlanmış olup, suyun dinlendirici sesini ve muhteşem gün batımı manzaralarını sunuyor. Özel iskelesi sayesinde doğrudan göle erişim sağlayabilir, sabah kahvaltınızı göl üzerindeki terasınızda yapabilirsiniz. Modern ve konforlu iç mekanı ile göl kenarında lüks bir konaklama deneyimi yaşayacaksınız. Romantik bir kaçamak veya doğayla baş başa kalmak isteyenler için ideal bir seçim.",
    shortDescription: "Göl manzaralı özel iskeleli lüks bungalov",
    pricePerNight: 950,
    capacity: {
      adults: 2,
      children: 1
    },
    size: 40,
    images: [
      {
        id: "2-1",
        url: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        alt: "Göl Kenarı Bungalov dış görünüm"
      },
      {
        id: "2-2",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        alt: "Göl Kenarı Bungalov teras"
      },
      {
        id: "2-3",
        url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
        alt: "Göl Kenarı Bungalov yatak odası"
      }
    ],
    features: [
      { id: "f1", name: "Göl Manzarası", icon: "droplets" },
      { id: "f2", name: "Özel İskele", icon: "anchor" },
      { id: "f3", name: "Jakuzi", icon: "bath" },
      { id: "f4", name: "Ücretsiz Wi-Fi", icon: "wifi" },
      { id: "f5", name: "Tam Donanımlı Mutfak", icon: "utensils" }
    ],
    available: true
  },
  {
    id: "3",
    name: "Dağ Evi Bungalov",
    slug: "dag-evi",
    description: "Dağların zirvesinde yer alan bu rustik bungalov, doğa tutkunlarına unutulmaz bir deneyim sunuyor. Geniş pencereleri ile panoramik dağ manzarasını odanıza taşıyan bu özel konaklama seçeneğimiz, şehrin gürültüsünden uzakta, yıldızların altında huzurlu bir tatil vaat ediyor. Ahşap detaylarla tasarlanmış iç mekanı, sıcak bir atmosfer yaratırken modern konforlardan da ödün vermiyor. Özel teras alanında akşam yemeklerinizi yıldızların altında yiyebilir, sabahları ise dağ havasının tazeliğinde uyanabilirsiniz.",
    shortDescription: "Dağ zirvesinde panoramik manzaralı rustik bungalov",
    pricePerNight: 850,
    capacity: {
      adults: 4,
      children: 2
    },
    size: 65,
    images: [
      {
        id: "3-1",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        alt: "Dağ Evi Bungalov dış görünüm"
      },
      {
        id: "3-2",
        url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
        alt: "Dağ Evi Bungalov iç mekan"
      },
      {
        id: "3-3",
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
        alt: "Dağ Evi Bungalov yatak odası"
      }
    ],
    features: [
      { id: "f1", name: "Dağ Manzarası", icon: "mountain" },
      { id: "f2", name: "Barbekü Alanı", icon: "flame" },
      { id: "f3", name: "Şömine", icon: "flame" },
      { id: "f4", name: "Geniş Teras", icon: "layout" },
      { id: "f5", name: "Ücretsiz Wi-Fi", icon: "wifi" }
    ],
    available: true
  }
];

export const getBungalowBySlug = (slug: string): Bungalow | undefined => {
  return bungalows.find(bungalow => bungalow.slug === slug);
};

export const getBungalowById = (id: string): Bungalow | undefined => {
  return bungalows.find(bungalow => bungalow.id === id);
};

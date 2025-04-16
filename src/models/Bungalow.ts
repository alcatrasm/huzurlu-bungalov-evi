
export interface BungalowImage {
  id: string;
  url: string;
  alt?: string;
}

export interface BungalowFeature {
  id: string;
  name: string;
  icon: string;
}

export interface Bungalow {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: number;
  features: BungalowFeature[];
  images: BungalowImage[];
  available: boolean;
}

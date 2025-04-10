
export interface BungalowImage {
  id: string;
  url: string;
  alt: string;
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
  shortDescription: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: number; // in square meters
  images: BungalowImage[];
  features: BungalowFeature[];
  availability?: {
    from: string;
    to: string;
  }[];
}

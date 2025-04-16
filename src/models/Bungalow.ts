
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
  features: string[];
  images: {
    url: string;
    alt?: string;
  }[];
  available: boolean;
}

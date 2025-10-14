export interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  images: string[];
  colors?: string[];
  details: string;
  slug: {
    current: string;
  };
}
export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean
}
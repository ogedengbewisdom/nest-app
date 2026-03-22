export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}


export interface ProductProperty {
  color: string;
  weight: string;
}

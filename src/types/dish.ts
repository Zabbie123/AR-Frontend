export interface Dish {
  _id: string;
  restaurantId: string;
  name: string;
  price: number;
  category: 'Starter' | 'Main' | 'Dessert' | 'Beverage';
  description?: string;
  image?: string;
  model3d?: string;
  tags: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDishRequest {
  name: string;
  price: number;
  category: 'Starter' | 'Main' | 'Dessert' | 'Beverage';
  description?: string;
  image?: string;
  model3d?: string;
  tags: string[];
  isVisible?: boolean;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  restaurantId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'super_admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}
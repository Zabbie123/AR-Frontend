export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OperatingHours {
  day: string;
  openTime: string;
  closeTime: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  contactNumber: string;
  email: string;
  address: Address;
  operatingHours: OperatingHours[];
  themeColor: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRestaurantRequest {
  name?: string;
  description?: string;
  logo?: string;
  contactNumber?: string;
  email?: string;
  address?: Partial<Address>;
  operatingHours?: OperatingHours[];
  themeColor?: string;
}
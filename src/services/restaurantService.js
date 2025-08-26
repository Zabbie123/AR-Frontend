import api from './api';

export const restaurantService = {
  getRestaurant: () => {
    return api.get('/restaurants');
  },
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  getRestaurantBySlug: (slug) => api.get(`/restaurants/slug/${slug}`),
  getRestaurantDishes: (id) => {
    return api.get(`/restaurants/${id}/dishes`)
  },
  updateRestaurant: (id, restaurantData) => api.put(`/restaurants/${id}`, restaurantData),
  createRestaurant: (restaurantData) => api.post('/restaurants', restaurantData),
  uploadLogo: (logoData) => api.post('/upload/image', logoData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};
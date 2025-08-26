// frontend/src/services/dishService.js
import api from './api';

export const dishService = {
  getDishes: () => {
    return api.get('/dishes');
  },
  getDish: (id) => api.get(`/dishes/${id}`),
  createDish: (dishData) => {
    return api.post('/dishes', dishData);
  },
  updateDish: (id, dishData) => api.put(`/dishes/${id}`, dishData),
  deleteDish: (id) => api.delete(`/dishes/${id}`),
  toggleVisibility: (id) => api.put(`/dishes/${id}/toggle-visibility`),
  uploadImage: (imageData) => api.post('/upload/image', imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  uploadModel: (modelData) => api.post('/upload/model', modelData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};
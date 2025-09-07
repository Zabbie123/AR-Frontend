// frontend/src/context/RestaurantContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { restaurantService } from '../services/restaurantService';
import { dishService } from '../services/dishService';
import { AuthContext } from './AuthContext';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user?.restaurantId) {
        try {
          setLoading(true);
          setError(null);
          
          const restaurantResponse = await restaurantService.getRestaurant();
          setRestaurant(restaurantResponse.data);
          
          // Fetch dishes
          const dishesResponse = await dishService.getDishes();
          setDishes(dishesResponse.data);
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
          setError(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  const refreshData = async () => {    
    if (isAuthenticated && user?.restaurantId) {
      try {
        setLoading(true);
        setError(null);
        
        const restaurantResponse = await restaurantService.getRestaurant();
        setRestaurant(restaurantResponse.data);
        
        // Fetch dishes
        const dishesResponse = await dishService.getDishes();
        setDishes(dishesResponse.data);
      } catch (error) {
        console.error('Error refreshing data:', error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        dishes,
        loading,
        error,
        setDishes,
        refreshData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
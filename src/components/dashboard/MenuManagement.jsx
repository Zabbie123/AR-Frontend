// frontend/src/components/dashboard/MenuManagement.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

const MenuManagement = () => {
  const { user } = useContext(AuthContext);
  const { restaurant, dishes, loading, error, refreshData } = useContext(RestaurantContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If there's an error
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6"></h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error: {error}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={refreshData} variant="secondary">Retry</Button>
          <a href="/profile" className="btn-primary">Set Up Restaurant</a>
        </div>
      </div>
    );
  }

  // If the user doesn't have a restaurantId
  if (!user?.restaurantId._id) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6"></h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to set up your restaurant profile before you can manage your menu.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a href="/profile" className="btn-primary">Set Up Restaurant</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Menu Management</h2>
        <div className="flex space-x-2">
          <Button onClick={refreshData} variant="secondary">Refresh Data</Button>
          <a href="/menu/add" className="btn-primary">Add New Dish</a>
        </div>
      </div>
      
      {dishes.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="mb-4">You haven't added any dishes to your menu yet.</p>
          <a href="/menu/add" className="btn-primary">Add Your First Dish</a>
        </div>
      ) : (
        <div className="dishes-grid">
          {dishes.map(dish => (
            <div key={dish._id} className="dish-card">
              {dish.image && (
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />
                </div>
              )}
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p className="dish-price">${dish.price.toFixed(2)}</p>
                <p className="dish-category">{dish.category}</p>
                <div className="dish-actions">
                  <a href={`/menu/edit/${dish._id}`} className="btn-secondary">Edit</a>
                  <button className="btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
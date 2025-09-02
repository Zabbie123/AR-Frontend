// frontend/src/components/dashboard/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { restaurant, dishes, loading } = useContext(RestaurantContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If the user is an admin but doesn't have a restaurant ID yet
  if (user?.role === 'admin' && !user?.restaurantId) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-white">Welcome, {user?.username}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Welcome to AR Restaurant Menu! To get started, you need to set up your restaurant profile.
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
      <h2 className="text-2xl font-bold mb-6 text-white">
        Welcome, {restaurant?.name || user?.username}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Dishes</h3>
          <p className="text-3xl font-bold">{dishes?.length || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-xl">
            {restaurant?.updatedAt 
              ? new Date(restaurant.updatedAt).toLocaleDateString() 
              : 'Never'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Menu Status</h3>
          <p className="text-xl font-bold text-green-600">Active</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/menu" className="btn-primary">Manage Menu</a>
          <a href="/profile" className="btn-secondary">Edit Profile</a>
          <a href="/preview" className="btn-secondary">Preview Menu</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
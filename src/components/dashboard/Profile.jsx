import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import LoadingSpinner from '../common/LoadingSpinner';
import RestaurantSetup from './RestaurantSetup';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { restaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user?.restaurantId || !restaurant) {
    return <RestaurantSetup />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Restaurant Profile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold pb-1 mb-2">Restaurant Information</h3>
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-700">Name:</span> {restaurant.name}</p>
            <p><span className="font-semibold text-gray-700">Email:</span> {restaurant.email}</p>
            <p><span className="font-semibold text-gray-700">Phone:</span> {restaurant.contactNumber}</p>
            <p><span className="font-semibold text-gray-700">Description:</span> {restaurant.description}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold pb-1 mb-2">Address</h3>
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-700">Street:</span> {restaurant.address.street}</p>
            <p><span className="font-semibold text-gray-700">City/State:</span> {restaurant.address.city}, {restaurant.address.state}</p>
            <p><span className="font-semibold text-gray-700">Country/Zip:</span> {restaurant.address.country}, {restaurant.address.zipCode}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Operating Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurant.operatingHours.map((hours, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded">
              <p className="font-semibold text-gray-700">{hours.day}</p>
              <p>{hours.openTime} - {hours.closeTime}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <a href="/profile/edit" className="btn-primary">Edit Restaurant</a>
      </div>
    </div>
  );
};

export default Profile;



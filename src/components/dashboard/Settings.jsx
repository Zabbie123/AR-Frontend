import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const { restaurant, loading } = useContext(RestaurantContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      {/* Page Heading */}
      <h2 className="text-lg sm:text-xl font-semibold mb-6">Settings</h2>
      
      {/* Account & Restaurant Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Account Settings */}
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-4">Account Settings</h3>
          <div className="bg-gray-50 p-4 sm:p-5 rounded-lg shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <p className="text-gray-900 break-words">{user?.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900 break-words">{user?.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <p className="text-gray-900">{user?.role}</p>
            </div>
            <div>
              <Button 
                onClick={logout} 
                variant="danger"
                className="w-full sm:w-auto"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Restaurant Settings */}
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-4">Restaurant Settings</h3>
          <div className="bg-gray-50 p-4 sm:p-5 rounded-lg shadow-sm">
            {restaurant ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                  <p className="text-gray-900 break-words">{restaurant.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-2 border border-gray-300" 
                      style={{ backgroundColor: restaurant.themeColor }}
                    ></div>
                    <span className="truncate">{restaurant.themeColor}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Menu URL</label>
                  <div className="flex flex-col sm:flex-row">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/menu/${restaurant.slug}`} 
                      readOnly 
                      className="flex-1 px-3 py-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md text-sm w-full"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/menu/${restaurant.slug}`);
                        alert('URL copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 text-sm w-full sm:w-auto"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <a 
                    href="/profile/edit" 
                    className="btn-primary block sm:inline-block text-center"
                  >
                    Edit Restaurant Profile
                  </a>
                </div>
              </>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">No restaurant profile found.</p>
                <a 
                  href="/profile" 
                  className="btn-primary block sm:inline-block text-center"
                >
                  Set Up Restaurant
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* App Information */}
      <div className="mt-8">
        <h3 className="text-base sm:text-lg font-medium mb-4">App Information</h3>
        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg shadow-sm text-sm text-gray-600">
          <p className="mb-2"><strong>Version:</strong> 1.0.0</p>
          <p className="mb-2"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Support:</strong> support@armenu.com</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

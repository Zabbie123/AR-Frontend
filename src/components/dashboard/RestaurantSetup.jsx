// frontend/src/components/dashboard/RestaurantSetup.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import { restaurantService } from '../../services/restaurantService';
import { authService } from '../../services/authService';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

const RestaurantSetup = () => {
  const { user, setUser } = useContext(AuthContext);
  const { restaurant, loading, refreshData } = useContext(RestaurantContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactNumber: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    operatingHours: [
      { day: 'Monday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Tuesday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Wednesday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Thursday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Friday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Saturday', openTime: '09:00', closeTime: '22:00' },
      { day: 'Sunday', openTime: '09:00', closeTime: '22:00' }
    ],
    themeColor: '#000000'
  });
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        description: restaurant.description || '',
        contactNumber: restaurant.contactNumber || '',
        email: restaurant.email || '',
        address: restaurant.address || {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        operatingHours: restaurant.operatingHours || [
          { day: 'Monday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Tuesday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Wednesday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Thursday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Friday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Saturday', openTime: '09:00', closeTime: '22:00' },
          { day: 'Sunday', openTime: '09:00', closeTime: '22:00' }
        ],
        themeColor: restaurant.themeColor || '#000000'
      });
      setIsEditing(true);
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value
        }
      });
    } else if (name.startsWith('operatingHours')) {
      const [_, index, field] = name.split('.');
      const newHours = [...formData.operatingHours];
      newHours[index] = {
        ...newHours[index],
        [field]: value
      };
      setFormData({
        ...formData,
        operatingHours: newHours
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let logoUrl = formData.logo;

      // Upload logo if new file selected
      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append('image', logoFile);
        const logoResponse = await restaurantService.uploadLogo(logoFormData);
        logoUrl = logoResponse.data.filePath;
      }

      const restaurantData = {
        ...formData,
        logo: logoUrl,
      };

      if (isEditing) {
        await restaurantService.updateRestaurant(user.restaurantId._id, restaurantData);
      } else {
        // Create new restaurant
        await restaurantService.createRestaurant(restaurantData);

        // Refresh user data to get the updated restaurantId
        const userResponse = await authService.getProfile();
        setUser(userResponse.data.user);
      }

      // Refresh restaurant data
      await refreshData();
    } catch (err) {
      console.error('Error saving restaurant:', err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? 'Edit Restaurant Profile' : 'Set Up Your Restaurant'}
      </h2>

      {!isEditing && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Welcome! Let's set up your restaurant profile first. Once you've saved your restaurant information, you can create your menu.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="themeColor">Theme Color</label>
            <input
              type="color"
              id="themeColor"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Address</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Operating Hours</label>
          <div className="space-y-4">
            {formData.operatingHours.map((hours, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label>{hours.day}</label>
                </div>
                <div>
                  <input
                    type="time"
                    name={`operatingHours.${index}.openTime`}
                    value={hours.openTime}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name={`operatingHours.${index}.closeTime`}
                    value={hours.closeTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">Restaurant Logo</label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleLogoChange}
            accept="image/*"
          />
          {formData.logo && (
            <div className="mt-2">
              <img
                src={formData.logo}
                alt="Restaurant logo"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : (isEditing ? 'Update Restaurant' : 'Create Restaurant')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantSetup;
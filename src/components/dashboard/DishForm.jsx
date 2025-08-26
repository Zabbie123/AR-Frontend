import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import { dishService } from '../../services/dishService';
import Button from '../common/Button';

const DishForm = () => {
  const { id } = useParams(); // dish ID if editing
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { restaurant } = useContext(RestaurantContext);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    model3dglb: '',
    model3dusdz: '',
    tags: '',
    isVisible: true,
  });

  const [glbmodelFile, setGlbModelFile] = useState(null);
  const [usdzmodelFile, setUsdzModelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchDish = async () => {
        try {
          const response = await dishService.getDish(id);
          const dish = response.data;
          setFormData({
            name: dish.name,
            price: dish.price,
            category: dish.category,
            description: dish.description,
            image: dish.image,
            model3dglb: dish.model3dglb,
            model3dusdz: dish.model3dusdz,
            tags: dish.tags.join(', '),
            isVisible: dish.isVisible,
          });
        } catch (err) {
          console.error('Error fetching dish:', err);
          setError(err.response?.data?.message || 'Error fetching dish');
        }
      };
      fetchDish();
    }
  }, [id, user, restaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGlbModelChange = (e) => {
    setGlbModelFile(e.target.files[0]);
  };

  const handleUsdzModelChange = (e) => {
    setUsdzModelFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!user?.restaurantId) {
        throw new Error('Restaurant not found. Please set up your restaurant first.');
      }

      let imageUrl = formData.image;
      let glbmodelUrl = formData.model3dglb;
      let usdzmodelUrl = formData.model3dusdz;

      if (glbmodelFile) {
        const glbmodelFormData = new FormData();
        glbmodelFormData.append('model', glbmodelFile);
        const modelResponse = await dishService.uploadModel(glbmodelFormData);
        glbmodelUrl = modelResponse.data.filePath;
      }

      if (usdzmodelFile) {
        const usdzmodelFormData = new FormData();
        usdzmodelFormData.append('model', usdzmodelFile);
        const modelResponse = await dishService.uploadModel(usdzmodelFormData);
        usdzmodelUrl = modelResponse.data.filePath;
      }

      const dishData = {
        ...formData,
        restaurantId: user?.restaurantId?._id || user?.restaurantId,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: imageUrl,
        model3dglb: glbmodelUrl,
        model3dusdz: usdzmodelUrl,
      };

      if (isEditing) {
        await dishService.updateDish(id, dishData);
        setSuccess('Dish updated successfully!');
      } else {
        await dishService.createDish(dishData);
        setSuccess('Dish added successfully!');
        setFormData({
          name: '',
          price: '',
          category: '',
          description: '',
          image: '',
          model3dglb: '',
          model3dusdz: '',
          tags: '',
          isVisible: true,
        });
        setGlbModelFile(null);
        setUsdzModelFile(null);
      }

    } catch (err) {
      console.error('Error saving dish:', err);
      setError(err.response?.data?.message || err.message || 'Error saving dish');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">{isEditing ? 'Edit Dish' : 'Add New Dish'}</h2>

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name">Dish Name</label>
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
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              list="categories"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Select or type a category"
              required
            />
            <datalist id="categories">
              <option value="Starter" />
              <option value="Main" />
              <option value="Dessert" />
              <option value="Beverage" />
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., spicy, vegan, gluten-free"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="model3dglb">3D Model (.glb)</label>
            <input type="file" id="model3dglb" name="model3dglb" onChange={handleGlbModelChange} accept=".glb,.gltf" />
            {formData.model3dglb && (
              <div className="mt-2">
                <p>Current model: {formData.model3dglb.split('/').pop()}</p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="model3dusdz">3D Model (.usdz)</label>
            <input type="file" id="model3dusdz" name="model3dusdz" onChange={handleUsdzModelChange} accept=".usdz" required />
            {formData.model3dusdz && (
              <div className="mt-2">
                <p>Current model: {formData.model3dusdz.split('/').pop()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="isVisible"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
          />
          <label htmlFor="isVisible">Show in Menu</label>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:space-x-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/menu')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Dish' : 'Add Dish')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DishForm;

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { restaurantService } from "../../services/restaurantService";


const MenuItemCard = ({ item }) => {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const modelViewerRefs = useRef({});

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const restaurantResponse = await restaurantService.getRestaurantBySlug(
          restaurantSlug
        );
        setRestaurant(restaurantResponse.data);
        setRestaurantId(restaurantResponse.data._id);

        const dishesResponse = await restaurantService.getRestaurantDishes(
          restaurantResponse.data._id
        );
        const visibleDishes = dishesResponse.data.filter((dish) => dish.isVisible);
        setDishes(visibleDishes);

        const uniqueCategories = [
          ...new Set(visibleDishes.map((dish) => dish.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantSlug]);

  const handleARClick = (dishId) => {
    const viewer = modelViewerRefs.current[dishId];
    if (viewer) viewer.activateAR();
  };

  return (
    <div className="py-8 border-b border-brand-accent/20 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-text pr-4">{item.name}</h3>
        <p className="font-sans text-lg md:text-xl font-bold text-brand-accent whitespace-nowrap">{item.price}</p>
      </div>
      <p className="font-sans text-brand-text opacity-80 text-sm sm:text-base flex-grow mb-4">
        {item.description}
      </p>
      <div className="flex justify-between items-center">
        <div>
          {item.tags && (
            <span className="text-xs font-bold uppercase tracking-wider bg-brand-accent text-brand-bg-contrast px-2 py-1 rounded">
              {item.tags}
            </span>
          )}
        </div>
        <div>
          <model-viewer
            ref={(el) => (modelViewerRefs.current[item._id] = el)}
            src={`https://api.thezabbie.com/uploads/models/${restaurantId}/${item.name}.glb`}
            ios-src={`https://api.thezabbie.com/uploads/models/${restaurantId}/${item.name}.usdz`}
            alt={item.name}
            ar
            ar-modes="scene-viewer quick-look webxr"
            auto-rotate
            camera-controls
            style={{ display: "none" }}
          ></model-viewer>
          <button
            onClick={() => handleARClick(item._id)}
            className="flex items-center space-x-2 bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-bg-contrast font-semibold py-1 px-3 rounded-full text-xs transition-colors duration-300"
            aria-label={`View ${item.name} in Augmented Reality`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>View in AR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
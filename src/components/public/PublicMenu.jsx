// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// // import '@google/model-viewer';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { restaurantService } from '../../services/restaurantService';

// const PublicMenu = () => {
//   const { restaurantSlug } = useParams();
//   const [restaurant, setRestaurant] = useState({});
//   const [restaurantId, setRestaurantId] = useState(null)
//   const [dishes, setDishes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDish, setSelectedDish] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const modelViewerRef = useRef(null);

//   const handleViewAR = () => {
//     if (modelViewerRef.current) {
//       // Call the activateAR() function from model-viewer
//       modelViewerRef.current.activateAR();
//     }
//   };

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         setLoading(true);
//         // Fetch restaurant details
//         const restaurantResponse = await restaurantService.getRestaurantBySlug(restaurantSlug);
//         setRestaurant(restaurantResponse.data);
//         setRestaurantId(restaurantResponse.data._id);
//         const dishesResponse = await restaurantService.getRestaurantDishes(restaurantResponse.data._id);
//         const visibleDishes = dishesResponse.data.filter(dish => dish.isVisible);
//         setDishes(visibleDishes);

//         // Extract unique categories
//         const uniqueCategories = [...new Set(visibleDishes.map(dish => dish.category))];
//         setCategories(uniqueCategories);
//       } catch (err) {
//         console.error('Error fetching restaurant data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurantData();
//   }, [restaurantSlug]);

//   const filteredDishes = selectedCategory === 'all'
//     ? dishes
//     : dishes.filter(dish => dish.category === selectedCategory);

//   const openDishViewer = (dish) => {
//     setSelectedDish(dish);
//   };
//   const closeDishViewer = () => {
//     setSelectedDish(null);
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!restaurant) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
//           <p className="text-gray-600">The restaurant you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{restaurant.name} Menu</title>
//         <meta name="description" content={restaurant.description} />
//         <meta property="og:title" content={`${restaurant.name} Menu`} />
//         <meta property="og:description" content={restaurant.description} />
//         <meta property="og:image" content={restaurant.logo || ''} />
//       </Helmet>

//       <div className="public-menu" style={{ '--theme-color': restaurant.themeColor }}>
//         <header className="bg-white shadow-md py-8 px-4">
//           <div className="max-w-6xl mx-auto">
//             {restaurant.logo && (
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={restaurant.logo}
//                   alt={restaurant.name}
//                   className="h-24 object-contain"
//                 />
//               </div>
//             )}
//             <h1 className="text-3xl font-bold text-center">{restaurant.name}</h1>
//             <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
//               {restaurant.description}
//             </p>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto py-8 px-4">
//           <div className="flex flex-wrap justify-center gap-2 mb-8">
//             <button
//               className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200'}`}
//               onClick={() => setSelectedCategory('all')}
//             >
//               All Items
//             </button>
//             {categories.map(category => (
//               <button
//                 key={category}
//                 className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-200'}`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredDishes.length > 0 ? (
//               filteredDishes.map(dish => (
//                 <div
//                   key={dish._id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
//                   onClick={() => openDishViewer(dish)}
//                 >
//                   <div className="p-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-lg font-semibold">{dish.name}</h3>
//                       <p className="text-lg font-bold">₹{dish.price.toFixed(2)}</p>
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2 line-clamp-2">{dish.description}</p>
//                     {dish.tags.length > 0 && (
//                       <div className="mt-3 flex flex-wrap gap-1">
//                         {dish.tags.map((tag, index) => (
//                           <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-gray-500">No dishes available in this category</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {selectedDish && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <button onClick={closeDishViewer} className="absolute top-4 right-4 text-white bg-black rounded-full p-2 z-10">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   <div>
//                     <model-viewer
//                       ref={modelViewerRef}
//                       src={`https://ar-backend-fmqm.onrender.com/uploads/model/${restaurantId}/${selectedDish.name}.glb`}
//                       ios-src={`https://ar-backend-fmqm.onrender.com/uploads/model/${restaurantId}/model.usdz`}
//                       alt="3D Chair"
//                       ar
//                       ar-modes="scene-viewer quick-look webxr"
//                       auto-rotate
//                       camera-controls
//                       style={{ width: "500px", height: "500px" }}
//                     ></model-viewer>
//                     <button onClick={handleViewAR} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
//                       View in AR
//                     </button>
//                   </div>

//                   <div>
//                     <h2 className="text-2xl font-bold mb-2">{selectedDish.name}</h2>
//                     <p className="text-xl font-bold mb-4">₹{selectedDish.price.toFixed(2)}</p>
//                     <p className="text-gray-700 mb-6">{selectedDish.description}</p>

//                     {selectedDish.tags.length > 0 && (
//                       <div className="mb-6">
//                         <h3 className="font-semibold mb-2">Tags</h3>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedDish.tags.map((tag, index) => (
//                             <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h3 className="font-semibold mb-2">Restaurant Information</h3>
//                       <p className="text-gray-700">
//                         {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}
//                       </p>
//                       <p className="text-gray-700 mt-1">
//                         {restaurant.contactNumber} | {restaurant.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <footer className="bg-gray-100 py-8 px-4 mt-12">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="font-semibold mb-2">Contact Information</h3>
//               <p className="text-gray-700">
//                 {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipCode}
//               </p>
//               <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
//               <p className="text-gray-700">{restaurant.email}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2">Operating Hours</h3>
//               {restaurant.operatingHours.map((hours, index) => (
//                 <p key={index} className="text-gray-700">
//                   {hours.day}: {hours.openTime} - {hours.closeTime}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default PublicMenu;


import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../common/LoadingSpinner";
import { restaurantService } from "../../services/restaurantService";

const PublicMenu = () => {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Store refs for each dish model-viewer
  const modelViewerRefs = useRef({});

  const handleViewAR = (dishId) => {
    const viewer = modelViewerRefs.current[dishId];
    if (viewer) {
      viewer.activateAR();
    }
  };

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
        const visibleDishes = dishesResponse.data.filter(
          (dish) => dish.isVisible
        );
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

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <p className="text-gray-600">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{restaurant.name} Menu</title>
        <meta name="description" content={restaurant.description} />
        <meta property="og:title" content={`${restaurant.name} Menu`} />
        <meta property="og:description" content={restaurant.description} />
        <meta property="og:image" content={restaurant.logo || ""} />
      </Helmet>

      <div
        className="public-menu"
        style={{ "--theme-color": restaurant.themeColor }}
      >
        <header className="bg-white shadow-md py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {restaurant.logo && (
              <div className="flex justify-center mb-4">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-24 object-contain"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold text-center">
              {restaurant.name}
            </h1>
            <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
              {restaurant.description}
            </p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dish Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <div
                  key={dish._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{dish.name}</h3>
                      <p className="text-lg font-bold">
                        ₹{dish.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {dish.description}
                    </p>
                    {dish.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {dish.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Hidden model-viewer for each dish */}
                    <model-viewer
                      ref={(el) => (modelViewerRefs.current[dish._id] = el)}
                      src={`https://ar-backend-fmqm.onrender.com/uploads/model/${restaurantId}/${dish.name}.glb`}
                      ios-src={`https://ar-backend-fmqm.onrender.com/uploads/model/${restaurantId}/${dish.name}.usdz`}
                      alt={dish.name}
                      ar
                      ar-modes="scene-viewer quick-look webxr"
                      camera-controls
                      auto-rotate
                      style={{ display: "none" }}
                    ></model-viewer>

                    {/* ✅ Direct View in AR Button */}
                    <button
                      onClick={() => handleViewAR(dish._id)}
                      className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                    >
                      View in AR
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No dishes available in this category
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="bg-gray-100 py-8 px-4 mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-gray-700">
                {restaurant.address.street}, {restaurant.address.city},{" "}
                {restaurant.address.state} {restaurant.address.zipCode}
              </p>
              <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
              <p className="text-gray-700">{restaurant.email}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Operating Hours</h3>
              {restaurant.operatingHours.map((hours, index) => (
                <p key={index} className="text-gray-700">
                  {hours.day}: {hours.openTime} - {hours.closeTime}
                </p>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PublicMenu;
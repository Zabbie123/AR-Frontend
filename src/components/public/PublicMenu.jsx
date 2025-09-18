// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { Search } from "lucide-react";
// import LoadingSpinner from "../common/LoadingSpinner";
// import { restaurantService } from "../../services/restaurantService";

// const PublicMenu = () => {
//   const { restaurantSlug } = useParams();
//   const [restaurant, setRestaurant] = useState({});
//   const [restaurantId, setRestaurantId] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const modelViewerRefs = useRef({});

//   const handleViewAR = (dishId) => {
//     const viewer = modelViewerRefs.current[dishId];
//     if (viewer) viewer.activateAR();
//   };

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         setLoading(true);
//         const restaurantResponse = await restaurantService.getRestaurantBySlug(restaurantSlug);
//         setRestaurant(restaurantResponse.data);
//         setRestaurantId(restaurantResponse.data._id);

//         const dishesResponse = await restaurantService.getRestaurantDishes(restaurantResponse.data._id);
//         const visibleDishes = dishesResponse.data.filter((dish) => dish.isVisible);
//         setDishes(visibleDishes);

//         const uniqueCategories = [...new Set(visibleDishes.map((dish) => dish.category))];
//         setCategories(uniqueCategories);
//       } catch (err) {
//         console.error("Error fetching restaurant data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurantData();
//   }, [restaurantSlug]);

//   const filteredDishes = dishes.filter((dish) => {
//     const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
//     const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (loading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>{restaurant.name} Menu</title>
//         <meta name="description" content={restaurant.description} />
//       </Helmet>

//       <div className="public-menu bg-gray-50 min-h-screen" style={{ "--theme-color": restaurant.themeColor }}>
//         {/* Header */}
//         <header className="bg-white shadow-md py-6 px-4 sticky top-0 z-20">
//           <div className="max-w-6xl mx-auto text-center">
//             {restaurant.logo && (
//               <img src={restaurant.logo} alt={restaurant.name} className="h-20 mx-auto object-contain" />
//             )}
//             <h1 className="text-3xl font-bold mt-3 text-gray-900">{restaurant.name}</h1>
//             <p className="text-gray-600 mt-2">{restaurant.description}</p>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto py-8 px-4">
//           {/* Search Bar */}
//           <div className="flex justify-center mb-6">
//             <div className="flex items-center w-full max-w-lg bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
//               <Search className="text-gray-500 mr-3" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search for dishes..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full outline-none text-gray-700 bg-transparent"
//               />
//             </div>
//           </div>

//           {/* Category Filters - Horizontal Scrollable */}
//           <div className="mb-8 overflow-x-auto scrollbar-hide">
//             <div className="flex gap-3 min-w-max px-2">
//               <button
//                 className={`px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${selectedCategory === "all"
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "bg-gray-200 hover:bg-gray-300"
//                   }`}
//                 onClick={() => setSelectedCategory("all")}
//               >
//                 All Items
//               </button>

//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   className={`px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${selectedCategory === category
//                       ? "bg-indigo-600 text-white shadow-md"
//                       : "bg-gray-200 hover:bg-gray-300"
//                     }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Dishes Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredDishes.length > 0 ? (
//               filteredDishes.map((dish) => (
//                 <div
//                   key={dish._id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
//                 >
//                   <div className="p-5 flex flex-col h-full">
//                     <div className="flex justify-between items-start mb-3">
//                       <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
//                       <p className="text-lg font-bold text-indigo-600">₹{dish.price.toFixed(2)}</p>
//                     </div>
//                     <p className="text-gray-600 text-sm line-clamp-2 mb-3">{dish.description}</p>
//                     {dish.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {dish.tags.map((tag, index) => (
//                           <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Hidden model-viewer */}
//                     <model-viewer
//                       ref={(el) => (modelViewerRefs.current[dish._id] = el)}
//                       src={`http://localhost:5000/uploads/model/${restaurantId}/${dish.name}.glb`}
//                       ios-src={`http://localhost:5000/uploads/model/${restaurantId}/${dish.name}.usdz`}
//                       alt={dish.name}
//                       ar
//                       ar-modes="scene-viewer quick-look webxr"
//                       auto-rotate
//                       camera-controls
//                       style={{ display: "none" }}
//                     ></model-viewer>

//                     {/* View in AR Button */}
//                     <div className="mt-auto flex justify-end">
//                       <button
//                         onClick={() => handleViewAR(dish._id)}
//                         className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition"
//                       >
//                         View in AR
//                       </button>
//                     </div>
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

//         {/* Footer */}
//         <footer className="bg-gray-100 py-8 px-4 mt-12">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="font-semibold mb-2 text-gray-900">Contact Information</h3>
//               <p className="text-gray-700">
//                 {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.zipCode}
//               </p>
//               <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
//               <p className="text-gray-700">{restaurant.email}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2 text-gray-900">Operating Hours</h3>
//               {restaurant.operatingHours?.map((hours, index) => (
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
import { Search } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
import { restaurantService } from "../../services/restaurantService";

const PublicMenu = () => {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const modelViewerRefs = useRef({});

  const handleViewAR = (dishId) => {
    const viewer = modelViewerRefs.current[dishId];
    if (viewer) viewer.activateAR();
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const restaurantResponse = await restaurantService.getRestaurantBySlug(restaurantSlug);
        setRestaurant(restaurantResponse.data);
        setRestaurantId(restaurantResponse.data._id);

        const dishesResponse = await restaurantService.getRestaurantDishes(restaurantResponse.data._id);
        const visibleDishes = dishesResponse.data.filter((dish) => dish.isVisible);
        setDishes(visibleDishes);

        const uniqueCategories = [...new Set(visibleDishes.map((dish) => dish.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantSlug]);

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>{restaurant.name} Menu</title>
        <meta name="description" content={restaurant.description} />
      </Helmet>

      <div className="public-menu bg-white min-h-screen text-gray-800" style={{ "--theme-color": restaurant.themeColor }}>
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-20 border-b border-gray-200">
          <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {restaurant.logo && (
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-14 w-14 rounded-full object-cover border border-gray-200 shadow-sm"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
                <p className="text-gray-500 text-sm">{restaurant.description}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-3 shadow-inner">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 text-base"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-6xl mx-auto px-4 mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max pb-2">
            <button
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${selectedCategory === "all"
                  ? "bg-orange-500 text-white border-orange-500 shadow-md"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              onClick={() => setSelectedCategory("all")}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${selectedCategory === category
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes List */}
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    {/* Veg / Non-Veg Icon */}
                    <div className="flex items-center gap-2 mb-1">
                      {/* <span
                        className={`h-3 w-3 rounded-full border ${
                          dish.veg ? "bg-green-500 border-green-500" : "bg-red-500 border-red-500"
                        }`}
                      ></span> */}
                      <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{dish.description}</p>
                    <p className="text-xl font-bold text-gray-900">₹{dish.price.toFixed(2)}</p>
                    {dish.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dish.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-between mt-5">
                    {dish.image && (
                      <img
                        src={`http://localhost:5000/uploads/image/${restaurantId}/${dish.image}`}
                        alt={dish.name}
                        className="h-28 w-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    )}

                    <model-viewer
                      ref={(el) => (modelViewerRefs.current[dish._id] = el)}
                      src={`http://localhost:5000/uploads/model/${restaurantId}/${dish.name}.glb`}
                      ios-src={`http://localhost:5000/uploads/model/${restaurantId}/${dish.name}.usdz`}
                      alt={dish.name}
                      ar
                      ar-modes="scene-viewer quick-look webxr"
                      auto-rotate
                      camera-controls
                      style={{ display: "none" }}
                    ></model-viewer>

                    <button
                      onClick={() => handleViewAR(dish._id)}
                      className="px-3 py-2 mt-2 rounded-lg bg-orange-500 text-white text-white-500 font-medium shadow hover:bg-orange-600 transition"
                    >
                      View in AR
                    </button>

                    <button
                      className="px-5 py-2 mt-2 rounded-lg border border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <img
                src="/empty-dishes.svg"
                alt="No Dishes"
                className="h-40 mx-auto mb-4"
              />
              <p className="text-gray-500 text-lg">No dishes available in this category</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 py-8 px-4 mt-12 border-t border-gray-200">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">Contact Information</h3>
              <p className="text-gray-700">
                {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.zipCode}
              </p>
              <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
              <p className="text-gray-700">{restaurant.email}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">Operating Hours</h3>
              {restaurant.operatingHours?.map((hours, index) => (
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

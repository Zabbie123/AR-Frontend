import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Grid, List } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
import { restaurantService } from "../../services/restaurantService";

// const PublicMenu = () => {
//   const { restaurantSlug } = useParams();
//   const [restaurant, setRestaurant] = useState({});
//   const [restaurantId, setRestaurantId] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("grid");
//   const modelViewerRefs = useRef({});

//   const handleViewAR = (dishId) => {
//     const viewer = modelViewerRefs.current[dishId];
//     if (viewer) viewer.activateAR();
//   };

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         setLoading(true);
//         const restaurantResponse = await restaurantService.getRestaurantBySlug(
//           restaurantSlug
//         );
//         setRestaurant(restaurantResponse.data);
//         setRestaurantId(restaurantResponse.data._id);

//         const dishesResponse = await restaurantService.getRestaurantDishes(
//           restaurantResponse.data._id
//         );
//         const visibleDishes = dishesResponse.data.filter((dish) => dish.isVisible);
//         setDishes(visibleDishes);

//         const uniqueCategories = [
//           ...new Set(visibleDishes.map((dish) => dish.category)),
//         ];
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
//     const matchesCategory =
//       selectedCategory === "all" || dish.category === selectedCategory;
//     const matchesSearch = dish.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (loading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>{restaurant.name} Menu</title>
//         <meta name="description" content={restaurant.description} />
//       </Helmet>

//       <div
//         className="public-menu bg-gray-50 min-h-screen"
//         style={{ "--theme-color": restaurant.themeColor }}
//       >
//         {/* Header */}
//         <header className="bg-white shadow-md py-6 px-4 sticky top-0 z-20">
//           <div className="max-w-6xl mx-auto text-center">
//             {restaurant.logo && (
//               <img
//                 src={restaurant.logo}
//                 alt={restaurant.name}
//                 className="h-20 mx-auto object-contain"
//               />
//             )}
//             <h1 className="text-3xl font-bold mt-3 text-gray-900">
//               {restaurant.name}
//             </h1>
//             <p className="text-gray-600 mt-2">{restaurant.description}</p>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto py-8 px-4">
//           {/* Search + View Switcher */}
//           <div className="flex justify-between items-center mb-6">
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

//             {/* View Mode Toggle - Mobile Only */}
//             <div className="ml-4 flex sm:hidden">
//               <button
//                 aria-label="Switch to grid view"
//                 className={`p-2 rounded-lg ${
//                   viewMode === "grid"
//                     ? "bg-indigo-100 text-indigo-600"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setViewMode("grid")}
//               >
//                 <Grid size={20} />
//               </button>
//               <button
//                 aria-label="Switch to list view"
//                 className={`ml-2 p-2 rounded-lg ${
//                   viewMode === "list"
//                     ? "bg-indigo-100 text-indigo-600"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setViewMode("list")}
//               >
//                 <List size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Category Filters */}
//           <div className="mb-8 overflow-x-auto scrollbar-hide">
//             <div className="flex gap-3 min-w-max px-2">
//               <button
//                 className={`px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
//                   selectedCategory === "all"
//                     ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//                 onClick={() => setSelectedCategory("all")}
//               >
//                 All Items
//               </button>
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   className={`px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
//                     selectedCategory === category
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
//                       : "bg-gray-200 hover:bg-gray-300"
//                   }`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Dishes */}
//           {filteredDishes.length > 0 ? (
//             <div
//               className={`${
//                 viewMode === "grid"
//                   ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" // ✅ 2 tiles min on mobile
//                   : "flex flex-col gap-4"
//               }`}
//             >
//               {filteredDishes.map((dish) => (
//                 <div
//                   key={dish._id}
//                   className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
//                     viewMode === "grid"
//                       ? "hover:scale-[1.02]"
//                       : "flex items-center p-4"
//                   }`}
//                 >
//                   <div
//                     className={
//                       viewMode === "list"
//                         ? "flex-1 pr-4"
//                         : "p-5 flex flex-col h-full"
//                     }
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
//                         {dish.name}
//                       </h3>
//                       <p
//                         className="text-lg font-bold"
//                         style={{
//                           color: restaurant.themeColor || "#6366F1",
//                         }}
//                       >
//                         ₹{dish.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <p className="text-gray-600 text-sm line-clamp-2 mb-2">
//                       {dish.description}
//                     </p>
//                     {dish.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {dish.tags.map((tag, index) => (
//                           <span
//                             key={index}
//                             className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Hidden model-viewer */}
//                     <model-viewer
//                       ref={(el) => (modelViewerRefs.current[dish._id] = el)}
//                       src={`http://localhost:5000/uploads/models/${restaurantId}/${dish.name}.glb`}
//                       ios-src={`http://localhost:5000/uploads/models/${restaurantId}/${dish.name}.usdz`}
//                       alt={dish.name}
//                       ar
//                       ar-modes="scene-viewer quick-look webxr"
//                       auto-rotate
//                       camera-controls
//                       style={{ display: "none" }}
//                     ></model-viewer>

//                     <button
//                       onClick={() => handleViewAR(dish._id)}
//                       className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
//                     >
//                       View in AR
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <p className="text-gray-500">
//                 No dishes available in this category
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <footer className="bg-gray-100 py-8 px-4 mt-12">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="font-semibold mb-2 text-gray-900">
//                 Contact Information
//               </h3>
//               <p className="text-gray-700">
//                 {restaurant.address?.street}, {restaurant.address?.city},{" "}
//                 {restaurant.address?.state} {restaurant.address?.zipCode}
//               </p>
//               <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
//               <p className="text-gray-700">{restaurant.email}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2 text-gray-900">
//                 Operating Hours
//               </h3>
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



import { motion } from 'framer-motion';

function Tag({ children }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium leading-4 bg-gray-100 text-gray-700">
      {children}
    </span>
  );
}

export default function RestaurantMenu() {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const modelViewerRefs = useRef({});

  // const handleViewAR = (dishId) => {
  //   const viewer = modelViewerRefs.current[dishId];
  //   console.log("AR triggered for:", dishId, viewer);
  //   if (viewer) viewer.activateAR();
  // };

  const handleViewAR = (dishId) => {
    const viewer = modelViewerRefs.current[dishId];
    if (!viewer) return console.warn("Viewer not found for", dishId);

    // Check if AR is available on this device
    if (!viewer.canActivateAR) {
      alert("AR not supported on this device/browser.");
      return;
    }

    try {
      viewer.activateAR();
    } catch (err) {
      console.error("Error triggering AR:", err);
      alert("Failed to start AR. Check browser and model compatibility.");
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

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>{restaurant.name} Menu</title>
        <meta name="description" content={restaurant.description} />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white p-6" style={{ "--theme-color": restaurant.themeColor }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <header className="px-10 py-8 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50 shadow-sm">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-start justify-between"
            >
              {restaurant.logo && (
                <img src={restaurant.logo} alt={restaurant.name} className="h-20 mx-auto object-contain" />
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-serif leading-tight">{restaurant.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{restaurant.description}</p>
              </div>
              {/* <div className="text-right">
                <p className="text-sm text-gray-600">Open Daily • 11:30 — 22:00</p>
                <p className="mt-1 text-sm text-gray-600">123 Harbor Lane • (555) 123‑4567</p>
              </div> */}
            </motion.div>
          </header>

          <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Search + View Switcher */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center w-full max-w-lg bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
                <Search className="text-gray-500 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none text-gray-700 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <main className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDishes.map((section, i) =>
              (

                <motion.section
                  key={section._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className=""
                >
                  <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                    <span className="w-2 h-8 mr-3 bg-amber-300 rounded-md inline-block shadow-md" />
                    {section.category}
                  </h2>
                  <div className="space-y-4">
                    <motion.article
                      key={section.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex justify-between items-start bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      <div className="pr-4">
                        <h3 className="text-base font-medium text-gray-900 flex items-center">{section.name}
                          {section.tags && section.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                        <div className="text-base font-semibold text-gray-800">₹{section.price}</div>
                      </div>
                      <model-viewer
                        ref={(el) => (modelViewerRefs.current[section._id] = el)}
                        src={`https://api.thezabbie.com/uploads/models/${restaurantId}/${section.name}.glb`}
                        ios-src={`https://api.thezabbie.com/uploads/models/${restaurantId}/${section.name}.usdz`}
                        alt={section.name}
                        ar
                        ar-modes="scene-viewer quick-look webxr"
                        auto-rotate
                        camera-controls
                        style={{ display: "none" }}
                      ></model-viewer>
                      {section.enableModel && (
                        <div className="text-right">
                          <button className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-green-300 hover:bg-green-400 shadow-sm transition-transform transform hover:scale-105" onClick={() => handleViewAR(section._id)}>AR View</button>
                        </div>
                      )}
                    </motion.article>
                  </div>
                </motion.section>
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 py-8 px-4 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">
                  Contact Information
                </h3>
                <p className="text-gray-700">
                  {restaurant.address?.street}, {restaurant.address?.city},{" "}
                  {restaurant.address?.state} {restaurant.address?.zipCode}
                </p>
                <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
                <p className="text-gray-700">{restaurant.email}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900">
                  Operating Hours
                </h3>
                {restaurant.operatingHours?.map((hours, index) => (
                  <p key={index} className="text-gray-700">
                    {hours.day}: {hours.openTime} - {hours.closeTime}
                  </p>
                ))}
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </>
  );
}

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RestaurantContext } from "../context/RestaurantContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const PreviewPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { restaurant, dishes, loading, setDishes } = useContext(RestaurantContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // ✅ Fetch 3D Model using dishId
  const fetchModel = (dishId, modelName) => {
    if (!dishId || !modelName) {
      alert("3D model not available!");
      return;
    }

    const url = `http://${window.location.hostname}:5000/api/upload/models/${dishId}/${modelName}`;
    window.open(url, "_blank");
  };

  const handleDeleteDish = async (dishId) => {
    if (!localStorage.getItem('token')) {
      alert("Session expired. Please log in again!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.delete(
        `http://${window.location.hostname}:5000/api/dishes/${dishId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if(response.status == 200){
        setDishes((prev) => (Array.isArray(prev) ? prev.filter((dish) => dish._id !== dishId) : []));
        alert("Dish deleted successfully!");
      }
      // setDishes((prev) => prev.filter((dish) => dish._id !== dishId));
    } catch (error) {
      console.error("Delete Dish Error:", error.response?.data || error.message);
      alert("Failed to delete dish. Please try again!");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user?.restaurantId || !restaurant) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-6">Menu Preview</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <p className="text-sm text-yellow-700">
            You need to set up your restaurant profile before you can preview your menu.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/profile")} variant="primary">
            Set Up Restaurant
          </Button>
        </div>
      </div>
    );
  }

  const categories = [...new Set(dishes.map((dish) => dish.category))];
  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const publicMenuUrl = `${window.location.protocol}//${window.location.hostname}/menu/${restaurant.slug}`;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-center sm:text-left">Menu Preview</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => setQrCodeModalOpen(true)}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Generate QR Code
          </Button>
          <Button
            onClick={() => window.open(publicMenuUrl, "_blank")}
            variant="primary"
            className="w-full sm:w-auto"
          >
            View Public Menu
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-center sm:text-left">{restaurant.name}</h3>
        <p className="text-gray-600 mb-4 text-center sm:text-left">{restaurant.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
          <button
            className={`px-3 py-1 text-sm rounded-full transition ${selectedCategory === "all"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-full transition ${selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No dishes available in this category.</p>
          <Button onClick={() => navigate("/menu/add")} variant="primary">
            Add Your First Dish
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
            >
              {dish.image && (
                <div className="h-48 overflow-hidden relative">
                  <button
                    onClick={() => fetchModel(dish._id, dish.model3d)}
                    className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg shadow-md hover:bg-blue-700"
                  >
                    View 3D
                  </button>
                </div>
              )}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{dish.name}</h3>
                  <p className="text-lg font-bold">₹{dish.price.toFixed(2)}</p>
                </div>
                <p className="text-gray-600 text-sm mb-3">{dish.description}</p>

                {dish.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {dish.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {dish.model3d && (
                  <div className="text-xs bg-gray-800 text-white text-center py-1 rounded mb-3">
                    3D/AR View Available
                  </div>
                )}

                {/* ✅ Edit & Delete Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => navigate(`/menu/edit/${dish._id}`)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteDish(dish._id)}
                    variant="danger"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    disabled={deleteLoading === dish._id}
                  >
                    {deleteLoading === dish._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      {qrCodeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Menu QR Code</h3>
              <button
                onClick={() => setQrCodeModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <QRCodeSVG
                  value={publicMenuUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu URL:
                </label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="text"
                    value={publicMenuUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicMenuUrl);
                      alert("URL copied to clipboard!");
                    }}
                    className="mt-2 sm:mt-0 px-3 py-2 bg-gray-200 border border-gray-300 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-gray-300"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <Button
                onClick={() => {
                  const svg = document.querySelector("svg");
                  const svgData = new XMLSerializer().serializeToString(svg);
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const pngUrl = canvas.toDataURL("image/png");
                    const downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = `${restaurant.name}-menu-qr.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  };
                  img.src =
                    "data:image/svg+xml;base64," +
                    btoa(unescape(encodeURIComponent(svgData)));
                }}
                variant="primary"
              >
                Download QR Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;

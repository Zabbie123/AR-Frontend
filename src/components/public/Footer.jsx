import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { restaurantService } from "../../services/restaurantService";
import LoadingSpinner from "../common/LoadingSpinner";

const Footer = () => {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const restaurantResponse = await restaurantService.getRestaurantBySlug(
          restaurantSlug
        );
        setRestaurant(restaurantResponse.data);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantSlug]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <hr/>
      <footer className="bg-brand-secondary-bg mt-7 py-12">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 text-center text-brand-text/70 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Contact Information
            </h3>
            <p className="text-gray-700">
              {restaurant.address?.street}, {restaurant.address?.city},{" "}
              {restaurant.address?.state} {restaurant.address?.zipCode}
            </p>
            <p className="text-gray-700 mt-1">{restaurant.contactNumber}</p>
            <p className="text-gray-700">{restaurant.email}</p>
          </div>

          {/* Operating Hours */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Operating Hours
            </h3>
            <div className="flex flex-col items-center space-y-1 text-gray-700">
              {(restaurant.operatingHours && restaurant.operatingHours.length > 0
                ? restaurant.operatingHours
                : [
                  { day: "Monday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Tuesday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Wednesday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Thursday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Friday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Saturday", openTime: "09:00", closeTime: "22:00" },
                  { day: "Sunday", openTime: "09:00", closeTime: "22:00" },
                ]
              ).map((hours, index) => (
                <div
                  key={index}
                  className="flex justify-center w-full gap-2 font-medium"
                >
                  <span className="w-24 text-right">{hours.day}:</span>
                  <span className="w-28 text-left">
                    {hours.openTime} - {hours.closeTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr/>
        {/* Footer bottom */}
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 text-center mt-10">
          <div className="w-20 h-px bg-brand-accent/50 mx-auto mb-8"></div>
          <p className="font-serif text-xl sm:text-2xl text-brand-text mb-3">
            ZabbieAR
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ZabbieAR Restaurant. All Rights
            Reserved.
          </p>
          <p className="text-xs mt-2">Experience elegance, taste perfection.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

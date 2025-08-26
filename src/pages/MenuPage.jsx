import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuManagement from '../components/dashboard/MenuManagement';
import DishForm from '../components/dashboard/DishForm';

const MenuPage = () => {
  return (
    <Routes>
      <Route path="/" element={<DishForm />} />
      {/* <Route path="/" element={<MenuManagement />} /> */}
      {/* <Route path="/add" element={<DishForm />} /> */}
      <Route path="/edit/:id" element={<DishForm />} />
    </Routes>
  );
};

export default MenuPage;
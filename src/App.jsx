// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MenuPage from './pages/MenuPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import PreviewPage from './pages/PreviewPage';
import PublicMenuPage from './pages/PublicMenuPage';
import LandingPage from './pages/LandingPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/menu/*" element={<MenuPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/menu/:restaurantSlug" element={<PublicMenuPage />} />
          </Route>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </RestaurantProvider>
    </AuthProvider>
  );
}

export default App;
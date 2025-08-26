// // frontend/src/layouts/DashboardLayout.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from '../components/common/Header';
// import Sidebar from '../components/common/Sidebar';
// import { useAuth } from '../hooks/useAuth';

// const DashboardLayout = () => {
//   const { logout } = useAuth();

//   return (
//     <div className="dashboard flex">
//       <Sidebar />
//       <div className="main-content flex-1">
//         <Header title="AR Restaurant Menu" showLogout={true} onLogout={logout} />
//         <div className="mt-6 p-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="AR Restaurant Menu"
          showLogout={true}
          onLogout={logout}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../services/authService"; // 👈 nuevo import

import "./Dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-full">
        <div className="sidebar bg-white shadow-lg w-64 flex-shrink-0 border-r border-gray-200 md:block">
          <button
            id="closeSidebar"
            className="md:hidden absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <div className="flex flex-col items-center justify-center py-6 px-4">
            {/* User Profile */}
            <div className="w-full pb-4 px-4">
              <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                <Link to="/dashboard/dashboardFirts">
                  <img
                    src="https://randomuser.me/api/portraits/women/43.jpg"
                    className="w-10 h-10 rounded-full"
                    alt="User"
                  />
                </Link>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Sarah Miller
                  </h4>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6">
            <div className="px-4 mt-2">
              <Link to="/dashboard/mascotaForm" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-paw mr-3"></i>
                <span className="font-medium">Mascota add Form</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link to="/dashboard/noticiaForm" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-calendar-alt mr-3"></i>
                <span className="font-medium">Noticia add form</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link to="/dashboard/register" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-users mr-3"></i>
                <span className="font-medium">Register</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link to="/dashboard/testimonioForm" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-shopping-bag mr-3"></i>
                <span className="font-medium">Testimonio add form</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link to="/dashboard/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-cog mr-3"></i>
                <span className="font-medium">Settings</span>
              </Link>
            </div>
          </nav>

          {/* Cerrar sesión */}
          <div className="px-4 mt-2">
            <button
              onClick={logout} // 👈 usando la función importada
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content flex-1 overflow-y-auto">
          <header className="md:hidden bg-white p-4 flex items-center justify-between border-b border-gray-200">
            <button
              id="toggleSidebar"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <div className="w-8"></div>
          </header>
          <Outlet />
        </div>

        {/* Overlay para móviles */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}

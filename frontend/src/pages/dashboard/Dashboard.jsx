/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../services/authService";
import "./Dashboard.css";
import Settings from "../../components/settings/Settings";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-auto w-auto relative">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg w-auto h-auto flex-shrink-0 border-r border-gray-200 
            md:block p-4 pt-20 md:pt-4
            fixed top-0 left-0 z-30
            transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out
            md:static md:translate-x-0
          `}
        >
          {/* Botón cerrar (solo en móvil) */}
          <button
            className="md:hidden absolute right-4 bot-4 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Navegación */}
          <nav className="mt-6">
            <div className="px-4 mt-2 ">
              <Link
                to="/dashboard/direcciones"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-map mr-3"></i>
                <span>Direcciones</span>
              </Link>
            </div>
            <div className="px-4 mt-2 ">
              <Link
                to="/dashboard/refugio"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-home mr-3"></i>
                <span>Refugios</span>
              </Link>
            </div>
            <div className="px-4 mt-2 ">
              <Link
                to="/dashboard/mascota"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-paw mr-3"></i>
                <span>Mascotas</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link
                to="/dashboard/noticia"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-calendar-alt mr-3"></i>
                <span>Noticias</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link
                to="/dashboard/testimonio"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-comment-alt mr-3"></i>
                <span>Testimonio</span>
              </Link>
            </div>
            <div className="px-4 mt-2">
              <Link
                to="/dashboard/register"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-users mr-3"></i>
                <span>Register</span>
              </Link>
            </div>

            <div className="px-4 mt-2">
              <Link
                        to={`/dashboard/settings`}
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
              >
                <i className="fas fa-cog mr-3"></i>
                <span>Settings</span>
              </Link>
            </div>
          </nav>

          {/* Cerrar sesión */}
          <div className="px-4 mt-2">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto relative z-10">
          {/* Header mobile */}
          <header className="md:hidden bg-white p-4 flex items-center justify-between border-b border-gray-200">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <div className="w-8"></div>
          </header>

          {/* Rutas anidadas */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Overlay para móviles */}
        {sidebarOpen && (
          <div
            className=" inset-0 bg-black bg-opacity-40 w-auto h-auto z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}

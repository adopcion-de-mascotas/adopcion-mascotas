/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const showDashboardLink = !location.pathname.startsWith(
    "/dashboard/dashboardFirts"
  );

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!sessionStorage.getItem("token");
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Links a mostrar si está logueado
  const loggedInLinks = (
    <>
      {showDashboardLink && (
        <Link
          to="/dashboard/dashboardFirts"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Dashboard
        </Link>
      )}

      <Link
        to="/mascotas"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Mascotas
      </Link>
      <Link
        to="/about"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Nosotros
      </Link>
      <Link
        to="/noticias"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Noticias
      </Link>
    </>
  );

  // Links a mostrar si NO está logueado
  const publicLinks = (
    <>

      <Link
        to={"/mascotas"}
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Mascotas
      </Link>
      <Link
        to={"/about"}
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Nosotros
      </Link>
      <Link
        to={"/noticias"}
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Noticias
      </Link>
    </>
  );

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-paw text-3xl text-indigo-600 mr-2"></i>
            <Link to="/">
              <h1 className="text-2xl font-bold text-indigo-600">Happy Paws</h1>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider">
                <span className="icon sun">☀️</span>
                <span className="icon moon">🌙</span>
              </span>
            </label>

            {isLoggedIn ? loggedInLinks : publicLinks}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 ${mobileMenuOpen ? "block" : "hidden"
            }`}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider">
                <span className="icon sun">☀️</span>
                <span className="icon moon">🌙</span>
              </span>
            </label>

            {isLoggedIn ? (
              <>
                {showDashboardLink && (
                  <Link
                    to="/dashboard/dashboardFirts"
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/mascotas"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Mascotas
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Nosotros
                </Link>
                <Link
                  to="/noticias"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Noticias
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/mascotas"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Mascotas
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Nosotros
                </Link>
                <Link
                  to="/noticias"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Noticias
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

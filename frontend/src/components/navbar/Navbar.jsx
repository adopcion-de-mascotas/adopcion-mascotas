/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    return !!localStorage.getItem("token");
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
        <a
          href="/dashboard/dashboardFirts"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Volver al Dashboard
        </a>
      )}

      <a
        href="/mascotas"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Mascota
      </a>
      <a
        href="/testimonios"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Testimonio
      </a>
      <a
        href="/noticias"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Noticia
      </a>
    </>
  );

  // Links a mostrar si NO está logueado
  const publicLinks = (
    <>
      <a
        href="/mascotas"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Mascotas
      </a>
      <a
        href="/about"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Nosotros
      </a>
      <a
        href="/noticias"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Noticias
      </a>
      <a
        href="/#contact"
        className="text-gray-700 hover:text-indigo-600 font-medium"
      >
        Contacto
      </a>
    </>
  );

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-paw text-3xl text-indigo-600 mr-2"></i>
            <a href="/">
              <h1 className="text-2xl font-bold text-indigo-600">Happy Paws</h1>
            </a>
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
          className={`md:hidden bg-white border-t ${
            mobileMenuOpen ? "block" : "hidden"
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
                <a
                  href="/mascota"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Mascota
                </a>
                <a
                  href="/testimonio"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Testimonio
                </a>
                <a
                  href="/noticia"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Noticia
                </a>
              </>
            ) : (
              <>
                <a
                  href="#home"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Inicio
                </a>
                <a
                  href="#pets"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Mascotas
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Nosotros
                </a>
                <a
                  href="#blog"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                >
                  Contacto
                </a>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

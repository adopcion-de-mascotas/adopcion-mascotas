import React, { useEffect, useState } from "react";
import "./Navbar.css";
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleOpenLogin = () => setShowLoginModal(true);
  const handleOpenRegister = () => setShowRegisterModal(true);

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      {/*Header */}
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
          <div class="flex items-center">
            <i class="fas fa-paw text-3xl text-indigo-600 mr-2"></i>
            <a href="http://localhost:5173">
              <h1 class="text-2xl font-bold text-indigo-600">Happy Paws</h1>
            </a>
          </div>
          <nav class="hidden md:flex space-x-8">
            <label className="switch">
              <input
                type="checkbox"
                id="modo-desktop"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider"></span>
            </label>
            <a
              href="#home"
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Inicio
            </a>
            <a
              href="#pets"
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Mascotas
            </a>
            <a
              href="#about"
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Nosotros
            </a>
            <a
              href="#blog"
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Blog
            </a>
            <a
              href="#contact"
              class="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Contacto
            </a>
          </nav>
          <div class="flex items-center space-x-4">
            <button
              onClick={handleOpenLogin}
              id="loginBtn"
              class="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={handleOpenRegister}
              id="registerBtn"
              class="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg"
            >
              Registrarse
            </button>
            <button id="mobileMenuBtn" class="md:hidden text-gray-700">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div id="mobileMenu" class="hidden md:hidden bg-white border-t">
          <div class="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a
              href="#home"
              class="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Inicio
            </a>
            <a
              href="#pets"
              class="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Mascotas
            </a>
            <a
              href="#about"
              class="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Nosotros
            </a>
            <a
              href="#blog"
              class="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Blog
            </a>
            <a
              href="#contact"
              class="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Contacto
            </a>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}

import React from 'react';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="loginEmail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loginPassword" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="loginPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 mb-4"
          >
            Iniciar Sesión
          </button>
          <div className="text-center">
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

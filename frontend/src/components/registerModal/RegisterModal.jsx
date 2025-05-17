import React from 'react';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 transition">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Cuenta</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">Nombre</label>
              <input type="text" id="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Apellido</label>
              <input type="text" id="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="registerEmail" className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="registerEmail" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" />
          </div>
          <div className="mb-4">
            <label htmlFor="registerPassword" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input type="password" id="registerPassword" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600" />
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Acepto los <a href="#" className="text-indigo-600 hover:text-indigo-700">Términos y Condiciones</a>
            </label>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 mb-4">
            Registrarse
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button onClick={onSwitchToLogin} className="text-indigo-600 hover:text-indigo-700 font-medium">
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

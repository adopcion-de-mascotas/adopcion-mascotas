// BlogModal.jsx
import React from 'react';

export default function BlogModal({ isOpen, onClose, blog }) {
  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="relative h-64 w-full">
          <img
            src={blog.imagen}
            alt={blog.alt}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Cerrar modal"
          >
            <i className="fas fa-times text-gray-800"></i>
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold mr-4">
              {blog.categoria}
            </span>
            <span>
              <i className="far fa-calendar mr-1"></i> {blog.fecha}
            </span>
            <span className="mx-2">•</span>
            <span>
              <i className="far fa-clock mr-1"></i> {blog.lectura}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{blog.titulo}</h1>

          <div className="prose max-w-none text-gray-700">
            <p>{blog.contenido}</p> {/* Debes tener un campo "contenido" en tu JSON */}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Comparte este artículo</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function NotFound() {
  return (
    <>
      <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-70 p-6 rounded-xl shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&q=80"
          alt="Perrito confundido"
          className="w-64 h-64 object-cover rounded-xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-4">
          404 - ¡Oops! Página no encontrada
        </h1>
        <p className="text-lg mb-6 max-w-md text-center">
          No encontramos la página que estás buscando. Pero aquí tienes un
          perrito para alegrar el día 🐶
        </p>
        <a
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Volver al inicio
        </a>
      </div>
    </div>
    </>
  );
}

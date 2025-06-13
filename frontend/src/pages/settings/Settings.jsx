import React, { useState } from "react";

export default function Settings() {
  const [nombre, setNombre] = useState("Sarah Miller"); // Nombre actual
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleGuardarCambios = (e) => {
    e.preventDefault();

    // Simulación de actualización de nombre
    setMensaje("Nombre actualizado correctamente.");
    // Aquí deberías hacer una llamada a la API con fetch o axios
  };

  const handleCambiarPassword = (e) => {
    e.preventDefault();

    if (passwordNueva !== confirmacion) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de cambio de contraseña
    setMensaje("Contraseña actualizada correctamente.");
    // Aquí también deberías llamar a la API
  };

  const handleEliminarCuenta = () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

    if (confirmar) {
      // Simulación de eliminación
      setMensaje("Cuenta eliminada.");
      localStorage.removeItem("token");
      window.location.href = "/login";

      // En producción, llama a tu API para eliminar el usuario
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Configuración de la cuenta</h2>

      {mensaje && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
          {mensaje}
        </div>
      )}

      {/* Cambiar nombre */}
      <form onSubmit={handleGuardarCambios} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Guardar cambios
        </button>
      </form>

      {/* Cambiar contraseña */}
      <form onSubmit={handleCambiarPassword} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
          <input
            type="password"
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
          <input
            type="password"
            value={passwordNueva}
            onChange={(e) => setPasswordNueva(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Cambiar contraseña
        </button>
      </form>

      {/* Eliminar cuenta */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Eliminar cuenta</h3>
        <p className="text-sm text-gray-600 mb-4">
          Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.
        </p>
        <button
          onClick={handleEliminarCuenta}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

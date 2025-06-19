import { useState, useEffect } from "react";
import { editUser } from "../../services/authService";
import {jwtDecode} from "jwt-decode";

export default function useSettings() {
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // contraseña actual
  const [newPassword, setNewPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      // Si querés, podés precargar los datos del usuario aquí (nombre, apellido, email) desde la API
    }
  }, []);

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = {
        nombre,
        apellido,
        email,
      };
      await editUser(dataToUpdate, userId);
      setMensaje("Datos actualizados correctamente.");
    } catch (error) {
      setMensaje(error.message || "Error al actualizar los datos.");
    }
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmacion) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const dataToUpdate = {
        password,     // contraseña actual
        newPassword,  // nueva contraseña
      };
      await editUser(dataToUpdate, userId);
      setMensaje("Contraseña actualizada correctamente.");
      setPassword("");
      setNewPassword("");
      setConfirmacion("");
    } catch (error) {
      setMensaje(error.message || "Error al actualizar la contraseña.");
    }
  };

  const handleEliminarCuenta = () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

    if (confirmar) {
      setMensaje("Cuenta eliminada.");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return {
    nombre,
    setNombre,
    apellido,
    setApellido,
    email,
    setEmail,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    confirmacion,
    setConfirmacion,
    mensaje,
    setMensaje,
    handleGuardarCambios,
    handleCambiarPassword,
    handleEliminarCuenta,
  };
}

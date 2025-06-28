import { useState, useEffect } from "react";
import { editUser, getCurrentUser } from "../../services/authService";


export default function useSettings() {
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // contraseña actual
  const [newPassword, setNewPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null)

  useEffect(() => {

    const getUser = async () => {
      try {
        const { data } = await getCurrentUser()

        if (!data) {
          setError(data.message)
        }

        const nombreAdmin = data.nombre
        const apellidoAdmin = data.apellido
        const emailAdmin = data.email
        const id = data.id

        setNombre(nombreAdmin)
        setApellido(apellidoAdmin)
        setEmail(emailAdmin)
        setUserId(id)

      } catch (error) {
        throw new Error("Ocurrió un error:", error)
      }
    }

    getUser()

  }, []);

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = {
        nombre,
        apellido,
        email,
      };
      const updatedUser = await editUser(dataToUpdate, userId);

      console.log(updatedUser);


      if (!updatedUser.status) {
        setMensaje(updatedUser.message)
      }

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
        nombre,
        apellido,
        email,
        password,     // contraseña actual
        newPassword,  // nueva contraseña
      };
      const updatedUser = await editUser(dataToUpdate, userId);
      if (!updatedUser.status) {
        setMensaje(updatedUser.message)
      }
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
    error,
  };
}

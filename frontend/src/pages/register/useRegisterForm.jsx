// src/hooks/useRegisterForm.js
import { useState } from "react";
import { registerUser } from "../../services/authService";
import Swal from "sweetalert2";

export function useRegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.apellido) newErrors.apellido = "El apellido es obligatorio";
    if (!form.email) newErrors.email = "El email es obligatorio";
    if (!form.password) newErrors.password = "La contraseña es obligatoria";
    return newErrors;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const data = await registerUser(form);
      sessionStorage.setItem("token", data.token);

      // Usar SweetAlert para éxito
      await Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Tu cuenta fue creada exitosamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.href = "/dashboard/dashboardFirts";
    } catch (err) {
      console.error(err);

      // Usar SweetAlert para error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Error al crear cuenta",
      });
    }
  };
  return {
    form,
    setForm,
    errors,
    handleSubmit,
  };
}

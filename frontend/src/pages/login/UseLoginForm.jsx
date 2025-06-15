import { useState } from "react";
import { login } from "../../services/authService";
import Swal from "sweetalert2";

export function useLoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "El email es obligatorio";
    if (!form.password) newErrors.password = "La contraseña es obligatoria";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Por favor completa el email y la contraseña.",
      });
      return;
    }

    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);

      await Swal.fire({
        icon: "success",
        title: "¡Inicio exitoso!",
        text: "Bienvenido/a nuevamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.href = "/dashboard/dashboardFirts";
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Error al iniciar sesión",
      });
    }
  };

  return {
    form,
    errors,
    setForm,
    handleSubmit,
  };
}

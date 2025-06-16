/* eslint-disable no-unused-vars */
import { useState } from "react";
import { agregarNoticia } from "../../services/noticiaService";

export function useNoticiaForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    texto: "",
    fecha: "",
    foto: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje("");
    setError("");
    setCargando(true);

    try {
      // Validación simple (puedes agregar más)
      if (!formData.titulo || !formData.texto || !formData.fecha) {
        setError("Por favor completa todos los campos obligatorios.");
        setCargando(false);
        return;
      }

      await agregarNoticia(formData);
      setMensaje("Noticia creada con éxito.");
      setFormData({ titulo: "", texto: "", fecha: "", foto: "" });
    } catch (err) {
      setError("Error al crear la noticia. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  }

  return {
    formData,
    mensaje,
    error,
    cargando,
    handleChange,
    handleSubmit,
  };
}

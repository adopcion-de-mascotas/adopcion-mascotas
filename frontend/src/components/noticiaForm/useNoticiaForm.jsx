/* eslint-disable no-unused-vars */
import { useState } from "react";
import { agregarNoticia } from "../../services/noticiaService";

export function useNoticiaForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    texto: "",
    foto: null,
    fotoPreview: null,
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, foto: "El archivo no es una imagen válida." }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      foto: file,
      fotoPreview: URL.createObjectURL(file),
    }));
    setErrors((prev) => ({ ...prev, foto: "" }));
  }

  function handleCancel() {
    setFormData((prev) => ({ ...prev, foto: null, fotoPreview: null }));
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange({ target: { files: [file] } });
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje("");
    setError("");
    setErrors({});
    setCargando(true);

    try {
      if (!formData.titulo || !formData.texto || !formData.foto) {
        setError("Por favor completa todos los campos obligatorios.");
        setCargando(false);
        return;
      }

      await agregarNoticia(formData);

      setMensaje("Noticia creada con éxito.");
      setFormData({
        titulo: "",
        texto: "",
        foto: null,
        fotoPreview: null,
      });
    } catch (err) {
      console.error(err);
      setError("Error al crear la noticia. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  }

  return {
    formData,
    mensaje,
    error,
    errors,
    cargando,
    handleChange,
    handleSubmit,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleCancel,
  };
}

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  obtenerNoticiaPorId,
  editarNoticia,
} from "../../services/noticiaService";

export function useNoticiaFormEdit(id) {
  const [formData, setFormData] = useState({
    titulo: "",
    texto: "",
    fecha: "",
    foto: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    async function cargarNoticia() {
      setCargandoDatos(true);
      try {
        const data = await obtenerNoticiaPorId(id);
        setFormData({
          titulo: data.titulo || "",
          texto: data.texto || "",
          fecha: data.fecha ? data.fecha.slice(0, 10) : "",
          foto: data.foto || "",
        });
      } catch (e) {
        setError("Error al cargar la noticia.");
      } finally {
        setCargandoDatos(false);
      }
    }

    if (id) cargarNoticia();
  }, [id]);

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
      if (!formData.titulo || !formData.texto || !formData.fecha) {
        setError("Por favor completa todos los campos obligatorios.");
        setCargando(false);
        return;
      }

      await editarNoticia(id, formData);
      setMensaje("Noticia actualizada con éxito.");
      return true;
    } catch (err) {
      setError("Error al actualizar la noticia. Intenta nuevamente.");
      return false;
    } finally {
      setCargando(false);
    }
  }

  return {
    formData,
    mensaje,
    error,
    cargando,
    cargandoDatos,
    handleChange,
    handleSubmit,
  };
}

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerMascotaPorId, actualizarMascota } from "../../services/mascotasService";

export function useMascotaFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    tipo: "",
    raza: "",
    genero: "",
    tamanio: "",
    peso: "",
    esterilizado: false,
    estado: "",
    ciudad: "",
    descripcion: "",
    historia: "",
    imagen_principal: null,
    personalidad: [],
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMascota() {
      try {
        setCargando(true);
        const data = await obtenerMascotaPorId(id);
        setFormData({
          nombre: data.nombre || "",
          edad: data.edad || "",
          tipo: data.tipo || "",
          raza: data.raza || "",
          genero: data.sexo || "",
          tamanio: data.tamaño || "",
          peso: data.peso || "",
          esterilizado: data.esterilizado || false,
          estado: data.estado || "",
          ciudad: data.ciudad || "",
          descripcion: data.descripcion || "",
          historia: data.historia || "",
          imagen_principal: null,
          personalidad: data.personalidad || [],
        });
        setError("");
      } catch (err) {
        console.error("Error al cargar mascota:", err);
        setError("No se pudo cargar la mascota.");
      } finally {
        setCargando(false);
      }
    }

    fetchMascota();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePersonalidadChange(e) {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let nuevaPersonalidad = [...prev.personalidad];
      if (checked && !nuevaPersonalidad.includes(value)) {
        nuevaPersonalidad.push(value);
      } else {
        nuevaPersonalidad = nuevaPersonalidad.filter((p) => p !== value);
      }
      return { ...prev, personalidad: nuevaPersonalidad };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      await actualizarMascota(id, formData);
      setMensaje("Mascota actualizada correctamente.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error actualizando mascota:", err);
      setError("Error al actualizar mascota. Intenta nuevamente.");
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    handlePersonalidadChange,
    mensaje,
    error,
    cargando,
  };
}

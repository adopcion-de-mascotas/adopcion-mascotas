/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  obtenerMascotaPorId,
  actualizarMascota,
} from "../../services/mascotasService";

const initialFormData = {
  nombre: "",
  edad: "",
  tipo: "",
  raza: "",
  genero: "",
  tamanio: "",
  peso: "",
  esterelizado: false,
  estado: "",
  ciudad: "",
  descripcion: "",
  historia: "",
  imagen: null,
  galeria: [],
  personalidad: [],
  comportamiento: {
    niños: "",
    perros: "",
    gatos: "",
    apartamento: "",
  },
  salud: {
    estado: "",
    tratamiento: "",
    info_veterinaria: "",
  },
  vacunas: [],
  refugioId: "",
};

export function useMascotaFormEdit(mascotaId) {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState("");
  const [fotoPreview, setFotoPreview] = useState(null);
  const [galeriaPreviews, setGaleriaPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const personalidadesDisponibles = [
    { id: 1, nombre: "Juguetón" },
    { id: 2, nombre: "Cariñoso" },
    { id: 3, nombre: "Protector" },
    { id: 4, nombre: "Tranquilo" },
  ];

  // Cargar datos de la mascota para edición
  useEffect(() => {
    if (!mascotaId) return;

    setLoading(true);
    obtenerMascotaPorId(mascotaId)
      .then((data) => {
        // Aquí asumo que data trae la mascota con estructura compatible con formData
        // Para imagen y galeria, si vienen como URLs, no como File, manejalo aparte
        setFormData({
          ...data,
          imagen: null, // imagen para editar la nueva si se cambia, no la URL
          galeria: [], // lo mismo para galeria
        });

        // Opcional: si querés mostrar previews de imagen/galería desde URLs:
        if (data.imagenUrl) setFotoPreview(data.imagenUrl);
        if (data.galeriaUrls) setGaleriaPreviews(data.galeriaUrls);

        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar datos de la mascota");
        setLoading(false);
      });
  }, [mascotaId]);

  // Limpieza de URLs para evitar memory leaks
  useEffect(() => {
    return () => {
      if (fotoPreview && fotoPreview.startsWith("blob:"))
        URL.revokeObjectURL(fotoPreview);
      galeriaPreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [fotoPreview, galeriaPreviews]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && name === "galeria") {
      const filesArray = Array.from(files);
      galeriaPreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setGaleriaPreviews(previews);
      setFormData((prev) => ({ ...prev, galeria: filesArray }));
    } else if (type === "file" && name === "imagen") {
      if (fotoPreview && fotoPreview.startsWith("blob:"))
        URL.revokeObjectURL(fotoPreview);
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen: file }));
    } else if (type === "checkbox" && name === "personalidad") {
      const id = parseInt(value);
      const newValues = checked
        ? [...formData.personalidad, id]
        : formData.personalidad.filter((pid) => pid !== id);
      setFormData((prev) => ({ ...prev, personalidad: newValues }));
    } else if (type === "checkbox" && name === "vacunas") {
      const id = parseInt(value);
      const newValues = checked
        ? [...formData.vacunas, id]
        : formData.vacunas.filter((vid) => vid !== id);
      setFormData((prev) => ({ ...prev, vacunas: newValues }));
    } else if (name.startsWith("comportamiento.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        comportamiento: {
          ...prev.comportamiento,
          [field]: value,
        },
      }));
    } else if (name.startsWith("salud.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salud: {
          ...prev.salud,
          [field]: value,
        },
      }));
    } else if (type === "checkbox" && name === "esterilizado") {
      setFormData((prev) => ({ ...prev, esterilizado: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancelImagen = () => {
    if (fotoPreview && fotoPreview.startsWith("blob:"))
      URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    setFormData((prev) => ({ ...prev, imagen: null }));
  };

  const handleClearGaleria = () => {
    galeriaPreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });
    setGaleriaPreviews([]);
    setFormData((prev) => ({ ...prev, galeria: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.edad || !formData.tipo) {
      setMensaje("❗ Por favor, completá los campos obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("❌ No autorizado");
      return;
    }

    try {
      await actualizarMascota(mascotaId, formData, token);
      setMensaje("✅ Mascota actualizada exitosamente");
      // Opcional: no limpiar formulario para edición
      // setFormData(initialFormData);
      // setFotoPreview(null);
      // setGaleriaPreviews([]);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar la mascota");
    }
  };

  // Los componentes Input, Select, Textarea quedan igual, omito para no repetir

  function Input({ label, name, onChange, type = "text", checked, value }) {
    return (
      <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          {...(type === "checkbox" ? { checked } : { value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    );
  }

  function Select({ label, name, onChange, options, value }) {
    return (
      <div>
        <label className="block text-gray-700 mb-1">{label}</label>
        <select
          name={name}
          onChange={onChange}
          value={value}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Seleccione...</option>
          {options.map((opt) => (
            <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
              {opt.label ?? opt.nombre}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function Textarea({ label, name, onChange, value }) {
    return (
      <div className="col-span-1 md:col-span-2">
        <label className="block text-gray-700 mb-1">{label}</label>
        <textarea
          name={name}
          onChange={onChange}
          rows={3}
          value={value}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>
    );
  }

  return {
    formData,
    mensaje,
    personalidadesDisponibles,
    fotoPreview,
    galeriaPreviews,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancelImagen,
    handleClearGaleria,
    Input,
    Select,
    Textarea,
  };
}

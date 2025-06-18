import { useState, useEffect } from "react";
import {
  obtenerMascotaPorId,
  actualizarMascota,
  obtenerRefugios,
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
  imagen_principal: null,
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

export function useMascotaFormEdit(id) {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState("");
  const [fotoPreview, setFotoPreview] = useState(null);
  const [galeriaPreviews, setGaleriaPreviews] = useState([]);
  const [refugiosDisponibles, setRefugiosDisponibles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const personalidadesDisponibles = [
    { id: 1, nombre: "Juguetón" },
    { id: 2, nombre: "Cariñoso" },
    { id: 3, nombre: "Protector" },
    { id: 4, nombre: "Tranquilo" },
  ];

  useEffect(() => {
    const cargarRefugios = async () => {
      try {
        const data = await obtenerRefugios();
        setRefugiosDisponibles(data);
      } catch (error) {
        console.error("Error al cargar refugios:", error);
      }
    };
    cargarRefugios();
  }, []);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    obtenerMascotaPorId(id)
      .then((data) => {
        setFormData({
          ...data,
          imagen_principal: null,
          galeria: [],
        });

        if (data.imagenUrl) setFotoPreview(data.imagenUrl);
        if (data.galeriaUrls) setGaleriaPreviews(data.galeriaUrls);

        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar datos de la mascota");
        setLoading(false);
      });
  }, [id]);

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
    } else if (type === "file" && name === "imagen_principal") {
      if (fotoPreview && fotoPreview.startsWith("blob:"))
        URL.revokeObjectURL(fotoPreview);
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen_principal: null }));
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
    setFormData((prev) => ({ ...prev, imagen_principal: [] }));
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
    setLoading(true);
    setMensaje("");
    setErrors({});

    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.edad) newErrors.edad = "La edad es requerida";
    if (!formData.tipo) newErrors.tipo = "El tipo es requerido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMensaje("❗ Por favor, completá los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      await actualizarMascota(id, formData);
      setMensaje("✅ Mascota actualizada exitosamente");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar la mascota");
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (fotoPreview && fotoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(fotoPreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen_principal: null }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (fotoPreview && fotoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(fotoPreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen_principal: null }));
    }
  };

  const handleDropGaleria = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    galeriaPreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setGaleriaPreviews(previews);
    setFormData((prev) => ({ ...prev, galeria: imageFiles }));
  };

  const handleDragOverGaleria = (e) => {
    e.preventDefault();
  };

  const handleImageChangeGaleria = (e) => {
    const files = Array.from(e.target.files);

    galeriaPreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    const previews = files.map((file) => URL.createObjectURL(file));
    setGaleriaPreviews(previews);
    setFormData((prev) => ({ ...prev, galeria: files }));
  };

  const handleRemoveImagenGaleria = (index) => {
    const newPreviews = [...galeriaPreviews];
    const newGaleria = [...formData.galeria];

    if (galeriaPreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(galeriaPreviews[index]);
    }

    newPreviews.splice(index, 1);
    newGaleria.splice(index, 1);

    setGaleriaPreviews(newPreviews);
    setFormData((prev) => ({ ...prev, galeria: newGaleria }));
  };

  const vacunasDisponibles = [
    { id: 1, nombre: "Parvovirus" },
    { id: 2, nombre: "Rabia" },
    { id: 3, nombre: "Moquillo" },
  ];

  return {
    formData,
    mensaje,
    refugiosDisponibles,
    personalidadesDisponibles,
    vacunasDisponibles,
    fotoPreview,
    galeriaPreviews,
    errors,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancelImagen,
    handleClearGaleria,
    handleRemoveImagenGaleria,
    handleDrop,
    handleDragOver,
    handleImageChange,
    handleDropGaleria,
    handleDragOverGaleria,
    handleImageChangeGaleria,
  };
}

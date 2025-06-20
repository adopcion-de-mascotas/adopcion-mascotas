import { useState, useEffect } from "react";
import { crearMascota } from "../../services/mascotasService";
import { obtenerRefugios } from "../../services/refugioService";
import { addSaludMascota } from "../../services/saludService";
import { crearComportamiento } from "../../services/comportamientoService";

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

export function useMascotaForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});
  const [fotoPreview, setFotoPreview] = useState(null);
  const [galeriaPreviews, setGaleriaPreviews] = useState([]);
  const [refugiosDisponibles, setRefugiosDisponibles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const personalidadesDisponibles = [
    { id: 1, nombre: "Juguetón" },
    { id: 2, nombre: "Cariñoso" },
    { id: 3, nombre: "Protector" },
    { id: 4, nombre: "Tranquilo" },
  ];

  const vacunasDisponibles = [
    { id: 1, nombre: "Parvovirus" },
    { id: 2, nombre: "Rabia" },
    { id: 3, nombre: "Moquillo" },
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

  // Limpieza de URLs para evitar memory leaks
  useEffect(() => {
    return () => {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      galeriaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fotoPreview, galeriaPreviews]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && name === "fotos") {
      const filesArray = Array.from(files);
      galeriaPreviews.forEach((url) => URL.revokeObjectURL(url));
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setGaleriaPreviews(previews);
      setFormData((prev) => ({ ...prev, galeria: filesArray }));
      setErrors((prev) => ({ ...prev, galeria: null }));
    } else if (type === "file" && name === "imagen_principal") {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen_principal: file }));
      setErrors((prev) => ({ ...prev, imagen_principal: null }));
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
    } else if (type === "checkbox" && name === "esterelizado") {
      setFormData((prev) => ({ ...prev, esterelizado: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancelImagen = () => {
    if (fotoPreview) URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    setFormData((prev) => ({ ...prev, imagen_principal: null }));
  };

  const handleClearGaleria = () => {
    galeriaPreviews.forEach((url) => URL.revokeObjectURL(url));
    setGaleriaPreviews([]);
    setFormData((prev) => ({ ...prev, galeria: [] }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.edad) newErrors.edad = "La edad es requerida";
    if (!formData.tipo) newErrors.tipo = "El tipo es requerido";
    if (!formData.refugioId) newErrors.refugioId = "El refugio es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "Dataaaaaaaaaaaaaaaaaaaaaaaaa")
    setIsLoading(true);
    setMensaje("");

    if (!validateForm()) {
      setMensaje("❗ Por favor, completa todos los campos requeridos.");
      setIsLoading(false);
      return;
    }

    try {

      const salud = await addSaludMascota(formData.salud)
      if (salud && salud.data.id) {
        formData["saludId"] = salud.data.id;
        delete formData.salud;
      } else {
        console.error("No se pudo obtener un ID de salud válido");
      }

      const comportamiento = await crearComportamiento(formData.comportamiento)
      console.log(comportamiento);
      
      if (comportamiento && comportamiento.data.id) {
        formData["comportamientoId"] = comportamiento.data.id;
        delete formData.comportamiento;
      } else {
        console.error("No se pudo obtener un ID de salud válido");
      }

      await crearMascota(formData);
      setMensaje("✅ Mascota creada exitosamente");
      setFormData(initialFormData);
      setFotoPreview(null);
      setGaleriaPreviews([]);
      setErrors({});
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear la mascota: " + error.message);
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    mensaje,
    personalidadesDisponibles,
    vacunasDisponibles,
    refugiosDisponibles,
    fotoPreview,
    galeriaPreviews,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancelImagen,
    handleClearGaleria,
    handleDrop: (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        const event = {
          target: { name: "imagen_principal", files: [file], type: "file" },
        };
        handleChange(event);
      }
    },
    handleDragOver: (e) => {
      e.preventDefault();
    },
    /*     handleImageChange: (e) => {
          const event = { target: { ...e.target, name: "imagen_principal" } };
          handleChange(event);
        }, */
    handleImageChange: (e) => {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setFotoPreview(previewUrl);
        setFormData((prev) => ({ ...prev, imagen_principal: file }));
      }
    },
    handleDropGaleria: (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        const event = { target: { name: "fotos", files, type: "file" } };
        handleChange(event);
      }
    },
    handleDragOverGaleria: (e) => {
      e.preventDefault();
    },
    handleImageChangeGaleria: (e) => {
      const event = { target: { ...e.target, name: "fotos" } };
      handleChange(event);
    },
    handleRemoveImagenGaleria: (index) => {
      const newGaleria = [...formData.galeria];
      const newPreviews = [...galeriaPreviews];

      // Revocar URL del preview que se eliminará
      URL.revokeObjectURL(newPreviews[index]);

      newGaleria.splice(index, 1);
      newPreviews.splice(index, 1);

      setFormData((prev) => ({ ...prev, galeria: newGaleria }));
      setGaleriaPreviews(newPreviews);
    },
  };
}

import { useState, useEffect } from "react";
import {
  obtenerMascotaPorId,
  actualizarMascota,
} from "../../services/mascotasService";
import { obtenerRefugios } from "../../services/refugioService";
import { obtenerPersonalidades } from "../../services/personalidadesService";
import { getAllVacunas } from "../../services/vacunaService";
import { editarComportamiento } from "../../services/comportamientoService";
import { updateSalud } from "../../services/saludService";

const initialFormData = {
  nombre: "",
  edad: "",
  tipo: "",
  raza: "",
  genero: "",
  tamanio: "",
  peso: 0,
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
  comportamientoId: "",
  saludId: ""
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
  const [personalidadesDisponibles, setPersonalidadesDisponibles] = useState([]);
  const [vacunasDisponibles, setVacunasDisponibles] = useState([]);


  useEffect(() => {
    const cargarRefugios = async () => {
      try {
        const data = await obtenerRefugios();
        setRefugiosDisponibles(data);
      } catch (error) {
        console.error("Error al cargar refugios:", error);
      }
    };

    const personalidades = async () => {
      try {
        const data = await obtenerPersonalidades()
        setPersonalidadesDisponibles(data)
      } catch (error) {
        console.error("Error al cargar personalidades:", error);
      }
    }

    const vacunas = async () => {
      try {
        const data = await getAllVacunas()
        setVacunasDisponibles(data.data)
      } catch (error) {
        console.error("Error al cargar vacunas:", error);
      }
    }
    cargarRefugios();
    personalidades();
    vacunas()
  }, []);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    obtenerMascotaPorId(id)
      .then((data) => {
        const formattedData = {
          ...initialFormData,
          ...data,
          refugioId: data.refugio?.id || "", // 👈 Agregá esta línea

          peso: data.peso || 0,
          esterelizado: data.esterelizado || false,
          imagen_principal: null,
          galeria: Array.isArray(data.galeria)
            ? data.galeria.map((img) => img.id)
            : [],
          vacunas: Array.isArray(data.salud?.vacunas)
            ? data.salud.vacunas.map((v) => v.id)
            : [],
          personalidad: Array.isArray(data.personalidades)
            ? data.personalidades.map((p) => p.id)
            : [],

          comportamiento: {
            niños: data.comportamiento?.niños || "",
            perros: data.comportamiento?.perros || "",
            gatos: data.comportamiento?.gatos || "",
            apartamento: data.comportamiento?.apartamento || "",
          },
          salud: {
            estado: data.salud?.estado || "",
            tratamiento: data.salud?.tratamiento || "",
            info_veterinaria: data.salud?.info_veterinaria || "",
          },
          comportamientoId: data.comportamiento?.id || "",
          saludId: data.salud?.id
        };
        setFormData(formattedData);
        if (data.imagen_principal) setFotoPreview(data.imagen_principal);
        if (Array.isArray(data.galeria)) {
          // Tomamos el campo 'foto' para cada imagen
          const urls = data.galeria.map((img) => img.foto).filter(Boolean);
          setGaleriaPreviews(urls);
        } else {
          setGaleriaPreviews([]);
        }

        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar datos de la mascota");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    return () => {
      if (
        fotoPreview &&
        typeof fotoPreview === "string" &&
        fotoPreview.startsWith("blob:")
      )
        URL.revokeObjectURL(fotoPreview);

      galeriaPreviews.forEach((url) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
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
      setFormData((prev) => ({ ...prev, imagen_principal: file }));
    } else if (type === "checkbox" && name === "personalidad") {
      const id = parseInt(value);
      const currentPersonalidad = Array.isArray(formData.personalidad)
        ? formData.personalidad
        : [];
      const newValues = checked
        ? [...currentPersonalidad, id]
        : currentPersonalidad.filter((pid) => pid !== id);
      setFormData((prev) => ({ ...prev, personalidad: newValues }));
    } else if (type === "checkbox" && name === "vacunas") {
      const id = parseInt(value);
      const currentVacunas = Array.isArray(formData.vacunas)
        ? formData.vacunas
        : [];
      const newValues = checked
        ? [...currentVacunas, id]
        : currentVacunas.filter((vid) => vid !== id);
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
    } else if (name === "edad" || name === "peso") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancelImagen = () => {
    if (fotoPreview && fotoPreview.startsWith("blob:"))
      URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    setFormData((prev) => ({ ...prev, imagen_principal: null }));
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
    if (!formData.nombre?.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.edad) newErrors.edad = "La edad es requerida";
    if (!formData.tipo?.trim()) newErrors.tipo = "El tipo es requerido";
    if (!formData.refugioId) newErrors.refugioId = "El refugio es requerido";
    if (!formData.edad?.trim()) newErrors.edad = "La edad es requerida";
    if (!formData.peso?.trim()) newErrors.peso = "El peso es requerido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMensaje(
        "❗ Por favor, completá los campos obligatorios correctamente."
      );
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        peso: formData.peso,
        edad: formData.edad,
        personalidad: Array.isArray(formData.personalidad)
          ? formData.personalidad
          : [],
        vacunas: Array.isArray(formData.vacunas) ? formData.vacunas : [],
      };

      await editarComportamiento(formData.comportamientoId, dataToSend.comportamiento);
      await updateSalud(formData.saludId, dataToSend.salud)

      await actualizarMascota(id, dataToSend);
      setMensaje("✅ Mascota actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
      setMensaje(error.message || "❌ Error al actualizar la mascota");
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
      setFormData((prev) => ({ ...prev, imagen_principal: file }));
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
      setFormData((prev) => ({ ...prev, imagen_principal: file }));
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

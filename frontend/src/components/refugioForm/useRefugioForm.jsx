import { useState, useEffect } from "react";
import { obtenerDirecciones,} from "../../services/direccionesService";
import { crearRefugio} from "../../services/refugioService";

export default function useRefugioForm() {
  const [formData, setFormData] = useState({
  nombre: "",
  descripcion: "",
  info: "",
  imagen: null,
  imagenPreview: null,
  direccion: {
    calle: "",
    barrio: "",
    localidad: "",
    provincia: "",
    pais: "Argentina",
    codigo_postal: "",
  },
  contacto: {
    nombre: "",
    telefono: "",
    email: "",
    web: "",
  }
});


  const [direcciones, setDirecciones] = useState([]); // <-- nuevo estado para direcciones

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Carga direcciones al montar el hook
  useEffect(() => {
    async function cargarDirecciones() {
      try {
        const data = await obtenerDirecciones();
        setDirecciones(data.data);
      } catch (error) {
        console.error("Error al cargar direcciones:", error);
      }
    }
    cargarDirecciones();
  }, []);

  // El resto de tu código de funciones (handleChange, handleImageChange, etc.) queda igual
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name.startsWith("direccion.")) {
    const field = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      direccion: {
        ...prev.direccion,
        [field]: value,
      }
    }));
  } else if (name.startsWith("contacto.")) {
    const field = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        [field]: value,
      }
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Limpio error si había
  if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagenPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, imagen: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagenPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      valid = false;
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
      valid = false;
    }

    if (!formData.info.trim()) {
      newErrors.info = "La información adicional es requerida";
      valid = false;
    }

   // if (!formData.direccion_id) {
    //  newErrors.direccion_id = "La dirección es requerida";
    //  valid = false;
   // }

   // if (!formData.imagen) {
   //   newErrors.imagen = "Selecciona una imagen";
   //   valid = false;
  //  }

    // Validación de contacto
    if (!formData.contacto.nombre.trim()) {
      newErrors["contacto.nombre"] = "Nombre requerido";
      valid = false;
    }
    if (!formData.contacto.telefono.trim()) {
      newErrors["contacto.telefono"] = "Teléfono requerido";
      valid = false;
    }

    if (!formData.contacto.email.trim()) {
      newErrors["contacto.email"] = "Email requerido";
      valid = false;
    }

    if (!formData.contacto.web.trim()) {
      newErrors["contacto.web"] = "Web requerida";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);

    try {
      await crearRefugio(formData);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        nombre: "",
        descripcion: "",
        info: "",
        direccion_id: "",
        imagen: null,
        imagenPreview: null,
        contacto: {
          nombre: "",
          telefono: "",
          email: "",
          web: "",
        },
      });
    } catch (error) {
      console.error("Error al enviar refugio:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar el refugio. Intenta nuevamente.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      info: "",
      direccion_id: "",
      imagen: null,
      imagenPreview: null,
      contacto: {
        nombre: "",
        telefono: "",
        email: "",
        web: "",
      },
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return {
    formData,
    direcciones, // <-- retorno direcciones para usar en el componente
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    handleCancel,
    setFormData,
  };
}

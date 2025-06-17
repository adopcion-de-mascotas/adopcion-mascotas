import { useState, useEffect } from "react";
import { crearMascota } from "../../services/mascotasService";

// Constante con valores iniciales para evitar duplicación en reseteo
const initialFormData = {
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
  refugioId: "", // Debe asignarse en el formulario
};

export function useMascotaForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState("");
  const [fotoPreview, setFotoPreview] = useState(null);
  const [galeriaPreviews, setGaleriaPreviews] = useState([]);

  const personalidadesDisponibles = [
    { id: 1, nombre: "Juguetón" },
    { id: 2, nombre: "Cariñoso" },
    { id: 3, nombre: "Protector" },
    { id: 4, nombre: "Tranquilo" },
  ];

  // Limpieza de URLs para evitar memory leaks
  useEffect(() => {
    return () => {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      galeriaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fotoPreview, galeriaPreviews]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && name === "galeria") {
      const filesArray = Array.from(files);
      galeriaPreviews.forEach((url) => URL.revokeObjectURL(url)); // cleanup
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setGaleriaPreviews(previews);
      setFormData((prev) => ({ ...prev, galeria: filesArray }));
    }

    else if (type === "file" && name === "imagen") {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview); // cleanup previa
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFotoPreview(previewUrl);
      setFormData((prev) => ({ ...prev, imagen: file }));
    }

    else if (type === "checkbox" && name === "personalidad") {
      const id = parseInt(value);
      const newValues = checked
        ? [...formData.personalidad, id]
        : formData.personalidad.filter((pid) => pid !== id);
      setFormData((prev) => ({ ...prev, personalidad: newValues }));
    }

    else if (type === "checkbox" && name === "vacunas") {
      const id = parseInt(value);
      const newValues = checked
        ? [...formData.vacunas, id]
        : formData.vacunas.filter((vid) => vid !== id);
      setFormData((prev) => ({ ...prev, vacunas: newValues }));
    }

    else if (name.startsWith("comportamiento.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        comportamiento: {
          ...prev.comportamiento,
          [field]: value,
        },
      }));
    }

    else if (name.startsWith("salud.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salud: {
          ...prev.salud,
          [field]: value,
        },
      }));
    }

    else if (type === "checkbox" && name === "esterilizado") {
      setFormData((prev) => ({ ...prev, esterilizado: checked }));
    }

    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancelImagen = () => {
    if (fotoPreview) URL.revokeObjectURL(fotoPreview);
    setFotoPreview(null);
    setFormData((prev) => ({ ...prev, imagen: null }));
  };

  const handleClearGaleria = () => {
    galeriaPreviews.forEach((url) => URL.revokeObjectURL(url));
    setGaleriaPreviews([]);
    setFormData((prev) => ({ ...prev, galeria: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple (podés mejorarla con una lib como Yup)
    if (!formData.nombre || !formData.edad || !formData.tipo) {
      setMensaje("❗ Por favor, completá los campos obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await crearMascota(formData, token);
      setMensaje("✅ Mascota creada exitosamente");
      setFormData(initialFormData);
      setFotoPreview(null);
      setGaleriaPreviews([]);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear la mascota");
    }
  };

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
    handleChange,
    handleSubmit,
    handleCancelImagen,
    handleClearGaleria,
    Input,
    Select,
    Textarea,
  };
}

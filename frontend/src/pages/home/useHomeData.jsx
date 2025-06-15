import { useState, useEffect } from "react";
import { obtenerMascotas } from "../../services/mascotasService";
import { obtenerTestimonios } from "../../services/testimonioService";
import { obtenerNoticias } from "../../services/noticiaService";

export const useHomeData = () => {
  const [mascotas, setMascotas] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMascotas()
      .then(setMascotas)
      .catch(setError);
  }, []);

  useEffect(() => {
    obtenerTestimonios()
      .then((res) => setTestimonials(res.data))
      .catch(setError);
  }, []);

  useEffect(() => {
    obtenerNoticias()
      .then(setNoticias)
      .catch(setError);
  }, []);

  return { mascotas, noticias, testimonials, error };
};

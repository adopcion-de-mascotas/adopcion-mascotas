import { useEffect, useState } from "react";
import { obtenerNoticiaPorId } from "../../services/noticiaService";

export default function useNoticiaPorId(id) {
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    obtenerNoticiaPorId(id)
      .then((data) => {
        setNoticia(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la noticia.");
        setLoading(false);
      });
  }, [id]);

  return { noticia, error, loading };
}

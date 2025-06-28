import { useEffect, useState } from "react";
import { obtenerNoticiaPorId, obtenerNoticias } from "../../services/noticiaService";

export default function useNoticiaPorId(id) {
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState(null);

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

  // Cargar noticias relacionadas
  useEffect(() => {
    obtenerNoticias()
      .then((data) => {
        setNoticias(data);
      })
      .catch(() => {
        // No hacemos nada con el error aquí
      });
  }, []);

  return { noticia, error, loading, noticias };
}

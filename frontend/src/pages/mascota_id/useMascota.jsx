import { useEffect, useState } from "react";
import { obtenerMascotaPorId, obtenerMascotas } from "../../services/mascotasService";

export function useMascota(id) {
  const [mascota, setMascota] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar una mascota por ID
  useEffect(() => {
    setLoading(true);
    setError(null);

    obtenerMascotaPorId(id)
      .then((data) => {
        setMascota(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la mascota.");
        setLoading(false);
      });
  }, [id]);

  // Cargar mascotas relacionadas
  useEffect(() => {
    obtenerMascotas()
      .then((data) => {
        setMascotas(data.data.items);
      })
      .catch(() => {
        // No hacemos nada con el error aquí
      });
  }, []);

  // Lógica para dar like
  const handleLike = () => {
    if (!mascota) return;

    const isLiked = mascota.liked;
    const updatedMascota = {
      ...mascota,
      liked: !isLiked,
      likes: isLiked ? mascota.likes - 1 : mascota.likes + 1,
    };

    setMascota(updatedMascota);

    fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mascotaId: mascota.id, like: !isLiked }),
    });
  };

  return {
    mascota,
    mascotas,
    error,
    loading,
    handleLike,
  };
}

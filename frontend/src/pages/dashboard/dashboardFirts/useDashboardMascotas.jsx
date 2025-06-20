import { useState, useEffect } from "react";
import { obtenerMascotas } from "../../../services/mascotasService";

export function useDashboardMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [totalMascotas, setTotalMascotas] = useState(0);
  const [availableForAdoption, setAvailableForAdoption] = useState(0);
  const [availableStatusCount, setAvailableStatusCount] = useState(0);
  const [generoData, setGeneroData] = useState({});
  const [tipoData, setTipoData] = useState({});
  const [tamanioData, setTamanioData] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const mascotasData = await obtenerMascotas({ limit: 1000 });
        setMascotas(mascotasData.data.items);
        setTotalMascotas(mascotasData.data.items.length);

        // Mascotas adoptadas
        const adoptionCount = mascotasData.data.items.filter(
          (m) => m.estado && m.estado.toLowerCase().includes("adop")
        ).length;
        setAvailableForAdoption(adoptionCount);

        // Mascotas disponibles
        const disponiblesCount = mascotasData.data.items.filter(
          (m) => m.estado && m.estado.toLowerCase().includes("disponible")
        ).length;
        setAvailableStatusCount(disponiblesCount);

        // Género
        const generoCounts = mascotasData.data.items.reduce((acc, m) => {
          const gen = m.genero ? m.genero.toLowerCase() : "desconocido";
          acc[gen] = (acc[gen] || 0) + 1;
          return acc;
        }, {});
        setGeneroData(generoCounts);

        // Tipo
        const tipoCounts = mascotasData.data.items.reduce((acc, m) => {
          const tipo = m.tipo ? m.tipo.toLowerCase() : "otro";
          if (tipo.includes("perro")) acc["perro"] = (acc["perro"] || 0) + 1;
          else if (tipo.includes("gato")) acc["gato"] = (acc["gato"] || 0) + 1;
          else acc["otro"] = (acc["otro"] || 0) + 1;
          return acc;
        }, {});
        setTipoData(tipoCounts);

        // Tamaño
        const tamanioCounts = mascotasData.data.items.reduce((acc, m) => {
          const t = m.tamanio ? m.tamanio.toLowerCase() : "desconocido";
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {});
        setTamanioData(tamanioCounts);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  return {
    mascotas,
    totalMascotas,
    availableForAdoption,
    availableStatusCount,
    generoData,
    tipoData,
    tamanioData,
  };
}

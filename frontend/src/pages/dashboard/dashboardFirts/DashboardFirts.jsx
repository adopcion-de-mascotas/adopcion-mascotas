/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { obtenerMascotas } from "../../../services/mascotasService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardFirts() {
  const [mascotas, setMascotas] = useState([]);

  // Estadísticas básicas
  const [totalMascotas, setTotalMascotas] = useState(0);
  const [availableForAdoption, setAvailableForAdoption] = useState(0);
  const [availableStatusCount, setAvailableStatusCount] = useState(0);

  // Estadísticas para gráficos
  const [generoData, setGeneroData] = useState({}); // macho/hembra
  const [tipoData, setTipoData] = useState({}); // perro/gato/otro
  const [tamanioData, setTamanioData] = useState({}); // grande/mediano/pequeño
  const [esterilizacionData, setEsterilizacionData] = useState({ esterilizados: 0, noEsterilizados: 0 });
  const [saludData, setSaludData] = useState({}); // estados salud
  const [vacunasData, setVacunasData] = useState({}); // conteo vacunas

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const mascotasData = await obtenerMascotas({ limit: 1000 });
        setMascotas(mascotasData);
        setTotalMascotas(mascotasData.length);

        // Mascotas adoptadas y disponibles
        const adoptionCount = mascotasData.filter(m =>
          m.estado && m.estado.toLowerCase().includes("adop")
        ).length;
        setAvailableForAdoption(adoptionCount);

        const disponiblesCount = mascotasData.filter(m =>
          m.estado && m.estado.toLowerCase().includes("disponible")
        ).length;
        setAvailableStatusCount(disponiblesCount);

        // Genero
        const generoCounts = mascotasData.reduce((acc, m) => {
          const gen = m.genero ? m.genero.toLowerCase() : "desconocido";
          acc[gen] = (acc[gen] || 0) + 1;
          return acc;
        }, {});
        setGeneroData(generoCounts);

        // Tipo (Perro, Gato, Otro)
        const tipoCounts = mascotasData.reduce((acc, m) => {
          const tipo = m.tipo ? m.tipo.toLowerCase() : "otro";
          if (tipo.includes("perro")) acc["perro"] = (acc["perro"] || 0) + 1;
          else if (tipo.includes("gato")) acc["gato"] = (acc["gato"] || 0) + 1;
          else acc["otro"] = (acc["otro"] || 0) + 1;
          return acc;
        }, {});
        setTipoData(tipoCounts);

        // Tamaño
        const tamanioCounts = mascotasData.reduce((acc, m) => {
          const t = m.tamanio ? m.tamanio.toLowerCase() : "desconocido";
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {});
        setTamanioData(tamanioCounts);

        // Esterilizados / no esterilizados
        const esterilizadosCount = mascotasData.filter(m => m.esterelizado).length;
        const noEsterilizadosCount = mascotasData.length - esterilizadosCount;
        setEsterilizacionData({ esterilizados: esterilizadosCount, noEsterilizados: noEsterilizadosCount });



      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Helper para convertir objeto a dataset para chart.js
  const objectToChartData = (obj, backgroundColors) => {
    return {
      labels: Object.keys(obj).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
      datasets: [
        {
          label: "Cantidad",
          data: Object.values(obj),
          backgroundColor: backgroundColors || Object.keys(obj).map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`),
        },
      ],
    };
  };

  return (
    <main className="p-4 md:p-8">
      <div className="dashboard-grid mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Pets */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50 text-happy-blue">
              <i className="fas fa-paw text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de mascotas</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalMascotas}</h3>
            </div>
          </div>
        </div>

        {/* Adoptadas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <i className="fas fa-heart text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Mascotas adoptadas</p>
              <h3 className="text-2xl font-bold text-gray-800">{availableForAdoption}</h3>
            </div>
          </div>
        </div>

        {/* Disponibles */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Mascotas para adoptar</p>
              <h3 className="text-2xl font-bold text-gray-800">{availableStatusCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Género */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">Género de mascotas</h4>
          <div className="w-64 h-64 max-xl:w-40 max-xl:h-40">
            <Doughnut
              data={objectToChartData(generoData, ["#3B82F6", "#EC4899", "#6B7280"])}
              options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        </div>

        {/* Tipo */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">Tipo de mascota</h4>
          <Bar
            data={objectToChartData(tipoData, ["#10B981", "#F59E0B", "#6366F1"])}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        {/* Tamaño */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">Tamaño de mascotas</h4>
          <Bar
            data={objectToChartData(tamanioData, ["#EF4444", "#3B82F6", "#FBBF24"])}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        {/* Esterilización */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">Esterilización</h4>
          <div className="w-64 h-64 max-xl:w-40 max-xl:h-40">
          <Doughnut
            data={{
              labels: ["Esterilizados", "No esterilizados"],
              datasets: [
                {
                  label: "Cantidad",
                  data: [esterilizacionData.esterilizados, esterilizacionData.noEsterilizados],
                  backgroundColor: ["#10B981", "#EF4444"],
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
          />
          </div>
        </div>

      </div>
    </main>
  );
}

import React from "react";
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
import { useDashboardMascotas } from "./useDashboardMascotas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardFirst() {
  const {
    totalMascotas,
    availableForAdoption,
    availableStatusCount,
    generoData,
    tipoData,
    tamanioData,
    esterilizacionData,
  } = useDashboardMascotas();

  // Helper para convertir objeto a dataset para chart.js
  const objectToChartData = (obj, backgroundColors) => ({
    labels: Object.keys(obj).map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [
      {
        label: "Cantidad",
        data: Object.values(obj),
        backgroundColor:
          backgroundColors ||
          Object.keys(obj).map(
            () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
          ),
      },
    ],
  });

  return (
    <main className="p-4 md:p-8">
      <div className="dashboard-grid mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Mascotas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50 text-happy-blue">
              <i className="fas fa-paw text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de mascotas</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {totalMascotas}
              </h3>
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
              <h3 className="text-2xl font-bold text-gray-800">
                {availableForAdoption}
              </h3>
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
              <h3 className="text-2xl font-bold text-gray-800">
                {availableStatusCount}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Género */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">
            Género de mascotas
          </h4>
          <div className="w-64 h-64 max-xl:w-40 max-xl:h-40">
            <Doughnut
              data={objectToChartData(generoData, [
                "#3B82F6",
                "#EC4899",
                "#6B7280",
              ])}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>

        {/* Tipo */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">Tipo de mascota</h4>
          <Bar
            data={objectToChartData(tipoData, [
              "#10B981",
              "#F59E0B",
              "#6366F1",
            ])}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        {/* Tamaño */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <h4 className="mb-4 font-semibold text-gray-700">
            Tamaño de mascotas
          </h4>
          <Bar
            data={objectToChartData(tamanioData, [
              "#EF4444",
              "#3B82F6",
              "#FBBF24",
            ])}
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
                    data: [
                      esterilizacionData.esterilizados,
                      esterilizacionData.noEsterilizados,
                    ],
                    backgroundColor: ["#10B981", "#EF4444"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

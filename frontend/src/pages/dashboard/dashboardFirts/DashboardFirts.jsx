import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardFirts() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Simulate stats loading
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const registrationsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "New Pets",
        data: [45, 60, 55, 80, 90, 110, 105, 120, 130],
        borderColor: "#EC4899",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#EC4899",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const registrationsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, drawBorder: false },
        ticks: { stepSize: 20 },
      },
      x: {
        grid: { display: false, drawBorder: false },
      },
    },
  };

  const petTypesData = {
    labels: ["Dogs", "Cats", "Other"],
    datasets: [
      {
        data: [65, 30, 5],
        backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6"],
        borderWidth: 0,
      },
    ],
  };

  const petTypesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    cutout: "70%",
  };

  return (
    <>
      {/* Main Content */}
        
        <main className="p-4 md:p-8">
          {/* Stats Cards */}
          <div className="dashboard-grid mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-indigo-50 text-happy-blue">
                  <i className="fas fa-paw text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Pets</p>
                  <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <i className="fas fa-arrow-up mr-1"></i>
                <span>4.5% since last month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-pink-50 text-happy-pink">
                  <i className="fas fa-calendar-alt text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Upcoming Appointments</p>
                  <h3 className="text-2xl font-bold text-gray-800">18</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-red-600">
                <i className="fas fa-arrow-down mr-1"></i>
                <span>1.2% since last week</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 text-happy-green">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Clients</p>
                  <h3 className="text-2xl font-bold text-gray-800">520</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <i className="fas fa-arrow-up mr-1"></i>
                <span>6.8% since last quarter</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-50 text-yellow-500">
                  <i className="fas fa-shopping-bag text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Products Sold</p>
                  <h3 className="text-2xl font-bold text-gray-800">3,104</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <i className="fas fa-arrow-up mr-1"></i>
                <span>12% since last month</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 h-72 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                New Registrations
              </h2>
              {statsVisible && (
                <Line data={registrationsData} options={registrationsOptions} />
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 h-72 border border-gray-100 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Pets by Type
              </h2>
              {statsVisible && (
                <Doughnut data={petTypesData} options={petTypesOptions} />
              )}
              <div className="flex justify-around mt-6 text-gray-600 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Dogs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Cats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      
    </>
  );
}

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { Home } from "../pages/home/Home";
import SobreNosotros from "../pages/sobreNosotros/SobreNosotros";
import NotFound from "../pages/notFound/NotFound";
import Login from "../pages/login/Login";

import Ver_Mascotas from "../pages/ver_Mascotas/Ver_Mascotas";
import Mascota_Id from "../pages/mascota_id/Mascota_id";

import Noticias from "../pages/noticia/noticias";
import Noticia_id from "../pages/noticia_id/Noticia_id";

import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../pages/register/Register";
import DashboardFirts from "../pages/dashboard/dashboardFirts/DashboardFirts";
import AdoptionFormPage from "../components/adopcionForm/AdoptionFormPage";
import Settings from "../pages/settings/Settings";

import NoticiaForm from "../components/noticiaForm/NoticiaForm";
import NoticiasDashboard from "../components/noticiaDashboard/NoticiaDashboard";
import NoticiaFormEdit from "../components/noticiaFormEdit/NoticiaFormEdit";

import TestimonioForm from "../components/testimonioForm/TestimonioForm";
import TestimonioDashboard from "../components/testimonioDashboard/TestimoniosDashboard";
import TestimonioFormEdit from "../components/testimonioFormEdit/TestimonioFormEdit";

import MascotaDashboard from "../components/mascotaDashboard/MascotaDashboard";
import MascotaForm from "../components/mascotaForm/MascotaForm";
import { MascotaFormEdit } from "../components/mascotaFormEdit/MascotaFormEdit";
import RefugioDashboard from "../components/refugioDashboard/RefugioDashboard";
import RefugioForm from "../components/refugioForm/RefugioForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<SobreNosotros />} />

      <Route path="/login" element={<Login />} />

      <Route path="/adopcionForm/:id" element={<AdoptionFormPage />} />

      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:id" element={<Noticia_id />} />

      <Route path="/mascotas" element={<Ver_Mascotas />} />
      <Route path="/mascotas/:id" element={<Mascota_Id />} />

      {/* ✅ Ruta protegida con layout dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* Ruta de registro de mascotas dentro del dashboard */}
        <Route path="register" element={<Register />} />

        <Route path="dashboardFirts" element={<DashboardFirts />} />

        <Route path="testimonio" element={<TestimonioDashboard />} />
        <Route path="testimonioForm" element={<TestimonioForm />} />
        <Route path="testimonios/:id" element={<TestimonioFormEdit />} />

        <Route path="mascota" element={<MascotaDashboard />} />
        <Route path="mascotaForm" element={<MascotaForm />} />
        <Route path="mascotaFormEdit/:id" element={<MascotaFormEdit />} />

        <Route path="noticia" element={<NoticiasDashboard />} />
        <Route path="noticiaForm" element={<NoticiaForm />} />
        <Route path="noticiaFormEdit/:id" element={<NoticiaFormEdit />} />

        <Route path="refugio" element={<RefugioDashboard />} />
        <Route path="refugioForm" element={<RefugioForm />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

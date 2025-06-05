import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";

import SobreNosotros from "../pages/sobreNosotros/SobreNosotros";
import NotFound from "../pages/notFound/NotFound";
import Login from "../pages/login/Login";

import Ver_Mascotas from "../pages/ver_Mascotas/Ver_Mascotas";
import Mascota_Id from "../pages/mascota_id/Mascota_id";

import Noticias from "../pages/noticia/noticias";
import Noticia_id from './../pages/noticia_id/Noticia_id';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<SobreNosotros />} />
      <Route path="/login" element={<Login />} />

      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:id" element={<Noticia_id />} /> 

      <Route path="/mascotas" element={<Ver_Mascotas />} />
      <Route path="/mascotas/:id" element={<Mascota_Id />} /> 

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

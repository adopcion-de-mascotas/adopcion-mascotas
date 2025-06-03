import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";

import SobreNosotros from "../pages/sobreNosotros/SobreNosotros";
import NotFound from "../pages/notFound/NotFound";
import Login from "../pages/login/Login";

import Blogs from "./../pages/blogs/blogs";
import Blog_id from "../pages/blog_id/Blog_id";

import Ver_Mascotas from "../pages/ver_Mascotas/Ver_Mascotas";
import Mascota_Id from "../pages/mascota_id/Mascota_id";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<SobreNosotros />} />
      <Route path="/login" element={<Login />} />

      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<Blog_id />} /> {/* ← corregido */}

      <Route path="/mascotas" element={<Ver_Mascotas />} />
      <Route path="/mascotas/:id" element={<Mascota_Id />} /> {/* ← corregido */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import SobreNosotros from "../pages/sobreNosotros/SobreNosotros";
import NotFound from "../pages/notFound/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<SobreNosotros />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

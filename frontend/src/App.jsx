import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import SnowfallEffect from "./pages/dashboard/climas/SnowfallEffect";
import RainEffect from "./pages/dashboard/climas/RainEffect";
import SunnyEffect from "./pages/dashboard/climas/SunnyEffect";
import MoonEffect from "./pages/dashboard/climas/MoonEffect";
import ScrollToTopButton from "./pages/dashboard/ScrollToTopButton/ScrollToTopButton";
import { FaWhatsapp } from "react-icons/fa";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

function App() {
  const [nieveActiva, setNieveActiva] = useState(() => {
    return localStorage.getItem("nieveActiva") === "true";
  });

  const [lluviaActiva, setLluviaActiva] = useState(() => {
    return localStorage.getItem("lluviaActiva") === "true";
  });

  const [solActivo, setSolActivo] = useState(() => {
    return localStorage.getItem("solActivo") === "true";
  });

  const [lunaActiva, setLunaActiva] = useState(() => {
    return localStorage.getItem("lunaActiva") === "true";
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        nieveActiva,
        setNieveActiva,
        lluviaActiva,
        setLluviaActiva,
        solActivo,
        setSolActivo,
        lunaActiva,
        setLunaActiva,
      }}
    >
      <BrowserRouter>
        <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
          <Navbar />
          {/* Botón flotante de WhatsApp */}
          <a
            href="https://wa.me/5491165432100?text=Hola!%20Quiero%20hacer%20una%20consulta."
            className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} />
          </a>
          <AppRoutes />
          {nieveActiva && <SnowfallEffect />}
          {lluviaActiva && <RainEffect />}
          {solActivo && <SunnyEffect />}
          {lunaActiva && <MoonEffect />}
          <ScrollToTopButton />

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;

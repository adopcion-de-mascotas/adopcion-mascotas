import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRoutes from "./routes/AppRoutes";

export const ThemeContext = createContext();

function App() {
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
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <BrowserRouter>
        <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;

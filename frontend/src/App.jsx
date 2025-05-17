import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    <BrowserRouter>
      <body>
        <Navbar />
        <AppRoutes />
        <Footer />
      </body>
    </BrowserRouter>
  );
}

export default App;

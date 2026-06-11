import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

import Inicio from "./pages/Inicio";
import Organigrama from "./pages/Organigrama";
import Login from "./pages/Login";

import EventosMinisterios from "./pages/EventosMinisterios";
import PublicacionesMinisterios from "./pages/PublicacionesMinisterios";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/organigrama" element={<Organigrama />} />

        <Route path="/ministerios/eventos" element={<EventosMinisterios />} />
        <Route
          path="/ministerios/eventos/:id"
          element={<EventosMinisterios />}
        />

        <Route
          path="/ministerios/publicaciones"
          element={<PublicacionesMinisterios />}
        />

        <Route
          path="/ministerios/publicaciones/:id"
          element={<PublicacionesMinisterios />}
        />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Inicio from "./pages/Inicio";

import Organigrama from "./pages/Organigrama";
import Reglamento from "./pages/Reglamento";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/organigrama" element={<Organigrama />} />
        <Route path="/reglamento" element={<Reglamento />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;